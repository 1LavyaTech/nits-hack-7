import {
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox-viem/network-helpers";
import { expect } from "chai";
import hre from "hardhat";
import { encodeFunctionData, getAddress, } from "viem";

describe("MicroLendingPlatform", function () {

  async function deployFixture() {
    const [owner, otherAccount] = await hre.viem.getWalletClients();

    const platform = await hre.viem.deployContract("MicroLendingPlatform", []);

    const publicClient = await hre.viem.getPublicClient();

    return {
      platform,
      owner,
      otherAccount,
      publicClient,
    };
  }

  describe("Deployment", function () {

    it("Should set the right owner", async function () {
      const { platform, owner } = await loadFixture(deployFixture);

      expect(await platform.read.admin()).to.equal(
        getAddress(owner.account.address)
      );
    });
  });

  describe("Register", function () {

    it("Should register a user", async function () {
      const { platform, otherAccount } = await loadFixture(deployFixture);
      await otherAccount.sendTransaction({ to: platform.address, data: encodeFunctionData({ abi: platform.abi, functionName: "registerUser", args: [BigInt("333")] }) })
      expect(await platform.read.getAadhaar([otherAccount.account.address])).to.equal(
        BigInt("333")
      );
    });

    it("Should register default credit score", async function () {
      const { platform, otherAccount } = await loadFixture(deployFixture);
      await otherAccount.sendTransaction({ to: platform.address, data: encodeFunctionData({ abi: platform.abi, functionName: "registerUser", args: [BigInt("333")] }) })
      expect(await platform.read.getCreditScore([otherAccount.account.address])).to.equal(
        (await platform.read.defaultCreditScore())
      );
    });

  });

  describe("Request Loan", function () {
    it("Should request a loan", async function () {
      const { platform, otherAccount } = await loadFixture(deployFixture);
      await otherAccount.sendTransaction({ to: platform.address, data: encodeFunctionData({ abi: platform.abi, functionName: "registerUser", args: [BigInt("333")] }) })
      await otherAccount.sendTransaction({ to: platform.address, data: encodeFunctionData({ abi: platform.abi, functionName: "requestLoan", args: [BigInt("1000"), BigInt("100"), BigInt("100")] }) })
      expect(await platform.read.getUserDept([otherAccount.account.address])).to.equal(BigInt("1000"))
    })

    it("should accept a loan request", async function () {
      const loanAmount = BigInt("1000")
      const { platform, owner, otherAccount, publicClient } = await loadFixture(deployFixture);
      await otherAccount.sendTransaction({ to: platform.address, data: encodeFunctionData({ abi: platform.abi, functionName: "registerUser", args: [BigInt("333")] }) })
      await otherAccount.sendTransaction({ to: platform.address, data: encodeFunctionData({ abi: platform.abi, functionName: "requestLoan", args: [BigInt(loanAmount), BigInt("100"), BigInt("100")] }) })
      const [loanId] = await platform.read.getLoansByUser([otherAccount.account.address])

      const balance0 = await publicClient.getBalance({ address: otherAccount.account.address })

      await owner.sendTransaction({ to: platform.address, value: loanAmount, data: encodeFunctionData({ abi: platform.abi, functionName: "acceptLoan", args: [loanId], }) })

      const balance1 = await publicClient.getBalance({ address: otherAccount.account.address })

      expect(balance1 - balance0).to.equal(loanAmount)
    })
  })

  it("Should repay a loan", async function () {
    const loanAmount = BigInt("1000")
    const { platform, owner, otherAccount, publicClient } = await loadFixture(deployFixture);
    await otherAccount.sendTransaction({ to: platform.address, data: encodeFunctionData({ abi: platform.abi, functionName: "registerUser", args: [BigInt("333")] }) })
    await otherAccount.sendTransaction({ to: platform.address, data: encodeFunctionData({ abi: platform.abi, functionName: "requestLoan", args: [BigInt(loanAmount), BigInt("100"), BigInt("100")] }) })
    const [loanId] = await platform.read.getLoansByUser([otherAccount.account.address])

    await owner.sendTransaction({ to: platform.address, value: loanAmount, data: encodeFunctionData({ abi: platform.abi, functionName: "acceptLoan", args: [loanId], }) })

    const balance0 = await publicClient.getBalance({ address: otherAccount.account.address })

    await otherAccount.sendTransaction({ to: platform.address, value: loanAmount, data: encodeFunctionData({ abi: platform.abi, functionName: "repayLoan", args: [loanId], }) })

    const balance1 = await publicClient.getBalance({ address: otherAccount.account.address })

    expect(balance0 - balance1).to.equal(loanAmount)
  })
})