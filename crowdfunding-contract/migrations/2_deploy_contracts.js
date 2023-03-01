const ConvertLib = artifacts.require("ConvertLib");
const MetaCoin = artifacts.require("MetaCoin");
const CrowdFundToken = artifacts.require("CrowdFundToken");
const CrowdFunding = artifacts.require("CrowdFunding");

module.exports = function(deployer, network, accounts) {
  deployer.deploy(ConvertLib);
  deployer.link(ConvertLib, MetaCoin);
  deployer.deploy(MetaCoin);
  deployer.deploy(CrowdFunding);
  deployer.deploy(CrowdFundToken);
};
