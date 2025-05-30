"use client";

import type React from "react";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Edit2,
  Calendar,
  DollarSign,
  Users,
  ArrowRight,
  Upload,
  Wallet,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import Image from "next/image";
import type { Project } from "@/types/projects";
import Spinner from "../Spinner";
import { getRemainingDays } from "@/utils/blockchain.utils";
import { payoutProject } from "@/services/blockchain";

export default function CampaignEditCard({
  project,
  handleUpdateProject,
  handleSaveToContract,
  setImageFile,
  disabledButtons,
}: {
  project: Project;
  handleUpdateProject: (
    id: number,
    field: keyof Project,
    value: string | number
  ) => void;
  handleSaveToContract: (id: number) => void;
  setImageFile: (files: File[]) => void;
  disabledButtons: { [key: number]: boolean };
}) {
  const router = useRouter();
  const [editField, setEditField] = useState<keyof Project | null>(null);
  const [tempImage, setTempImage] = useState<string | null>(null); // use to store temporary image to show
  const fileInputRef = useRef<HTMLInputElement>(null);

  // handle page navigation
  const handlePreview = () => {
    router.push(`/campaigns/${project?.slug}`);
  };

  // handle file change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files; // Extract files safely
    if (!files || files.length === 0) return; // Prevent issues

    setImageFile(Array.from(files)); // Convert FileList to File[]

    const file = files[0]; // Get the first file
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target) {
        setTempImage(event.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const EditDialog = ({
    field,
    title,
    description,
  }: {
    field: keyof Project;
    title: string;
    description: string;
  }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleOpenChange = (open: boolean) => {
      setIsOpen(open);
      if (open) {
        setEditField(field);
      }
      setEditField(null);
    };

    const handleSaveChanges = () => {
      if (field === "imageURL") return;

      const element = document.getElementById(field) as
        | HTMLInputElement
        | HTMLTextAreaElement;
      if (element) {
        handleUpdateProject(project.id, field, element.value);
        setIsOpen(false);
      }
    };

    return (
      <Dialog open={isOpen} onOpenChange={handleOpenChange}>
        <DialogTrigger asChild>
          <Button variant="ghost" size="icon">
            <Edit2 className="h-4 w-4" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit {title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {field === "imageURL" ? (
              <div className="flex flex-col items-center gap-4">
                <div className="flex items-center gap-2">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                    ref={fileInputRef}
                  />
                  <Button onClick={() => fileInputRef.current?.click()}>
                    <Upload className="mr-2 h-4 w-4" /> Choose Image
                  </Button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor={field}>{title}</Label>
                {field === "description" ? (
                  <Textarea
                    id={field}
                    defaultValue={String(project[field])}
                    className="col-span-8"
                    rows={6}
                  />
                ) : (
                  <Input
                    id={field}
                    type={
                      field === "title"
                        ? "number"
                        : field === "expiresAt"
                        ? "date"
                        : "text"
                    }
                    defaultValue={String(project[field])}
                    className="col-span-3"
                  />
                )}
              </div>
            )}
          </div>
          <DialogFooter>
            {field !== "imageURL" && (
              <Button type="submit" onClick={handleSaveChanges}>
                Save changes
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  };

  const StatusBadge = ({ status }: { status: number }) => {
    const getStatusProps = () => {
      switch (status) {
        case 0:
          return {
            variant: "outline",
            className: "bg-green-300 text-green-800 border-green-300",
            label: "Open",
          };
        case 1:
          return {
            variant: "outline",
            className: "bg-blue-300 text-blue-800 border-blue-300",
            label: "Approved",
          };
        case 2:
          return {
            variant: "outline",
            className: "bg-red-300 text-red-800 border-red-300",
            label: "Reverted",
          };
        case 3:
          return {
            variant: "outline",
            className: "bg-gray-300 text-gray-800 border-gray-300",
            label: "Deleted",
          };
        case 4:
          return {
            variant: "outline",
            className: "bg-gray-300 text-gray-800 border-gray-300",
            label: "PAIDOUT",
          };
        default:
          return {
            variant: "outline",
            className: "bg-gray-100 text-gray-800 border-gray-300",
            label: "Unknown",
          };
      }
    };

    const { className, label } = getStatusProps();

    return (
      <Badge variant="outline" className={className}>
        {label}
      </Badge>
    );
  };

  return (
    <Card className="w-full max-w-3xl mb-3 px-1 sm:px-2 md:px-4">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-2xl font-bold">{project?.title}</CardTitle>
        <div className="flex items-center gap-2">
          <StatusBadge status={project?.status} />
          <EditDialog
            field="title"
            title="Project Title"
            description="Edit your project's title"
          />
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-6 relative rounded-lg overflow-hidden max-h-[400px]">
          <Image
            src={tempImage || project?.imageURL || "/placeholder.svg"}
            alt={`Image for ${project?.title}`}
            width={600}
            height={100}
            className="flex items-center w-full object-cover rounded-lg h-64"
          />
          <div className="absolute top-2 right-2 bg-background/80 rounded-lg p-1">
            <EditDialog
              field="imageURL"
              title="Project Image"
              description="Edit your project's image URL"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-10">
          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <CardDescription className="mt-1 text-gray-300 text-md line-clamp-3 max-w-3xl">
                {project?.description}
              </CardDescription>
              <EditDialog
                field="description"
                title="Project Description"
                description="Edit your project's description"
              />
            </div>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center">
                <Calendar className="mr-1 h-4 w-4" />
                <span>Deadline: {project?.expiresAt}</span>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex flex-col space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Funding Goal</span>
              </div>
              <div className="flex items-center text-2xl font-bold">
                <div className="flex items-center gap-2">
                  <Wallet className="mr-1 h-5 w-5 text-purple-600" />
                  {project?.cost} Eth
                </div>
              </div>
              <div className="h-2 w-full bg-gray-200 rounded-full">
                <motion.div
                  className="h-full bg-purple-600 rounded-full"
                  style={{
                    width:
                      Math.min((project?.raised / project?.cost) * 100, 100) +
                      "%",
                  }}
                  initial={{ width: 0 }}
                  animate={{
                    width:
                      Math.min((project?.raised / project?.cost) * 100, 100) +
                      "%",
                  }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
              </div>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>
                  {((project?.raised / project?.cost) * 100)?.toFixed(0)}%
                  funded
                </span>
                <span>{getRemainingDays(project?.expiresAt)} days left</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-purple-600" />
                <span className="text-sm font-medium">
                  {project?.backers} backers
                </span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between sm:flex-row flex-col gap-3 max-sm:w-full">
        <Button
          variant="outline"
          onClick={handlePreview}
          className="hover:bg-secondary max-sm:w-full"
        >
          Preview
        </Button>
        <div className="flex gap-2 max-sm:w-full">
          {/* {project?.status === 4 && (
            <Button
              variant="outline"
              onClick={() => payoutProject(project.id)}
              className="border-purple-600 text-purple-600 hover:bg-purple-600 bg-transparent flex items-center max-sm:flex-1"
            >
              <DollarSign className="mr-2 h-4 w-4" />
              Payout
            </Button>
          )} */}
          <Button
            className="bg-purple-700 hover:bg-purple-800 text-white flex items-center min-w-[180px] max-sm:flex-1"
            disabled={
              disabledButtons[project.id] ||
              project?.status === 2 ||
              project?.status === 4
            }
            onClick={() => handleSaveToContract(project.id)}
          >
            {disabledButtons[project.id] ? (
              <Spinner />
            ) : (
              <span className="flex items-center justify-center">
                Publish Changes
                <ArrowRight className="ml-2 h-4 w-4" />
              </span>
            )}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
