"use client";
import React from "react";
import { sidebarLinks } from "@/constant";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

function LeftSideBar() {
  const pathname = usePathname(); // use to get the pathname from the url
  const searchParams = useSearchParams(); // used to get the query

  return (
    <section className="sticky z-10 left-0 h-screen flex pt-28 border-r w-fit border-gray-600 max-sm:hidden">
      <div className="flex flex-col justify-start gap-3 px-4 w-full flex-1">
        {sidebarLinks.map((link) => {
          const url = new URL(link.route, window.location.origin);
          const linkTab = url.searchParams.get("tab");
          const isActive =
            url.pathname === pathname && linkTab === searchParams.get("tab");

          return (
            <Link
              href={link.route}
              key={link.label}
              className={`flex gap-2 ${
                isActive ? "bg-blue-800" : "hover:bg-gray-700"
              } rounded-lg px-5 py-4 duration-75`}
            >
              <Image
                src={link.imgURL}
                alt={link.label}
                width={24}
                height={24}
              />
              <p className="mr-1 max-lg:hidden text-lg">{link.label}</p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

export default LeftSideBar;
