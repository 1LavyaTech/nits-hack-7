"use client";
import { usePrivy } from "@privy-io/react-auth";
import { Button } from "../ui/button";
import useActiveWallet from "@/lib/hooks/useActiveWallet";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import IconButton from "./Icon";

export default function LoginButton() {
  const { login, logout } = usePrivy();
  const { isValid, address } = useActiveWallet();
  if (isValid) {
    return (
      <HoverCard>
        <HoverCardTrigger>
          <IconButton
            Icon={ChevronDownIcon}
            label={`${address?.slice(0, 5)}...${address?.substring(-1, 4)}`}
          />
        </HoverCardTrigger>
        <HoverCardContent>
          <div className="flex flex-col gap-1">
            <Button>Profile</Button>
            <Button>Transactions</Button>
            <Button variant="destructive" onClick={logout}>
              Logout
            </Button>
          </div>
        </HoverCardContent>
      </HoverCard>
    );
  }
  return <Button onClick={login}>Sign In</Button>;
}
