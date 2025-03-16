"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AlertCircle, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface Props {
  amount: string;
  setAmount: (value: string) => void;
  handleBackProject: () => void;
  dialogOpen: boolean;
  setDialogOpen: (open: boolean) => void;
  backPending: boolean;
}

function ConfirmBack({
  amount,
  setAmount,
  handleBackProject,
  dialogOpen,
  setDialogOpen,
  backPending,
}: Props) {
  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-amber-500" />
            Confirm Backing
          </DialogTitle>
          <DialogDescription>
            Are you sure you want to back this project with {amount} ETH? This
            action cannot be undone once confirmed on the blockchain.
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
                <Loader2 className="h-4 w-4 animate-spin" /> Processing...
              </div>
            ) : (
              "Yes, Back This Project"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ConfirmBack;
