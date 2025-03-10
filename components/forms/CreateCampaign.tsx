import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Tiptap from "../Tiptap";
import { campaignValidations } from "@/lib/validations/campaigns";

function CreateCampaign() {
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

  return (
    <section className="max-w-3xl mx-auto">
      <div className="mb-5">
        <h1 className="text-gray-300 font-bold md:font-extrabold text-2xl md:text-4xl mb-2 md:mb-4">
          Create Project
        </h1>
        <p className="text-gray-400">
          Empower Your Vision, Fuel It with Crypto – Create Your Project on Flow
          Fund Today!
        </p>
      </div>

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
                    <Input placeholder="Cost" {...field} />
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
                      value={undefined}
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
                  <FormControl>{/* <Tiptap /> */}</FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <button
              className="relative h-12 overflow-hidden rounded-lg p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 w-full max-w-4xl mx-auto"
              type="submit"
            >
              <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
              <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg bg-gray-900 px-3 py-1 text-sm font-medium hover:bg-gray-950 text-white backdrop-blur-3xl">
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
