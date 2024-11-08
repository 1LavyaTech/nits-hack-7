"use client";
import React from "react";
import Desktop from "./Desktop";
import { Mobile } from "./Mobile";

const Navbar = () => {
  return (
    <>
      <Desktop renderMobile={() => <Mobile />} />
    </>
  );
};

export default Navbar;
