"use client";
import React, { useEffect, useState } from "react";
import { CampaignCard } from "@/components/cards/CampaignsCard";
import { loadProjects } from "@/services/blockchain";
import { useTransition } from "react";
import type { Project } from "@/types/projects";
import { Roller } from "react-spinners-css";

function page() {
  const [isPending, startTransition] = useTransition();
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      startTransition(async () => {
        const loadedProjects = (await loadProjects()) as Project[];
        setProjects(loadedProjects);
      });
    };
    fetchProjects();
  }, []);

  return (
    <div className="mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-2">
        <h1 className="text-3xl md:text-5xl font-bold">
          Campaigns We’re Supporting
        </h1>
        <p className="text-md font-semi-bold text-gray-400 mt-3">
          Discover the Campaigns We’re Supporting, where innovation meets impact
        </p>
      </div>
      {isPending ? (
        <div className="flex justify-center mt-4">
          <Roller />
        </div>
      ) : (
        projects?.length > 0 && <CampaignCard items={projects} />
      )}
    </div>
  );
}

export default page;
