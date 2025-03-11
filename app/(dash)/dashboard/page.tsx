"use client";
import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import CreateCampaign from "@/components/forms/CreateCampaign";
import CampaignEditCard from "@/components/cards/CampaignEditCard";

function page() {
  interface ProjectDetails {
    title: string;
    description: string;
    slug?: string;
    cost: number;
    raised: number;
    deadline: string;
    backers: number;
    imageURL: string;
  }
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab");
  const [projects, setProject] = useState<ProjectDetails[]>([
    {
      title: "EcoSmart Home System",
      description:
        "A revolutionary smart home system that reduces energy consumption by 50% while improving comfort and convenience.",
      slug: "ecoSmart-Home-system",
      cost: 100000,
      raised: 5000,
      deadline: "2023-12-31",
      backers: 1500,
      imageURL: "/placeholder.svg?height=300&width=600",
    },
    {
      title: "Temp Data",
      description:
        "A revolutionary smart home system that reduces energy consumption by 50% while improving comfort and convenience.",
      slug: "ecoSmart-Home-system",
      cost: 30000,
      raised: 7000,
      deadline: "2023-12-31",
      backers: 500,
      imageURL: "/placeholder.svg?height=300&width=600",
    },
  ]);
  return (
    <section>
      {tab === "create-campaign" && <CreateCampaign />}
      {tab === "view-campaign" &&
        projects.map((project) => <CampaignEditCard project={project} />)}
    </section>
  );
}

export default page;
