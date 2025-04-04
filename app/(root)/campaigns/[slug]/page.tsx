"use client";

import Image from "next/image";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  backProject,
  getBackers,
  loadProjectBySlug,
} from "@/services/blockchain";
import { useEffect, useState, useTransition } from "react";
import type { Backers } from "@/types/backers";
import type { Project } from "@/types/projects";
import { useParams } from "next/navigation";
import BackersCard from "@/components/cards/BackersCard";
import BackProjectCard from "@/components/cards/BackProjectCard";
import ConfirmBack from "@/components/Dialog/ConfirmBack";
import { Roller } from "react-spinners-css";

export default function Page() {
  const params = useParams();
  const slug = params?.slug?.toString();
  const [amount, setAmount] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [backPending, backStartTransaction] = useTransition(); // for back transaction loader
  const [backersPending, backerStartTransaction] = useTransition(); // for backers fetching loader
  const [projectDetailsPending, projectDetailsTransaction] = useTransition(); // for project details fetching loader
  const [backers, setBackers] = useState<Backers[]>([]);
  const [projectDetails, setProjectDetails] = useState<Project>();

  useEffect(() => {
    // Fetch Project Details First
    const fetchProjectDetails = async () => {
      projectDetailsTransaction(async () => {
        const projectData = (await loadProjectBySlug(slug || "")) as Project[];
        setProjectDetails(projectData?.[0] || null);
      });
    };
    fetchProjectDetails();
  }, [slug, params.slug]);

  useEffect(() => {
    // Fetch Backers Only When Project Details Are Available

    const fetchBackers = async () => {
      backerStartTransaction(async () => {
        const backers = (await getBackers(projectDetails!.id)) as Backers[];
        setBackers(backers);
      });
    };

    fetchBackers();
  }, [projectDetails]); // Runs only when projectDetails is set

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleBackProject = async () => {
    if (Number(amount) <= 0) return;
    backStartTransaction(async () => {
      try {
        await backProject(projectDetails!.id, Number(amount));
        setAmount("");
        setDialogOpen(false);
        // Refresh backers list after successful backing
        const projectData = (await loadProjectBySlug(slug || "")) as Project[];
        setProjectDetails(projectData?.[0] || null);
        setBackers((await getBackers(projectDetails!.id)) as Backers[]);
      } catch (error: any) {
        console.error("Error backing project:", error);
      }
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {projectDetailsPending ? (
        <div className="flex justify-center items-center min-h-screen">
          <Roller />
        </div>
      ) : (
        <>
          {projectDetails && (
            <div className="flex items-start gap-5 justify-center flex-col lg:flex-row">
              <div className="lg:w-[65%] w-full">
                <div className="relative aspect-video overflow-hidden rounded-xl mb-6">
                  {projectDetails?.imageURL ? (
                    <Image
                      src={projectDetails.imageURL || "/placeholder.svg"}
                      alt={projectDetails.title ?? "Project Image"}
                      fill
                      className="object-cover"
                      priority
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full bg-gray-200 dark:bg-gray-800">
                      <span className="text-gray-500 dark:text-gray-400">
                        No Image Available
                      </span>
                    </div>
                  )}
                </div>

                <h1 className="text-3xl md:text-5xl font-bold mb-4">
                  {projectDetails?.title}
                </h1>

                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8 bg-purple-700">
                    <AvatarFallback>
                      {projectDetails?.title?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm text-muted-foreground">
                    Created by{" "}
                    <span className="font-semibold text-yellow-600">
                      {projectDetails?.owner?.slice(0, 6)}...
                      {projectDetails?.owner?.slice(-6)}
                    </span>
                  </span>
                </div>

                <div className="prose max-w-none mb-8 dark:text-gray-300">
                  <p>{projectDetails?.description}</p>
                </div>

                {/* Backers section */}
                <h2 className="text-xl font-bold mb-4">Recent Backers</h2>
                {backersPending ? (
                  <div className="flex justify-center py-8">
                    <Roller />
                  </div>
                ) : backers?.length > 0 ? (
                  <div className="flex flex-col w-full space-y-4 overflow-y-auto max-h-96 [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-track]:bg-gray-800 [&::-webkit-scrollbar-thumb]:bg-gray-500 [&::-webkit-scrollbar-thumb]:rounded-full">
                    {backers.map((backer, i) => (
                      <BackersCard
                        key={i}
                        owner={backer.owner}
                        timestamp={backer.timestamp}
                        refunded={backer.refunded}
                        contribution={backer.contribution}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="bg-gray-100 dark:bg-gray-900 rounded-lg p-8 text-center mb-8">
                    <p className="text-muted-foreground">
                      No backers yet. Be the first to support this project!
                    </p>
                  </div>
                )}
              </div>
              <div className="flex-1 w-full sticky top-4">
                <BackProjectCard
                  raised={projectDetails?.raised || 0}
                  cost={projectDetails?.cost || 0}
                  status={projectDetails?.status}
                  backersLength={backers.length}
                  handleOpenDialog={handleOpenDialog}
                  expiresAt={projectDetails?.expiresAt}
                />
                <ConfirmBack
                  amount={amount}
                  setAmount={setAmount}
                  handleBackProject={handleBackProject}
                  dialogOpen={dialogOpen}
                  setDialogOpen={setDialogOpen}
                  backPending={backPending}
                />
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
