// SPDX-License-Identifier: MIT
// Tells the Solidity compiler to compile only from v0.8.13 to v0.9.0
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract CrowdFunding {
    struct Campaign {
        string name;
        address owner;
        string title;
        string description;
        uint256 target;
        uint256 startline;
        uint256 deadline;
        uint256 amountCollected;
        string image;
        string nft;
        address[] donators;
        uint256[] donations;
        uint256[] withdrawls;
    }

    event LogMessage(string message);

    function sendMessage(string memory message) public {
        emit LogMessage(message);
    }

    mapping(uint256 => Campaign) public campaigns;

    uint256 public numberOfCampaigns = 0;

    function createCampaign(string memory _name,address _owner, string memory _title, 
    string memory _description, uint256 _target,uint256 _startline,
    uint256 _deadline, string memory _image, string memory _nft) public returns (uint256) {
        Campaign storage campaign = campaigns[numberOfCampaigns];

        require(campaign.deadline < block.timestamp, "The deadline should be a date in the future.");

        campaign.name = _name;
        campaign.owner = _owner;
        campaign.title = _title;
        campaign.description = _description;
        campaign.target = _target;
        campaign.startline = _startline;
        campaign.deadline = _deadline;
        campaign.amountCollected = 0;
        campaign.image = _image;
        campaign.nft = _nft;

        numberOfCampaigns++;

        return numberOfCampaigns - 1;
    }

    function donateToCampaign(uint256 _id) public payable {
        
        uint256 amount = msg.value;

        Campaign storage campaign = campaigns[_id];

        campaign.donators.push(msg.sender);
        campaign.donations.push(amount);

        (bool sent,) = payable(campaign.owner).call{value: amount}("");

        if(sent) {
            campaign.amountCollected = campaign.amountCollected + amount;
        }
    }

    function withDrawAmount(address payable _recipient,uint256 _id) external payable {

        uint256 _amount = msg.value;
        require(_recipient != address(0), "Invalid recipient address");

        // Check if the contract has enough balance to transfer
        require(address(this).balance >= _amount, "Insufficient balance");
        
        // Transfer the amount to the recipient
        (bool success, ) = _recipient.call{value: _amount}("");
        Campaign storage campaign = campaigns[_id];
        campaign.amountCollected = campaign.amountCollected - _amount;
        campaign.withdrawls.push(_amount);
        require(success, "Transfer failed");
    }

    function getBalance(address _contractAddress) public view returns (uint256) {
        return address(_contractAddress).balance;
    }

    function estimateGasFees() private view returns (uint256) {
        uint256 gasStart = gasleft();
        // Execute the transaction here...
        uint256 gasUsed = gasStart - gasleft();
        uint256 gasPrice = tx.gasprice;
        uint256 gasFees = gasPrice * gasUsed;
        return gasFees;
    }

    function getDonators(uint256 _id) view public returns (address[] memory, uint256[] memory) {
        return (campaigns[_id].donators, campaigns[_id].donations);
    }

    function getCampaigns() public view returns (Campaign[] memory) {
        Campaign[] memory allCampaigns = new Campaign[](numberOfCampaigns);

        for(uint i = 0; i < numberOfCampaigns; i++) {
            Campaign storage item = campaigns[i];

            allCampaigns[i] = item;
        }

        return allCampaigns;
    }
}

library StringUtils {
    function concat(string memory _a, uint256 _b) internal pure returns (string memory) {
        return string(abi.encodePacked(_a, StringUtils.toString(_b)));
    }

    function toString(uint256 _i) internal pure returns (string memory) {
        if (_i == 0) {
            return "0";
        }

        uint256 j = _i;
        uint256 length;

        while (j != 0) {
            length++;
            j /= 10;
        }

        bytes memory bstr = new bytes(length);
        uint256 k = length;

        while (_i != 0) {
            bstr[--k] = bytes1(uint8(48 + _i % 10));
            _i /= 10;
        }

        return string(bstr);
    }
}