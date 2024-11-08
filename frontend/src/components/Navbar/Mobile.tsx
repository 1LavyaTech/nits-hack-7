"use client";

import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { buttonVariants } from "../ui/button";
import Link from "next/link";
import { navItems } from "./shared";
import { MenuIcon } from "lucide-react";
import { useCallback, useState } from "react";
import LoginButton from "../Buttons/Login";

export function Mobile() {
  const [isOpen, toggleOpen] = useState<boolean>(false);
  const toggleNav = useCallback(() => {
    return toggleOpen((prev) => !prev);
  }, []);
  return (
    <Sheet open={isOpen} onOpenChange={toggleOpen}>
      <SheetTrigger className="md:hidden">
        <MenuIcon />
      </SheetTrigger>
      <SheetContent
        side="right"
        className="flex flex-col items-center gap-7 justify-center"
      >
        <LoginButton />
        {navItems.map((item, index) => (
          <Link
            className={buttonVariants({ variant: "ghost", size: "lg" })}
            href={item?.href}
            key={`mobile-nav-item-${index}`}
            onClick={toggleNav}
          >
            {item?.label}
          </Link>
        ))}
      </SheetContent>
    </Sheet>
  );
}
