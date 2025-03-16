"use client";

import Image from "next/image";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { backProject, getBackers, loadProject } from "@/services/blockchain";
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
  const slug = Number(params?.slug);
  const [amount, setAmount] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [backPending, backStartTransaction] = useTransition(); // for back transaction loader
  const [backersPending, backerStartTransaction] = useTransition(); // for backers fetching loader
  const [projectDetailsPending, projectDetailsTransaction] = useTransition(); // for project details fetching loader
  const [backers, setBackers] = useState<Backers[]>([]);
  const [projectDetails, setProjectDetails] = useState<Project>();

  useEffect(() => {
    // use effect to get the backers data and the project details from blockchain
    const fetchBackers = async () => {
      backerStartTransaction(async () => {
        const backers = (await getBackers(slug)) as Backers[];
        setBackers(backers);
      });
    };
    const fetchProjectDetails = async () => {
      projectDetailsTransaction(async () => {
        const projectDetails = (await loadProject(slug)) as Project[];
        console.log(projectDetails);
        setProjectDetails(projectDetails?.[0]);
      });
    };
    fetchProjectDetails();
    fetchBackers();
  }, [slug, params.slug]);

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleBackProject = async () => {
    if (Number(amount) <= 0) return;
    backStartTransaction(async () => {
      try {
        await backProject(slug, Number(amount));
        setAmount("");
        setDialogOpen(false);
        // Refresh backers list after successful backing
        setBackers((await getBackers(slug)) as Backers[]);
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
          {projectDetails ? (
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

                <div className="flex items-center gap-3 mb-6">
                  <Avatar className="h-8 w-8 bg-purple-700">
                    <AvatarFallback>
                      {projectDetails?.title?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm text-muted-foreground">
                    Created by{" "}
                    <span className="font-semibold text-yellow-600">bilal</span>
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
                  <div className="flex flex-col w-full space-y-4 mb-8 overflow-y-auto max-h-96 [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-track]:bg-gray-800 [&::-webkit-scrollbar-thumb]:bg-gray-500 [&::-webkit-scrollbar-thumb]:rounded-full">
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
                  backersLength={backers.length}
                  handleOpenDialog={handleOpenDialog}
                  expiresAt={projectDetails?.timestamp}
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
          ) : (
            <p className="text-gray-300 text-center">No Project Found!</p>
          )}
        </>
      )}
    </div>
  );
}
