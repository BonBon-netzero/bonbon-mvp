import fs from "fs";
import { ethers } from "hardhat";

async function deployContract() {
  let cerTokenContract: any  
  const usdc = ''

  try {
    cerTokenContract = await ethers.deployContract("CERToken", [
      usdc
    ]);
    await cerTokenContract.waitForDeployment();

    console.log("Contracts deployed successfully.");

    return  cerTokenContract ;
  } catch (error) {
    console.error("Error deploying contracts:", error);

    throw error;
  }
}

async function saveContractAddress(cerTokenContract: any) {
  try {
    const address = JSON.stringify(
      {
        cerTokenContract: cerTokenContract.target,
      },
      null,
      4
    );

    fs.writeFile("./scripts/deploy/Address_AutoWallet.json", address, "utf8", (error) => {
      if (error) {
        console.error("Error saving contract address:", error);
      } else {
        console.log("Deployed contract address:", address);
      }
    });
  } catch (error) {
    console.error("Error saving contract address:", error);

    throw error;
  }
}

async function main() {
  let contract;

  try {
    contract = await deployContract();

    await saveContractAddress(
      contract
    );

    console.log("Contract deployment completed successfully.");
  } catch (error) {
    console.error("Unhandled error:", error);
  }
}

main().catch((error) => {
  console.error("Unhandled error:", error);
  process.exitCode = 1;
});