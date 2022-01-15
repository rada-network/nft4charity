const Migrations = artifacts.require('Migrations')

module.exports = function (deployer) {
  deployer.deploy(Migrations)
} as Truffle.Migration

export {}