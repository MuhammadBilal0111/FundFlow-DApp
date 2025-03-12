"use client";
import React from "react";
import { usePathname } from "next/navigation";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { sidebarLinks } from "@/constant";

function BottomBar() {
  const pathname = usePathname(); // use to get the pathname from the url
  const searchParams = useSearchParams(); // used to get the query

  return (
    <section className="fixed z-10 left-0 bottom-0 py-5 px-3 w-full rounded-t-3xl sm:hidden bg-black border border-t-gray-600">
      <div className="flex justify-center items-center gap-2">
        {sidebarLinks.map((link) => {
          const url = new URL(link.route, window.location.origin);
          const linkTab = url.searchParams.get("tab");
          const isActive =
            url.pathname === pathname && linkTab === searchParams.get("tab");

          return (
            <Link
              href={link.route}
              key={link.label}
              className={`flex flex-col justify-center items-center gap-2 ${
                isActive ? "bg-purple-700" : "hover:bg-gray-700"
              } rounded-lg px-5 py-4 duration-75`}
            >
              <Image
                src={link.imgURL}
                alt={link.label}
                width={20}
                height={20}
              />
              <p className="mr-1 max-lg:hidden text-lg">{link.label}</p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

export default BottomBar;
