const {ethers} = require("hardhat");

async function main() {
  const mycontract=await ethers.getContractFactory("verify");
  const verified=await mycontract.deploy();
  await verified.deployed();
  console.log('Deployed Contract address',verified.address)
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
