"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, Wallet, AlertCircle } from "lucide-react";
import { backProject, getBackers, loadProject } from "@/services/blockchain";
import { Roller } from "react-spinners-css";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState, useTransition } from "react";
import multiavatar from "@multiavatar/multiavatar/esm";
import Spinner from "@/components/Spinner";
import type { Backers } from "@/types/backers";
import type { Project } from "@/types/projects";
import { useParams } from "next/navigation";

export default function CampaignPage() {
  const params = useParams();
  const slug = params?.slug;

  const [amount, setAmount] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [backPending, backStartTransaction] = useTransition(); // for back transaction loader
  const [backersPending, backerStartTransaction] = useTransition(); // for backers fetching loader
  const [projectDetailsPending, projectDetailsTransaction] = useTransition(); // for project details fetching loader
  const [backers, setBackers] = useState<Backers[]>([]);
  const [projectDetails, setProjectDetails] = useState<Project>();

  useEffect(() => {
    if (!slug) return;

    const fetchBackers = async () => {
      backerStartTransaction(async () => {
        const backers = (await getBackers(0)) as Backers[];
        console.log(backers);
        setBackers(backers);
      });
    };
    const fetchProjectDetails = async () => {
      projectDetailsTransaction(async () => {
        const projectDetails = (await loadProject(
          Number(params?.slug)
        )) as Project[];
        setProjectDetails(projectDetails[0]);
      });
    };
    fetchProjectDetails();
    fetchBackers();
  }, [slug]);

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleBackProject = async () => {
    if (Number(amount) <= 0) return;

    backStartTransaction(async () => {
      try {
        await backProject(0, Number(amount));
        setAmount("");
        setDialogOpen(false);
        // Refresh backers list after successful backing
        setBackers((await getBackers(0)) as Backers[]);
      } catch (error: any) {
        console.error("Error backing project:", error);
      }
    });
  };

  return (
    <section className="container mx-auto px-4 py-8 max-w-6xl">
      {projectDetailsPending ? (
        <div className="flex justify-center items-center min-h-[50vh]">
          <Roller />
        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-3">
          {/* Left column - Campaign details */}

          {/* Right column - Campaign stats and backing */}
          <div className="md:col-span-1">
            <div className="sticky top-4">
              <Card className="dark:bg-gray-900 dark:text-gray-300 dark:border-gray-400">
                <CardContent className="p-6">
                  <div className="mb-6">
                    <div className="flex justify-between mb-2">
                      <span className="text-2xl font-bold text-blue-800 dark:text-gray-300">
                        {projectDetails?.raised} ETH
                      </span>
                      <span className="font-semibold text-blue-800 dark:text-gray-300">
                        of {projectDetails?.cost} ETH
                      </span>
                    </div>
                    {/* <Progress
                      value={
                        projectDetails?.cost
                          ? Math.min(
                              ((projectDetails.raised ?? 0) /
                                projectDetails.cost) *
                                100,
                              100
                            )
                          : 0
                      }
                      className="h-2 mb-2"
                    /> */}
                    <p className="text-sm">
                      {/* {Math.round(
                        projectDetails?.cost
                          ? ((projectDetails.raised ?? 0) /
                              projectDetails.cost) *
                              100
                          : 0
                      )} */}
                      % funded
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2 mb-1">
                        <Users size={16} />
                        <span className="text-sm">Backers</span>
                      </div>
                      <span className="font-semibold">{backers?.length}</span>
                    </div>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2 mb-1">
                        <Clock size={16} />
                        <span className="text-sm">Days Left</span>
                      </div>
                      <span className="font-semibold">
                        {/* {projectDetails?.expiresAt
                          ? Math.max(
                              0,
                              Math.floor(
                                (projectDetails.expiresAt - Date.now() / 1000) /
                                  86400
                              )
                            )
                          : "N/A"} */}
                      </span>
                    </div>
                  </div>
                  <Input
                    type="number"
                    placeholder="Amount to back"
                    className="mb-4 border border-gray-300"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                  <Button
                    className="flex items-center justify-center w-full mb-4 bg-purple-700 hover:bg-purple-800 duration-100 text-gray-300"
                    onClick={handleOpenDialog}
                    disabled={backPending || !amount}
                  >
                    <Wallet className="mr-2 h-4 w-4" /> Back This Project
                  </Button>

                  <div className="text-sm">
                    <p className="mb-2">
                      This campaign will only be funded if it reaches its goal
                      by the deadline.
                    </p>
                    <p>
                      Contributions are secured by smart contracts on the
                      blockchain.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Confirmation Dialog */}
              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                      <AlertCircle className="h-5 w-5 text-amber-500" />
                      Confirm Backing
                    </DialogTitle>
                    <DialogDescription>
                      Are you sure you want to back this project with {amount}{" "}
                      ETH? This action cannot be undone once confirmed on the
                      blockchain.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="amount" className="text-right">
                        Amount (ETH)
                      </Label>
                      <Input
                        id="amount"
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="0.1"
                        className="col-span-3"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      variant="outline"
                      onClick={() => setDialogOpen(false)}
                      disabled={backPending}
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleBackProject}
                      disabled={!amount || backPending}
                      className="bg-purple-700 hover:bg-purple-800 text-gray-300"
                    >
                      {backPending ? (
                        <div className="flex items-center gap-2">
                          <Spinner /> Processing...
                        </div>
                      ) : (
                        "Yes, Back This Project"
                      )}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
