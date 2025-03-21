import React from "react";
import { Card } from "@/components/cards/CampaignCard";
import { CardContent } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import type { Backers } from "@/types/backers";
import multiavatar from "@multiavatar/multiavatar/esm";

function BackersCard({ owner, timestamp, refunded, contribution }: Backers) {
  return (
    <Card className="overflow-x-auto  [&::-webkit-scrollbar]:h-1 [&::-webkit-scrollbar-track]:bg-gray-800 [&::-webkit-scrollbar-thumb]:bg-gray-500 [&::-webkit-scrollbar-thumb]:rounded-full">
      <CardContent className="p-4">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 bg-purple-700 text-gray-300">
              <AvatarImage
                src={`data:image/svg+xml;utf8,${encodeURIComponent(
                  multiavatar(owner.toString())
                )}`}
                alt={owner.toString()}
              />
              <AvatarFallback>{owner.toString().charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium truncate">
                Backer {owner.toString().substring(0, 6)}...
                {owner.toString().slice(-4)}
              </p>
              <p className="text-sm text-muted-foreground">
                {timestamp}
                {/* {new Date().toLocaleDateString("en-US", {
                                                year: "numeric",
                                                month: "short",
                                                day: "numeric",
                                              })} */}
              </p>
            </div>
          </div>
          <Badge variant="secondary" className="font-medium">
            {contribution} ETH
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}

export default BackersCard;
