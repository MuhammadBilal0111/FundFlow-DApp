"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import CreateCampaign from "@/components/forms/CreateCampaign";
import CampaignEditCard from "@/components/cards/CampaignEditCard";

function page() {
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab");

  return (
    <section>
      {tab === "create-campaign" && <CreateCampaign />}
      {tab === "view-campaign" && <CampaignEditCard />}
    </section>
  );
}

export default page;
