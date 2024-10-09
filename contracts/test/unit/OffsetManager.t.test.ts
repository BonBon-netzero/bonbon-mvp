import { loadFixture as loadFixtureToolbox } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import "@nomiclabs/hardhat-ethers";
import { expect } from "chai";
import { ethers } from "hardhat";
import { completeFixture } from "../utils/fixtures";

describe("Incentive", function () {

    let wallets: any;
    let cerOffsetManagerContract: any;
    let cerTokenContract: any;
    let cerOffsetManagerAddress: any;
    let cerTokenAddress: any;
    let usdcContract: any;

    const fixture = async () => {
        const { cerOffsetManagerContract,cerTokenContract,usdcContract, wallets } = await completeFixture();
        const cerOffsetManagerAddress = cerOffsetManagerContract.target;
        const cerTokenAddress = cerTokenContract.target;

        return {
            cerOffsetManagerContract,
            cerOffsetManagerAddress,
            cerTokenAddress,
            cerTokenContract,
            usdcContract,
        wallets,
        };
    };

    beforeEach("load fixture", async () => {
        ({
            cerOffsetManagerContract,
            cerOffsetManagerAddress,
            cerTokenAddress,
            cerTokenContract,
            wallets,
            usdcContract,
        } = await loadFixtureToolbox(fixture));
    });

    describe("Deployment", function () {
        it("Should ", async () => {
            const amount = ethers.parseUnits("0.1",6)
            const amountCER = ethers.parseUnits("0.1",18);
            await usdcContract.connect(wallets[0]).mint(amount);
            console.log(await usdcContract.balanceOf(wallets[0].target))
            await cerTokenContract.swapUSDCForCER(amount)
            console.log(1)
            expect(await cerTokenContract.balanceOf(wallets[0].address)).to.equal(amountCER);
        });
    });

  // ==============================================================================================================
  

  // ==============================================================================================================
  

  // ==============================================================================================================
  
  
  // ==============================================================================================================
  

  // ==============================================================================================================

});