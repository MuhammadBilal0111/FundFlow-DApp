import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { campaignValidations } from "@/lib/validations/campaigns";
import { Textarea } from "../ui/textarea";

function CreateCampaign() {
  const [imageFile, setImageFile] = useState<File[]>([]);
  // 1. Define your form.
  const form = useForm({
    resolver: zodResolver(campaignValidations),
    defaultValues: {
      title: "",
      description: "",
      cost: undefined,
      image: undefined,
    },
  });
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof campaignValidations>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  // handling image file
  const handleImageFile = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldChange: (value: string) => void
  ) => {
    e.preventDefault();
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setImageFile(Array.from(e.target.files));
      if (!file.type.includes("image")) return;
      fieldChange(e.target.value);
    }
  };
  // function to upload image in cloudinary
  const handleImageUpload = async (file: File) => {
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData, // Convert file to Base64 or URL
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.log("Upload Error:", error);
    }
  };

  return (
    <section className="px-4">
      <div className="mt-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-md text-gray-300">
                    Campaign Title
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="cost"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-md text-gray-300">
                    Campaign Cost
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Cost"
                      type="number"
                      {...field}
                      onChange={(e) =>
                        field.onChange(parseFloat(e.target.value))
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-md text-gray-300">
                    Campaign Image
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Image"
                      {...field}
                      type="file"
                      accept="image/*"
                      value={undefined}
                      onChange={(e) => handleImageFile(e, field.onChange)}
                      className="cursor-pointer"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-md text-gray-300">
                    Campaign Description
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Type your Campaign description here."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <button
              className="relative h-10 overflow-hidden rounded-lg p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 w-full max-w-4xl mx-auto"
              type="submit"
            >
              <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
              <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg bg-purple-700 px-3 py-1 text-sm font-medium hover:bg-purple-800 text-white backdrop-blur-3xl duration-75">
                Submit
              </span>
            </button>
          </form>
        </Form>
      </div>
    </section>
  );
}

export default CreateCampaign;
