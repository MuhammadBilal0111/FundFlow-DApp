"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Edit2,
  Calendar,
  DollarSign,
  Users,
  ArrowRight,
  Upload,
} from "lucide-react";
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

interface ProjectDetails {
  title: string;
  description: string;
  slug?: string;
  cost: number;
  raised: number;
  deadline: string;
  backers: number;
  imageURL: string;
}

export default function CampaignEditCard() {
  const router = useRouter();
  const [project, setProject] = useState<ProjectDetails>({
    title: "EcoSmart Home System",
    description:
      "A revolutionary smart home system that reduces energy consumption by 50% while improving comfort and convenience.",
    slug: "ecoSmart-Home-system",
    cost: 100000,
    raised: 5000,
    deadline: "2023-12-31",
    backers: 1500,
    imageURL: "/placeholder.svg?height=300&width=600",
  });

  const [editField, setEditField] = useState<keyof ProjectDetails | null>(null);
  const [tempImage, setTempImage] = useState<string | null>(null); // use to store temperoray image to show
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleEdit = (field: keyof ProjectDetails) => {
    setEditField(field);
  };

  const handleSave = (field: keyof ProjectDetails, value: string | number) => {
    setProject((prev) => ({ ...prev, [field]: value }));
    setEditField(null);
  };

  const handlePreview = () => {
    // navigate to the preview page
    router.push(`/campaigns/${project?.slug}`);
  };

  // handle file change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target?.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setTempImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const EditDialog = ({
    field,
    title,
    description,
  }: {
    field: keyof ProjectDetails;
    title: string;
    description: string;
  }) => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" onClick={() => handleEdit(field)}>
          <Edit2 className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
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
              <Label htmlFor={field} className="text-right">
                {title}
              </Label>
              {field === "description" ? (
                <Textarea
                  id={field}
                  defaultValue={project[field]}
                  className="col-span-3"
                />
              ) : (
                <Input
                  id={field}
                  type={
                    field === "cost" || field === "backers" ? "number" : "text"
                  }
                  defaultValue={project[field]}
                  className="col-span-3"
                />
              )}
            </div>
          )}
        </div>
        <DialogFooter>
          {field !== "imageURL" && (
            <Button
              type="submit"
              onClick={() =>
                handleSave(
                  field,
                  (
                    document.getElementById(field) as
                      | HTMLInputElement
                      | HTMLTextAreaElement
                  ).value
                )
              }
            >
              Save changes
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );

  return (
    <Card className="w-full max-w-3xl">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-2xl font-bold">{project?.title}</CardTitle>
        <EditDialog
          field="title"
          title="Project Title"
          description="Edit your project's title"
        />
      </CardHeader>
      <CardContent>
        <div className="mb-6 relative rounded-lg overflow-hidden max-h-[400px]">
          <Image
            src={tempImage || project?.imageURL || "/placeholder.svg"}
            alt={`Image for ${project?.title}`}
            width={600}
            height={100}
            className="w-full object-cover rounded-lg"
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
                <span>Deadline: {project?.deadline}</span>
              </div>
              <EditDialog
                field="deadline"
                title="Deadline"
                description="Edit your project's deadline"
              />
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex flex-col space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Funding Goal</span>
                <EditDialog
                  field="cost"
                  title="Funding Goal"
                  description="Edit your project's funding goal"
                />
              </div>
              <div className="flex items-center text-2xl font-bold">
                <DollarSign className="mr-1 h-5 w-5 text-purple-600" />
                {project?.cost?.toLocaleString()}
              </div>
              <div className="h-2 w-full bg-gray-200 rounded-full">
                <motion.div
                  className="h-full bg-purple-600 rounded-full"
                  style={{ width: "75%" }}
                  initial={{ width: 0 }}
                  animate={{ width: "75%" }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
              </div>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>75% funded</span>
                <span>25 days left</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-purple-600" />
                <span className="text-sm font-medium">
                  {project?.backers} backers
                </span>
              </div>
              <EditDialog
                field="backers"
                title="Backers"
                description="Edit the number of backers"
              />
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={handlePreview}>
          Preview
        </Button>
        <Button className="bg-purple-700 hover:bg-purple-800 text-white">
          Publish Changes <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
