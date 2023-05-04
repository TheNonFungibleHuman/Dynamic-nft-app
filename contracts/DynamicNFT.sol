// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract DynamicNFT is ERC721URIStorage, Ownable {
    uint256 private _tokenIdCounter = 0;
    uint256 private _maxMinters = 10;
    string private _baseTokenURI = "ipfs://QmW8ENwRJjvvXsD6vZo8i8PaW8kXnTt8eKz7C1B2W4oXsK/";

    mapping(uint256 => uint256) private _blockNumbers;
    mapping(uint256 => uint256) private _minterCounts;

    constructor() ERC721("DynamicNFT", "DNFT") {}

    function mint() public {
        require(_tokenIdCounter < _maxMinters, "Token limit reached");

        uint256 tokenId = _tokenIdCounter;
        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, _getMetadata(tokenId));
        _tokenIdCounter++;

        _blockNumbers[tokenId] = block.number;
        _minterCounts[tokenId] = 1;
    }

    function _getMetadata(uint256 tokenId) private view returns (string memory) {
        string memory baseURI = _baseTokenURI;
        uint256 blockNumber = _blockNumbers[tokenId];
        uint256 minterCount = _minterCounts[tokenId];

        string memory metadata = string(abi.encodePacked(baseURI, blockNumber, "/", minterCount));
        return metadata;
    }

    function setBaseURI(string memory baseURI) public onlyOwner {
        _baseTokenURI = baseURI;
    }

    function baseTokenURI() internal view virtual returns (string memory) {
        return _baseTokenURI;
    }
}