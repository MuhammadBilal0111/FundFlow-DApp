"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";

function TopBar() {
  return (
    <section className="fixed z-30 top-0 left-0 w-full bg-black py-5 border border-b-gray-600">
      <div className="ml-5">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src={"/assets/logo.png"}
            alt="Logo"
            width={24}
            height={24}
            className="object-cover"
          />
          <h1 className="text-xl md:text-2xl font-semibold md:font-bold">
            FlowFund
          </h1>
        </Link>
      </div>
    </section>
  );
}

export default TopBar;
