"use client";
import React, { useEffect, useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";
import CreateCampaign from "@/components/forms/CreateCampaign";
import CampaignEditCard from "@/components/cards/CampaignEditCard";
import { loadProjectsByAddress, updateProject } from "@/services/blockchain";
import { Project } from "@/types/projects";
import { Roller } from "react-spinners-css";
import { ToastFailure } from "@/components/Toast";
import { dateToTimeStamp } from "@/utils/blockchain.utils";

function page() {
  const [projectPending, projectTransaction] = useTransition();
  const [disabledButtons, setDisabledButtons] = useState<{
    [key: number]: boolean;
  }>({});
  const [projects, setProjects] = useState<Project[]>([]);
  const [imageFile, setImageFile] = useState<File[]>([]);

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
  const handleSaveToContract = async (id: number) => {
    try {
      setDisabledButtons((prev) => ({ ...prev, [id]: true })); // disabling the button and storing the bool value for button
      const project = projects.find((project) => project.id === id);

      if (!project) return;
      let imageUrl = { secure_url: project.imageURL }; // imageUrl
      if (imageFile?.length) {
        const image = imageFile[0];
        const uploadedImage = (await handleImageUpload(image)) as {
          secure_url: string;
        };

        if (uploadedImage?.secure_url) {
          imageUrl = uploadedImage; // uploadedImage: { secure_url: "https://example.com/uploaded-image.jpg" }
        }
      }

      const data = {
        id: project?.id,
        title: project.title,
        description: project.description,
        imageURL: imageUrl?.secure_url,
        expiresAt: dateToTimeStamp(project.expiresAt),
      };

      const isUpdated = await updateProject(data);
      if (isUpdated) setProjects((await loadProjectsByAddress()) as Project[]); // if updation is successfull then show the updated cards
      // as is basically the type assertion
    } catch (error: any) {
      ToastFailure("Failed to update project");
      console.log(error);
    } finally {
      setDisabledButtons((prev) => ({ ...prev, [id]: false }));
    }
  };

  // function to store image
  const handleImageUpload = async (file: File) => {
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData, // Convert file to Base64 or URL
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.log("Upload Error:", error);
    }
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
              Empower Your Vision, Fuel It with Crypto - Create Your Project on
              FlowFund Today!
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
                  handleSaveToContract={handleSaveToContract}
                  setImageFile={setImageFile}
                  disabledButtons={disabledButtons}
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
