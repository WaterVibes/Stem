// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Royalty.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract StemNFT is ERC721, ERC721URIStorage, ERC721Royalty, Ownable {
    using Counters for Counters.Counter;
    
    IERC20 public gacaToken;
    Counters.Counter private _tokenIds;
    
    // Mapping from token ID to collaborators
    mapping(uint256 => address[]) public collaborators;
    mapping(uint256 => uint256[]) public shares;
    
    // Video metadata
    struct VideoMetadata {
        string title;
        string description;
        uint256 duration;
        uint256 views;
        uint256 likes;
        bool isExclusive;
    }
    
    mapping(uint256 => VideoMetadata) public videoMetadata;
    
    // Events
    event NFTMinted(uint256 indexed tokenId, address creator, string uri);
    event CollaboratorAdded(uint256 indexed tokenId, address collaborator, uint256 share);
    event RevenueDistributed(uint256 indexed tokenId, uint256 amount);
    event ExclusiveContentUnlocked(uint256 indexed tokenId, address buyer);
    
    constructor(address _gacaToken) ERC721("Stem Video NFT", "STEM") {
        gacaToken = IERC20(_gacaToken);
    }
    
    function mintVideo(
        string memory uri,
        string memory title,
        string memory description,
        uint256 duration,
        bool isExclusive,
        address[] memory _collaborators,
        uint256[] memory _shares
    ) public returns (uint256) {
        require(_collaborators.length == _shares.length, "Invalid collaborators/shares");
        require(_collaborators.length > 0, "No collaborators specified");
        
        uint256 totalShares = 0;
        for (uint256 i = 0; i < _shares.length; i++) {
            totalShares += _shares[i];
        }
        require(totalShares == 10000, "Total shares must be 10000 (100%)");
        
        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();
        
        _safeMint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, uri);
        
        // Set default royalty to 10%
        _setTokenRoyalty(newTokenId, address(this), 1000);
        
        // Store video metadata
        videoMetadata[newTokenId] = VideoMetadata({
            title: title,
            description: description,
            duration: duration,
            views: 0,
            likes: 0,
            isExclusive: isExclusive
        });
        
        // Store collaborators and their shares
        collaborators[newTokenId] = _collaborators;
        shares[newTokenId] = _shares;
        
        emit NFTMinted(newTokenId, msg.sender, uri);
        
        return newTokenId;
    }
    
    function distributeRevenue(uint256 tokenId, uint256 amount) public {
        require(_exists(tokenId), "Token does not exist");
        require(gacaToken.transferFrom(msg.sender, address(this), amount), "Transfer failed");
        
        address[] memory tokenCollaborators = collaborators[tokenId];
        uint256[] memory tokenShares = shares[tokenId];
        
        for (uint256 i = 0; i < tokenCollaborators.length; i++) {
            uint256 collaboratorShare = (amount * tokenShares[i]) / 10000;
            require(gacaToken.transfer(tokenCollaborators[i], collaboratorShare), "Share transfer failed");
        }
        
        emit RevenueDistributed(tokenId, amount);
    }
    
    function unlockExclusiveContent(uint256 tokenId, uint256 amount) public {
        require(_exists(tokenId), "Token does not exist");
        require(videoMetadata[tokenId].isExclusive, "Content is not exclusive");
        require(gacaToken.transferFrom(msg.sender, address(this), amount), "Payment failed");
        
        // Distribute payment to collaborators
        distributeRevenue(tokenId, amount);
        
        emit ExclusiveContentUnlocked(tokenId, msg.sender);
    }
    
    function updateMetadata(uint256 tokenId, uint256 views, uint256 likes) public onlyOwner {
        require(_exists(tokenId), "Token does not exist");
        VideoMetadata storage metadata = videoMetadata[tokenId];
        metadata.views = views;
        metadata.likes = likes;
    }
    
    // Override required functions
    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage, ERC721Royalty) {
        super._burn(tokenId);
    }
    
    function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }
    
    function supportsInterface(bytes4 interfaceId) public view override(ERC721, ERC721Royalty) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
} 