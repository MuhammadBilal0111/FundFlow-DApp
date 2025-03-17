"use client";
import React, { useEffect, useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";
import CreateCampaign from "@/components/forms/CreateCampaign";
import CampaignEditCard from "@/components/cards/CampaignEditCard";
import { loadProjectsByAddress } from "@/services/blockchain";
import { Project } from "@/types/projects";
import { Roller } from "react-spinners-css";

function page() {
  const [projectPending, projectTransaction] = useTransition();
  const [projects, setProjects] = useState<Project[]>([]);

  console.log("projects_", projects);
  useEffect(() => {
    const fetchProjects = async () => {
      projectTransaction(async () => {
        setProjects((await loadProjectsByAddress()) as Project[]);
      });
    };
    fetchProjects();
  }, []);
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab");

  const handleUpdateProject = (
    id: number,
    field: keyof Project,
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
          {projectPending ? (
            <div className="flex justify-center items-center w-full mt-5">
              <Roller />
            </div>
          ) : projects.length === 0 ? (
            <p className="text-gray-300 text-md text-center mt-3">
              No Campaigns posted yet!
            </p>
          ) : (
            <>
              {projects?.map((project) => (
                <CampaignEditCard
                  key={project?.id}
                  project={project}
                  handleUpdateProject={handleUpdateProject}
                />
              ))}
            </>
          )}
        </>
      )}
    </section>
  );
}

export default page;
