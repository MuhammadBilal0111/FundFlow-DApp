"use client";
import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import CreateCampaign from "@/components/forms/CreateCampaign";
import CampaignEditCard from "@/components/cards/CampaignEditCard";

function page() {
  interface ProjectDetails {
    id: number;
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
  const [projects, setProjects] = useState<ProjectDetails[]>([
    {
      id: 0,
      title: "EcoSmart Home System",
      description:
        "A revolutionary smart home system that reduces energy consumption by 50% while improving comfort and convenience.",
      slug: "ecoSmart-Home-system",
      cost: 100000,
      raised: 5000,
      deadline: "2023-12-31",
      backers: 1500,
      imageURL: "/assets/bitcoin.jpg",
    },
    {
      id: 1,
      title: "Temp Data",
      description:
        "A revolutionary smart home system that reduces energy consumption by 50% while improving comfort and convenience.",
      slug: "system",
      cost: 30000,
      raised: 7000,
      deadline: "2023-12-31",
      backers: 500,
      imageURL: "/assets/home.jpg",
    },
  ]);
  const handleUpdateProject = (
    id: number,
    field: keyof ProjectDetails,
    value: string | number
  ) => {
    setProjects(
      projects.map((project) =>
        project.id === id ? { ...project, [field]: value } : project
      )
    );
  };

  return (
    <section>
      {tab === "create-campaign" && (
        <>
          <div className="mb-5">
            <h1 className="text-gray-300 font-bold md:font-extrabold text-2xl md:text-4xl mb-2 md:mb-4">
              Create Campaign
            </h1>
            <p className="text-gray-400">
              Empower Your Vision, Fuel It with Crypto – Create Your Project on
              Flow Fund Today!
            </p>
          </div>
          <CreateCampaign />
        </>
      )}
      {tab === "view-campaign" && (
        <>
          <div className="mb-5">
            <h1 className="text-gray-300 font-bold md:font-extrabold text-2xl md:text-4xl mb-2 md:mb-4">
              Your Campaigns
            </h1>
            <p className="text-gray-400">Campaigns Overview</p>
          </div>
          <>
            {projects?.map((project) => (
              <CampaignEditCard
                key={project?.id}
                project={project}
                handleUpdateProject={handleUpdateProject}
              />
            ))}
          </>
        </>
      )}
    </section>
  );
}

export default page;
