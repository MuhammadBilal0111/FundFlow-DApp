import React from "react";
import { CampaignCard } from "@/components/cards/CampaignCard";

function page() {
  return (
    <div className="mx-auto px-4 py-8 max-w-6xl">
      <h1 className="text-3xl md:text-5xl font-bold">
        Campaigns We’re Supporting
      </h1>
      <CampaignCard
        items={[
          {
            title: "Bilal",
            description: "This is a description for Bilal.",
            link: "/campaigns/${slug}",
          },
          {
            title: "Alice",
            description: "This is a description for Alice.",
            link: "https://example.com/alice",
          },
          {
            title: "John",
            description: "This is a description for John.",
            link: "https://example.com/john",
          },
        ]}
      />
    </div>
  );
}

export default page;
