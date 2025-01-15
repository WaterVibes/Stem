// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract StemRewards is Ownable, ReentrancyGuard {
    IERC20 public gacaToken;
    
    // Reward types
    enum RewardType {
        DailyLogin,
        StreamEngagement,
        Challenge,
        ContentCreation
    }
    
    // Challenge struct
    struct Challenge {
        string name;
        string description;
        uint256 reward;
        uint256 expiryDate;
        bool isActive;
    }
    
    // Streak tracking
    mapping(address => uint256) public lastLoginDate;
    mapping(address => uint256) public currentStreak;
    mapping(address => uint256) public longestStreak;
    
    // Challenge tracking
    mapping(bytes32 => Challenge) public challenges;
    mapping(address => mapping(bytes32 => bool)) public completedChallenges;
    
    // Engagement tracking
    mapping(address => uint256) public streamMinutesWatched;
    mapping(address => uint256) public lastStreamRewardClaim;
    
    // Constants
    uint256 public constant DAILY_LOGIN_REWARD = 10 * 10**18; // 10 GACA
    uint256 public constant STREAM_MINUTES_THRESHOLD = 30;
    uint256 public constant STREAM_REWARD = 5 * 10**18; // 5 GACA
    uint256 public constant CLAIM_COOLDOWN = 1 days;
    
    // Events
    event DailyRewardClaimed(address indexed user, uint256 amount, uint256 streak);
    event StreamRewardClaimed(address indexed user, uint256 amount, uint256 minutes);
    event ChallengeCompleted(address indexed user, bytes32 indexed challengeId, uint256 reward);
    event ChallengeCreated(bytes32 indexed challengeId, string name, uint256 reward);
    event StreakUpdated(address indexed user, uint256 streak);
    
    constructor(address _gacaToken) {
        gacaToken = IERC20(_gacaToken);
    }
    
    // Daily login rewards
    function claimDailyReward() external nonReentrant {
        require(canClaimDailyReward(msg.sender), "Cannot claim daily reward yet");
        
        uint256 lastLogin = lastLoginDate[msg.sender];
        uint256 today = block.timestamp / 1 days;
        
        if (lastLogin == today - 1) {
            // Consecutive day
            currentStreak[msg.sender]++;
        } else {
            // Streak broken
            currentStreak[msg.sender] = 1;
        }
        
        // Update longest streak
        if (currentStreak[msg.sender] > longestStreak[msg.sender]) {
            longestStreak[msg.sender] = currentStreak[msg.sender];
        }
        
        lastLoginDate[msg.sender] = today;
        
        // Calculate reward with streak bonus
        uint256 reward = DAILY_LOGIN_REWARD + (DAILY_LOGIN_REWARD * currentStreak[msg.sender] / 10);
        require(gacaToken.transfer(msg.sender, reward), "Reward transfer failed");
        
        emit DailyRewardClaimed(msg.sender, reward, currentStreak[msg.sender]);
        emit StreakUpdated(msg.sender, currentStreak[msg.sender]);
    }
    
    // Stream engagement rewards
    function updateStreamMinutes(address user, uint256 minutes) external onlyOwner {
        streamMinutesWatched[user] += minutes;
    }
    
    function claimStreamReward() external nonReentrant {
        require(canClaimStreamReward(msg.sender), "Cannot claim stream reward yet");
        require(streamMinutesWatched[msg.sender] >= STREAM_MINUTES_THRESHOLD, "Not enough minutes watched");
        
        uint256 minutesWatched = streamMinutesWatched[msg.sender];
        uint256 reward = (minutesWatched / STREAM_MINUTES_THRESHOLD) * STREAM_REWARD;
        
        streamMinutesWatched[msg.sender] = minutesWatched % STREAM_MINUTES_THRESHOLD;
        lastStreamRewardClaim[msg.sender] = block.timestamp;
        
        require(gacaToken.transfer(msg.sender, reward), "Reward transfer failed");
        
        emit StreamRewardClaimed(msg.sender, reward, minutesWatched);
    }
    
    // Challenge management
    function createChallenge(
        string memory name,
        string memory description,
        uint256 reward,
        uint256 duration
    ) external onlyOwner {
        bytes32 challengeId = keccak256(abi.encodePacked(name, block.timestamp));
        
        challenges[challengeId] = Challenge({
            name: name,
            description: description,
            reward: reward,
            expiryDate: block.timestamp + duration,
            isActive: true
        });
        
        emit ChallengeCreated(challengeId, name, reward);
    }
    
    function completeChallenge(bytes32 challengeId) external nonReentrant {
        Challenge storage challenge = challenges[challengeId];
        require(challenge.isActive, "Challenge not active");
        require(block.timestamp < challenge.expiryDate, "Challenge expired");
        require(!completedChallenges[msg.sender][challengeId], "Challenge already completed");
        
        completedChallenges[msg.sender][challengeId] = true;
        require(gacaToken.transfer(msg.sender, challenge.reward), "Reward transfer failed");
        
        emit ChallengeCompleted(msg.sender, challengeId, challenge.reward);
    }
    
    // View functions
    function canClaimDailyReward(address user) public view returns (bool) {
        uint256 lastLogin = lastLoginDate[user];
        uint256 today = block.timestamp / 1 days;
        return lastLogin < today;
    }
    
    function canClaimStreamReward(address user) public view returns (bool) {
        return block.timestamp >= lastStreamRewardClaim[user] + CLAIM_COOLDOWN &&
               streamMinutesWatched[user] >= STREAM_MINUTES_THRESHOLD;
    }
    
    function getChallenge(bytes32 challengeId) external view returns (
        string memory name,
        string memory description,
        uint256 reward,
        uint256 expiryDate,
        bool isActive
    ) {
        Challenge memory challenge = challenges[challengeId];
        return (
            challenge.name,
            challenge.description,
            challenge.reward,
            challenge.expiryDate,
            challenge.isActive
        );
    }
} 