import {CrowdFundingContract,CrowdFundingTokenContract} from "../../../../shared/services/ContractClient";
import { ethers } from "ethers";

export const CrowdFundingContractOperations = {
    listOfAllCampaigns : [],  

    createCampaignFn : async (campaign) => {

      const gasLimit = await CrowdFundingContract.methods.createCampaign(
        campaign.name,
        campaign.address,
        campaign.title,
        campaign.description,
        parseInt(campaign.target),
        parseInt(campaign.startline),
        parseInt(campaign.deadline),
        campaign.image,
        campaign.nft
      ).estimateGas({ from: campaign.address });

      const tx = CrowdFundingContract.methods.createCampaign(
        campaign.name,
        campaign.address,
        campaign.title,
        campaign.description,
        parseInt(campaign.target),
        parseInt(campaign.startline),
        parseInt(campaign.deadline),
        campaign.image,
        campaign.nft
      );

      let verifyURL = "";
      await tx
      .send({
        from: campaign.address,
        gas: gasLimit,
      })
      .once("transactionHash", (txhash) => {
        verifyURL =  `https://doj-bex-test.dojima.network/tx/${txhash}`;
      });
      return verifyURL;
      
    },

    getAllCampaigns : async () => {
        const result = await CrowdFundingContract.methods.getCampaigns().call();
        return result;
    },


    donateToCampaign : async (campaignID,ownerAddress,amount,nftURL) => {
        
        // donate to campaign
        const gasLimitDonationFn = await CrowdFundingContract.methods.donateToCampaign(campaignID).estimateGas({ from: ownerAddress,value: ethers.utils.parseEther(amount).toHexString() }); 
        const txDonationFn = CrowdFundingContract.methods.donateToCampaign(
        campaignID
        );
        await txDonationFn
        .send({
          from: ownerAddress,
          gas: gasLimitDonationFn,
          value: ethers.utils.parseEther(amount).toHexString()
        })
        .once("transactionHash", ( ) => {
            
        });

        // mint nft
        const gasLimitNFT = await CrowdFundingTokenContract.methods.mintNFT(ownerAddress,nftURL).estimateGas({ from: ownerAddress }); 
        const txNftMint = CrowdFundingTokenContract.methods.mintNFT(
          ownerAddress,
          nftURL
        );
        
        let verifyURL = "";
        await txNftMint
        .send({
          from: ownerAddress,
          gas: gasLimitNFT,
        })
        .once("transactionHash", (txhash) => {
          verifyURL = `https://doj-bex-test.dojima.network/tx/${txhash}`
        });
      
        return verifyURL;
    },

    withdrawFromCampaign : async (address,campaignID,amount) =>{
      const gasLimit = await CrowdFundingContract.methods.withDrawAmount(address,campaignID).estimateGas({ from: address,value: ethers.utils.parseEther(amount).toHexString() }); 
        const tx = CrowdFundingContract.methods.withDrawAmount(
          address,
          campaignID
        );

        let verifyURL = [];
        await tx
        .send({
          from: address,
          gas: gasLimit,
          value: ethers.utils.parseEther(amount).toHexString()
        })
        .once("transactionHash", (txhash) => {
          verifyURL.push(`https://doj-bex-test.dojima.network/tx/${txhash}`);
        });
      return verifyURL;
    },
};