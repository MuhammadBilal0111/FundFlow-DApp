import React from "react";
import { FloatingNav } from "./ui/floating-navbar";
import { navItems } from "@/constant";

function Navbar() {
  return (
    <div className="relative  w-full">
      <FloatingNav navItems={navItems} />
    </div>
  );
}

export default Navbar;
