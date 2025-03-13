"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  createProject,
  loadProject,
  loadProjects,
} from "@/services/blockchain";

function page() {
  const handleButton = async () => {
    // await createProject({
    //   title: "New Blockchain Project",
    //   description: "A crowdfunding project on Ethereum.",
    //   imageURL:
    //     "https://images.unsplash.com/photo-1605792657660-596af9009e82?q=80&w=1402&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    //   cost: 0.11,
    //   expiresAt: Math.floor(Date.now() / 1000) + 86400 * 14, // Expires in 14 days
    // });
    await loadProjects();
  };
  return (
    <div>
      <Button onClick={handleButton}>Click</Button>
    </div>
  );
}

export default page;
