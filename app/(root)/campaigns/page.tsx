"use client";
import React, { useEffect, useState } from "react";
import { CampaignCard } from "@/components/cards/CampaignCard";
import { loadProjects } from "@/services/blockchain";

function page() {
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    const fetchProjects = async () => {
      const projects = await loadProjects();
      setProjects(projects);
    };
    fetchProjects();
  });
  return (
    <div className="mx-auto px-4 py-8 max-w-6xl">
      <h1 className="text-3xl md:text-5xl font-bold">
        Campaigns We’re Supporting
      </h1>
      <CampaignCard items={projects} />
    </div>
  );
}

export default page;
