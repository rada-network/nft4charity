const Store = artifacts.require("Store");
const RadaToken = artifacts.require("RadaToken");
const RadaNFTToken = artifacts.require("RadaNFTToken");

module.exports = function (deployer) {
  deployer.deploy(Store);
  deployer.deploy(RadaToken, "1000000000000000000000000000");
  deployer.deploy(RadaNFTToken);
};
