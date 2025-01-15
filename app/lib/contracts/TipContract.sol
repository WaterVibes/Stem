// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract TipContract is Ownable, ReentrancyGuard {
    uint256 public feePercentage;
    mapping(address => bool) public supportedTokens;
    
    event TipSent(
        address indexed from,
        address indexed to,
        address indexed token,
        uint256 amount,
        uint256 fee
    );
    
    event TokenAdded(address indexed token);
    event TokenRemoved(address indexed token);
    event FeeUpdated(uint256 newFee);

    constructor(uint256 _feePercentage) {
        require(_feePercentage <= 10, "Fee cannot exceed 10%");
        feePercentage = _feePercentage;
    }

    function addSupportedToken(address token) external onlyOwner {
        require(token != address(0), "Invalid token address");
        supportedTokens[token] = true;
        emit TokenAdded(token);
    }

    function removeSupportedToken(address token) external onlyOwner {
        supportedTokens[token] = false;
        emit TokenRemoved(token);
    }

    function updateFeePercentage(uint256 _feePercentage) external onlyOwner {
        require(_feePercentage <= 10, "Fee cannot exceed 10%");
        feePercentage = _feePercentage;
        emit FeeUpdated(_feePercentage);
    }

    function tip(
        address token,
        address recipient,
        uint256 amount
    ) external nonReentrant {
        require(supportedTokens[token], "Token not supported");
        require(recipient != address(0), "Invalid recipient");
        require(amount > 0, "Amount must be greater than 0");
        
        uint256 fee = (amount * feePercentage) / 100;
        uint256 creatorAmount = amount - fee;
        
        IERC20 tokenContract = IERC20(token);
        
        require(
            tokenContract.transferFrom(msg.sender, address(this), amount),
            "Transfer failed"
        );
        
        require(
            tokenContract.transfer(recipient, creatorAmount),
            "Creator transfer failed"
        );
        
        require(
            tokenContract.transfer(owner(), fee),
            "Fee transfer failed"
        );
        
        emit TipSent(msg.sender, recipient, token, amount, fee);
    }

    function emergencyWithdraw(
        address token,
        uint256 amount
    ) external onlyOwner {
        IERC20(token).transfer(owner(), amount);
    }
} 