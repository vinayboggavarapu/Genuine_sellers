require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config({path:".env"});
module.exports = {
  solidity: "0.8.17",
  defaultNetwork: "polygon_mumbai",
  networks: {
    hardhat: {
    },polygon_mumbai:{
    url:process.env.API_KEY,
    accounts:[process.env.PRIVATE_KEY]}
  }}

