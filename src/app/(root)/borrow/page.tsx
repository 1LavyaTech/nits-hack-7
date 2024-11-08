"use client";
import React, { useCallback, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import useActiveWallet from "@/lib/hooks/useActiveWallet";
import { MicroLendingABI } from "@/constants/Abi";
import { encodeFunctionData, parseEther } from "viem";

const LoanForm = () => {
  const [amount, setAmount] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [duration, setDuration] = useState("");

  const { signer, isValid, chain } = useActiveWallet();

  const onSubmit = useCallback(
    (event: React.FormEvent) => {
      console.log(amount, interestRate, duration);
      event.preventDefault();
      if (amount && interestRate && signer && isValid) {
        signer?.sendTransaction({
          abi: MicroLendingABI,
          chain,
          to: "0x6e66dEB52600Fe1b5927b3e7a6e5e53dD00E3f0b",
          data: encodeFunctionData({
            abi: MicroLendingABI,
            functionName: "requestLoan",
            args: [parseEther(amount), BigInt(interestRate), BigInt(duration)],
          }),
        });
      }
    },
    [amount, interestRate, signer, isValid, chain, duration]
  );
  return (
    <Card className="p-7">
      <h2 className="text-xl font-bold">Request a loan</h2>
      <form onSubmit={onSubmit} className="flex-col flex gap-4 mt-4">
        <div>
          <label>Amount to borrow (AVAX):</label>
          <Input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <div>
          <label>Number of days:</label>
          <Input
            type="number"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />
        </div>

        <div>
          <label>Interest rate (% per day):</label>
          <Input
            type="number"
            value={interestRate}
            onChange={(e) => setInterestRate(e.target.value)}
          />
        </div>
        <Button type="submit" onClick={() => {}}>
          Submit
        </Button>
      </form>
    </Card>
  );
};

export default LoanForm;
