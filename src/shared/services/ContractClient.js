import CrowdFundingABI from './CrowdFunding.json';
import CrowdFundingToken from './CrowdFundToken.json';
import Web3 from 'web3';
import { ethers } from "ethers";

const CrowdFundingContractABI = CrowdFundingABI.abi;
const CrowdFundingTokenABI = CrowdFundingToken.abi;

const CrowdFundingContractAddress = process.env.REACT_APP_CONTRACT_ADDRESS_CROWDFUND;
const CrowdFundingTokenAddress = process.env.REACT_APP_CONTRACT_ADDRESS_CROWDFUND_TOKEN;

var CrowdFundingContract = {};
var CrowdFundingTokenContract = {};
var web3 = {};
if (window.ethereum) {
    const web3 = new Web3(window.ethereum);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    CrowdFundingContract = new web3.eth.Contract(CrowdFundingContractABI, CrowdFundingContractAddress,signer);
    CrowdFundingTokenContract = new web3.eth.Contract(CrowdFundingTokenABI, CrowdFundingTokenAddress,signer);
}


export { CrowdFundingContract,CrowdFundingTokenContract,web3 };

