const Store = artifacts.require("Store");


// const RadaNFTToken = artifacts.require("RadaNFTToken");

module.exports = function (deployer) {
  deployer.deploy(Store);
  // deployer.deploy(RadaNFTToken);
};
