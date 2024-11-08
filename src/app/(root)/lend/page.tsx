"use client";
import React, { useCallback, useState } from "react";
import { Card } from "@/components/ui/card";
import useActiveWallet from "@/lib/hooks/useActiveWallet";
import { MicroLendingABI } from "@/constants/Abi";
import { encodeFunctionData, formatEther, parseEther } from "viem";
import { useQuery } from "@tanstack/react-query";
import { contractAddress } from "@/constants/contract";
import { Button } from "@/components/ui/button";

const LendForm = () => {
  const [loanId, setLoanId] = useState("");

  const { signer, isValid, library, chain } = useActiveWallet();

  const { data: loans } = useQuery({
    queryKey: ["get-loans"],
    queryFn: async () => {
      const loanCount = await library?.readContract({
        abi: MicroLendingABI,
        address: contractAddress,
        functionName: "loanCount",
      });
      if (!loanCount) return [];

      const config = {
        abi: MicroLendingABI,
        address: contractAddress,
        functionName: "loans",
      } as const;

      const loans = await library?.multicall({
        allowFailure: false,
        contracts: Array.from({ length: +loanCount.toString() + 1 }).map(
          (_, i) => ({
            ...config,
            args: [BigInt(i)],
          })
        ),
      });
      return loans;
    },
  });

  const onSubmit = useCallback(
    (loanId: string, amount: bigint) => {
      if (loanId && signer && isValid) {
        signer?.sendTransaction({
          abi: MicroLendingABI,
          chain,
          to: "0x6e66dEB52600Fe1b5927b3e7a6e5e53dD00E3f0b",
          value: amount,
          data: encodeFunctionData({
            abi: MicroLendingABI,
            functionName: "acceptLoan",
            args: [parseEther(loanId)],
          }),
        });
      }
    },
    [signer, isValid, chain]
  );
  return (
    <div>
      {loans?.map(
        (loan) =>
          loan[0] > 0n && (
            <Card className="p-7" key="abcd">
              <div className="flex flex-col gap-4">
                <p>
                  <strong>Loan Amount:</strong> {formatEther(loan?.[0])}
                </p>
                <p>
                  <strong>Interest Rate:</strong> {loan?.[1].toString()}
                </p>
                <p>
                  <strong>Duration:</strong> {loan?.[2].toString()}
                </p>
                <p>
                  <strong>Start Time:</strong>{" "}
                  {new Date(Number(loan?.[3]) * 1000).toLocaleString()}
                </p>
                <p>
                  <strong>End Time:</strong>{" "}
                  {new Date(Number(loan?.[4]) * 1000).toLocaleString()}
                </p>
                <p>
                  <strong>Borrower:</strong> {loan?.[5]}
                </p>

                <p>
                  <strong>Is Repaid:</strong> {loan?.[7] ? "Yes" : "No"}
                </p>
              </div>
              <Button className="mt-5" onClick={() => onSubmit("0", loan[0])}>
                Grant
              </Button>
            </Card>
          )
      )}
    </div>
  );
};

export default LendForm;
