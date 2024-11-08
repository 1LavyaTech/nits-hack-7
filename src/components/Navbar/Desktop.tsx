"use client";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import Link from "next/link";
import { Button } from "../ui/button";
import ModeToggle, { GetCreditScoreButton, navItems } from "./shared";
import ConnectWalletButton from "../Buttons/ConnectWallet";

const Desktop = ({ renderMobile }: { renderMobile?: () => JSX.Element }) => {
  return (
    <NavigationMenu className="p-4 justify-between border-b shadow-xl w-full flex h-20">
      <Link href="/">
        <p className="font-bold text-3xl">[Name]</p>
      </Link>
      <div className="gap-2 hidden md:flex">
        <NavigationMenuList className="gap-4">
          {navItems.map(({ label, href }, index) => {
            const isExternal = index === navItems?.length - 1;
            return (
              <NavigationMenuItem key={`navbar-item-${index}`}>
                <Link
                  href={href}
                  legacyBehavior={!isExternal}
                  passHref
                  target={isExternal ? "_blank" : "_self"}
                  referrerPolicy="no-referrer"
                >
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    {label}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            );
          })}
        </NavigationMenuList>
      </div>

      <div className="flex gap-2">
        <ModeToggle />
        <GetCreditScoreButton />
        <ConnectWalletButton className="max-lg:hidden" />
        {renderMobile?.()}
      </div>
    </NavigationMenu>
  );
};

export default Desktop;
