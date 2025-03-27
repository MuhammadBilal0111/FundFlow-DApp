import { Card } from "@/components/cards/CampaignsCard";
import { CardContent } from "@/components/ui/card";
import { Clock, Users, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { getRemainingDays } from "@/utils/blockchain.utils";

interface Props {
  cost: number;
  raised: number;
  status: number;
  backersLength: number;
  handleOpenDialog: () => void;
  expiresAt?: string;
}

function BackProjectCard({
  raised,
  cost,
  status,
  backersLength,
  handleOpenDialog,
  expiresAt,
}: Props) {
  const progressPercentage = cost
    ? Math.min(((raised ?? 0) / cost) * 100, 100)
    : 0;

  return (
    <article className="sticky top-4">
      <Card className="bg-slate-950 text-gray-300 dark:border-gray-400">
        <CardContent className="p-6">
          <div className="mb-6">
            <div className="flex justify-between mb-2">
              <span className="text-2xl font-bold text-blue-800 dark:text-gray-300">
                {raised} ETH
              </span>
              <span className="font-semibold text-blue-800 dark:text-gray-300">
                of {cost} ETH
              </span>
            </div>
            <Progress value={progressPercentage} className="h-2 mb-2" />
            <p className="text-sm">
              {Math.round(progressPercentage) + "% funded"}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="flex flex-col">
              <div className="flex items-center gap-2 mb-1">
                <Users size={16} />
                <span className="text-sm">Backers</span>
              </div>
              <span className="font-semibold">{backersLength}</span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2 mb-1">
                <Clock size={16} />
                <span className="text-sm">Days Left</span>
              </div>
              <span className="font-semibold">
                {getRemainingDays(expiresAt!)} days left
              </span>
            </div>
          </div>
          <Button
            className="flex items-center justify-center w-full mb-4 bg-purple-700 hover:bg-purple-800 duration-100 text-gray-300"
            onClick={handleOpenDialog}
            disabled={status !== 0}
          >
            <Wallet className="mr-2 h-4 w-4" /> Back This Project
          </Button>

          <div className="text-sm">
            <p className="mb-2">
              This campaign will only be funded if it reaches its goal by the
              deadline.
            </p>
            <p>
              Contributions are secured by smart contracts on the blockchain.
            </p>
          </div>
        </CardContent>
      </Card>
    </article>
  );
}

export default BackProjectCard;
