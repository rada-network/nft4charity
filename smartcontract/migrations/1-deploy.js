const Store = artifacts.require("Store");
const RadaToken = artifacts.require("RadaToken");
const AltToken = artifacts.require("AltToken");

module.exports = function (deployer) {
  deployer.deploy(Store);
  deployer.deploy(RadaToken, "1000000000000000000000000000");
  deployer.deploy(AltToken, "1000000000000000000000000000");
};
