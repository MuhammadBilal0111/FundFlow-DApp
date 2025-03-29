import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Home, LogOut, Store } from "lucide-react";
import { SignedIn, SignOutButton } from "@clerk/nextjs";

function TopBar() {
  return (
    <section className="fixed z-30 top-0 left-0 w-full bg-black py-5 border border-b-gray-600">
      <div className="mx-5 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src={"/assets/images/logo.png"}
            alt="Logo"
            width={24}
            height={24}
            className="object-cover"
          />
          <h1 className="text-xl md:text-2xl font-semibold md:font-bold">
            FundFlow
          </h1>
        </Link>
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="hover:text-purple-700 duration-100 hover:underline"
          >
            <Home size={20} className="max-sm:block hidden" />
            <span className="sm:block hidden">Home</span>
          </Link>
          <Link
            href="/campaigns"
            className="hover:text-purple-700 duration-100 hover:underline"
          >
            <Store size={20} className="max-sm:block hidden" />
            <span className="sm:block hidden">Campaigns</span>
          </Link>
          <div className="block md:hidden">
            <SignedIn>
              <SignOutButton>
                <div className="cursor-pointer flex items-center px-2 hover:bg-gray-800 py-2 rounded-lg duration-75">
                  <LogOut />
                </div>
              </SignOutButton>
            </SignedIn>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TopBar;
