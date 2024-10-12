import "@nomiclabs/hardhat-ethers";
import { ethers } from "hardhat";

export async function completeFixture() {

  const wallets = await ethers.getSigners();
  
  const CERTokenContract = await ethers.getContractFactory("CERToken");
  const USDCContract = await ethers.getContractFactory("MockERC20");
  const CEROffsetManagerContract = await ethers.getContractFactory("CEROffsetManager");

  const usdcContract = await USDCContract.deploy();
  const cerTokenContract = await CERTokenContract.deploy(usdcContract.target);
  const cerOffsetManagerContract = await CERTokenContract.deploy(cerTokenContract.target);


  return {
    cerTokenContract,
    cerOffsetManagerContract,
    usdcContract,
    wallets,
  };
}