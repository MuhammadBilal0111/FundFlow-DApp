"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, Wallet } from "lucide-react";
import { backProject } from "@/services/blockchain";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRef, useState, useTransition } from "react";
import Spinner from "@/components/Spinner";



export default function CampaignPage({ params }: { params: { slug: string } }) {
  const backInputElement = useRef<HTMLInputElement>(null);
  const [isPending, startTransaction] = useTransition(); // for loader

  const handleBackProject = async () => {
    const amount = backInputElement?.current?.value;
    if (Number(amount) > 0) {
      startTransaction(async () => {
        await backProject(0, Number(amount));
        if (backInputElement.current) {
          backInputElement.current.value = "";
        }
      });
    }
  };

  // This would typically come from an API or database
  const campaign = {
    id: params.slug,
    title: "Decentralized Renewable Energy Platform",
    description:
      "A blockchain-based platform that connects renewable energy producers with consumers, enabling peer-to-peer energy trading and incentivizing green energy production through tokenized rewards.",
    image: "/placeholder.svg?height=400&width=800",
    currentAmount: 18.5,
    targetAmount: 25,
    currency: "ETH",
    backers: 124,
    daysLeft: 15,
    creator: {
      name: "EnergyDAO",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    recentBackers: [
      {
        id: 1,
        name: "Alex",
        amount: 2.5,
        timestamp: "2025-03-08T14:30:00Z",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      {
        id: 2,
        name: "Maria",
        amount: 1.0,
        timestamp: "2025-03-07T09:15:00Z",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      {
        id: 3,
        name: "John",
        amount: 0.5,
        timestamp: "2025-03-06T18:45:00Z",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      {
        id: 4,
        name: "Sarah",
        amount: 3.0,
        timestamp: "2025-03-05T11:20:00Z",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      {
        id: 5,
        name: "David",
        amount: 1.5,
        timestamp: "2025-03-04T16:10:00Z",
        avatar: "/placeholder.svg?height=40&width=40",
      },
    ],
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2">
          <div className="relative aspect-video overflow-hidden rounded-xl mb-6">
            <Image
              src={"/bilal.jpg"}
              alt={campaign.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Decentralized Renewable Energy Platform
          </h1>

          <div className="flex items-center gap-3 mb-6">
            <Avatar className="h-8 w-8">
              <AvatarImage
                src={campaign.creator.avatar}
                alt={"Muhammad Bilal"}
              />
              <AvatarFallback>{campaign.creator.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <span className="text-sm text-muted-foreground">
              Created by{" "}
              <span className="font-semibold text-yellow-600">
                {"Muhammad Bilal"}
              </span>
            </span>
          </div>

          <div className="prose max-w-none mb-8">
            <p>{campaign.description}</p>
          </div>

          <h2 className="text-xl font-bold mb-4">Recent Backers</h2>
          <div className="space-y-4 mb-8 pr-5 overflow-y-auto max-h-96 scrollbar-thin dark:scrollbar-thumb-gray-200 dark:scrollbar-track-gray-800">
            {campaign.recentBackers.map((backer) => (
              <Card
                key={backer.id}
                className="dark:bg-gray-900 dark:text-gray-400 dark:border-gray-400"
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10 bg-blue-800 text-gray-300">
                        <AvatarImage src={backer.avatar} alt={backer.name} />
                        <AvatarFallback>{backer.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{backer.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(backer.timestamp).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            }
                          )}
                        </p>
                      </div>
                    </div>
                    <Badge variant="secondary" className="font-medium">
                      {backer.amount} {campaign.currency}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="md:col-span-1">
          <div className="sticky top-4">
            <Card className="dark:bg-gray-900 dark:text-gray-300 dark:border-gray-400">
              <CardContent className="p-6">
                <div className="mb-6">
                  <div className="flex justify-between mb-2">
                    <span className="text-2xl font-bold text-blue-800 dark:text-gray-300">
                      18.5 Eth
                    </span>
                    <span className="font-semibold text-blue-800 dark:text-gray-300">
                      of 25 Eth
                    </span>
                  </div>
                  <Progress
                    value={50}
                    className="h-2 mb-2"
                    color="bg-blue-800"
                  />
                  <p className="text-sm">60% funded</p>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2 mb-1">
                      <Users size={16} />
                      <span className="text-sm">Backers</span>
                    </div>
                    <span className="font-semibold">126</span>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2 mb-1">
                      <Clock size={16} />
                      <span className="text-sm">Days Left</span>
                    </div>
                    <span className="font-semibold">56</span>
                  </div>
                </div>
                <Input
                  type="number"
                  placeholder="Amount To back"
                  className="mb-4 border border-gray-300"
                  ref={backInputElement}
                />
                <Button
                  disabled={isPending}
                  className="flex items-center justify-center w-full mb-4 bg-purple-700 hover:bg-purple-800 duration-100 text-gray-300"
                  onClick={handleBackProject}
                >
                  {isPending ? (
                    <Spinner />
                  ) : (
                    <>
                      <Wallet className="mr-2 h-4 w-4" /> Back This Project
                    </>
                  )}
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
          </div>
        </div>
      </div>
    </div>
  );
}
