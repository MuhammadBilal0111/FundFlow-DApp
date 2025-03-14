"use client";
import React, { useEffect, useState } from "react";
import { CampaignCard } from "@/components/cards/CampaignCard";
import { loadProjects } from "@/services/blockchain";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";

export interface Project {
  id: number;
  owner: string;
  title: string;
  description: string;
  slug: string;
  imageURL: string;
  cost: number;
  raised: number;
  timestamp: number;
  expiresAt: number;
  date: string;
  backers: number;
  status: number;
}

function page() {
  const [isPending, startTransition] = useTransition();
  console.log(isPending);
  const [projects, setProjects] = useState<Project[]>([]);
  useEffect(() => {
    const fetchProjects = async () => {
      const loadedProjects = (await loadProjects()) as Project[];
      startTransition(() => {
        setProjects(loadedProjects);
      });
      if (loadedProjects) {
        setProjects(loadedProjects); // Type assertion
      }
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
        <p className="text-white">Loading</p>
      ) : (
        projects?.length > 0 && <CampaignCard items={projects} />
      )}
    </div>
  );
}

export default page;
