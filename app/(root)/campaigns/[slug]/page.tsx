"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, Wallet, AlertCircle } from "lucide-react";
import { backProject, getBackers } from "@/services/blockchain";
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

interface Backers {
  owner: number;
  contribution: number;
  timestamp: number;
  refunded: boolean;
}

export default function CampaignPage({ params }: { params: { slug: string } }) {
  const [amount, setAmount] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [backPending, backStartTransaction] = useTransition(); // for back transaction loader
  const [backersPending, backerStartTransaction] = useTransition(); // for backers fetching loader
  const [backers, setBackers] = useState<Backers[]>([]);

  useEffect(() => {
    const fetchBackers = async () => {
      backerStartTransaction(async () => {
        const backers = (await getBackers(0)) as Backers[];
        console.log(backers);
        setBackers(backers);
      });
    };
    fetchBackers();
  }, []);

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
      } catch (error) {
        console.error("Error backing project:", error);
      }
    });
  };

  // This would typically come from an API or database
  const campaign = {
    id: params.slug,
    title: "Decentralized Renewable Energy Platform",
    description:
      "A blockchain-based platform that connects renewable energy producers with consumers, enabling peer-to-peer energy trading and incentivizing green energy production through tokenized rewards.",
    image: "/bilal.jpg",
    currentAmount: 18.5,
    targetAmount: 25,
    currency: "ETH",
    backers: backers?.length || 0,
    daysLeft: 56,
    creator: {
      name: "Muhammad Bilal",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="grid gap-8 md:grid-cols-3">
        {/* Left column - Campaign details */}
        <div className="md:col-span-2">
          <div className="relative aspect-video overflow-hidden rounded-xl mb-6">
            <Image
              src={campaign.image || "/placeholder.svg"}
              alt={campaign.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            {campaign.title}
          </h1>

          <div className="flex items-center gap-3 mb-6">
            <Avatar className="h-8 w-8">
              <AvatarImage
                src={campaign.creator.avatar}
                alt={campaign.creator.name}
              />
              <AvatarFallback>{campaign.creator.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <span className="text-sm text-muted-foreground">
              Created by{" "}
              <span className="font-semibold text-yellow-600">
                {campaign.creator.name}
              </span>
            </span>
          </div>

          <div className="prose max-w-none mb-8">
            <p>{campaign.description}</p>
          </div>

          {/* Backers section */}
          <h2 className="text-xl font-bold mb-4">Recent Backers</h2>

          {backersPending ? (
            <div className="flex justify-center py-8">
              <Roller />
            </div>
          ) : backers?.length > 0 ? (
            <div className="space-y-4 mb-8 pr-5 overflow-y-auto max-h-96 scrollbar-thin dark:scrollbar-thumb-gray-200 dark:scrollbar-track-gray-800">
              {backers.map((backer, i) => (
                <Card
                  key={i}
                  className="dark:bg-gray-900 dark:text-gray-400 dark:border-gray-400"
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10 text-gray-300">
                          <AvatarImage
                            src={`data:image/svg+xml;utf8,${encodeURIComponent(
                              multiavatar(backer.owner.toString())
                            )}`}
                            alt={backer.owner.toString()}
                          />
                          <AvatarFallback>
                            {backer.owner.toString().charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">Backer {backer?.owner}</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date().toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })}
                          </p>
                        </div>
                      </div>
                      <Badge variant="secondary" className="font-medium">
                        {backer?.contribution} {campaign?.currency}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="bg-gray-900 rounded-lg p-8 text-center mb-8">
              <p className="text-muted-foreground">
                No backers yet. Be the first to support this project!
              </p>
            </div>
          )}
        </div>

        {/* Right column - Campaign stats and backing */}
        <div className="md:col-span-1">
          <div className="sticky top-4">
            <Card className="dark:bg-gray-900 dark:text-gray-300 dark:border-gray-400">
              <CardContent className="p-6">
                <div className="mb-6">
                  <div className="flex justify-between mb-2">
                    <span className="text-2xl font-bold text-blue-800 dark:text-gray-300">
                      {campaign.currentAmount} {campaign.currency}
                    </span>
                    <span className="font-semibold text-blue-800 dark:text-gray-300">
                      of {campaign?.targetAmount} {campaign?.currency}
                    </span>
                  </div>
                  <Progress
                    value={
                      (campaign.currentAmount / campaign.targetAmount) * 100
                    }
                    className="h-2 mb-2"
                    color="bg-blue-800"
                  />
                  <p className="text-sm">
                    {Math.round(
                      (campaign.currentAmount / campaign.targetAmount) * 100
                    )}
                    % funded
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2 mb-1">
                      <Users size={16} />
                      <span className="text-sm">Backers</span>
                    </div>
                    <span className="font-semibold">{campaign.backers}</span>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2 mb-1">
                      <Clock size={16} />
                      <span className="text-sm">Days Left</span>
                    </div>
                    <span className="font-semibold">{campaign.daysLeft}</span>
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
                    This campaign will only be funded if it reaches its goal by
                    the deadline.
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
                      <div className="flex items-center gap-3">
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
    </div>
  );
}
