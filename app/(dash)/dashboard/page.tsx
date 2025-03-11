"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import CreateCampaign from "@/components/forms/CreateCampaign";
function page() {
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab");

  return (
    <section className="">
      {tab === "create-campaign" && <CreateCampaign />}
    </section>
  );
}

export default page;
