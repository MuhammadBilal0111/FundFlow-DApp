"use client";
import { cn } from "@/lib/utils";
import type React from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import type { Project } from "@/app/(root)/campaigns/page";
import { Progress } from "@/components/ui/progress";

export const CampaignCard = ({
  items,
  className,
}: {
  items?: Project[] | [];
  className?: string;
}) => {
  // Use sample campaigns if no items are provided
  const campaignsToShow = items && items.length > 0 ? items : [];
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Helper function to format ETH values
  const formatEth = (value: number | undefined | null) => {
    if (value === undefined || value === null) return "0.00 ETH";
    return `${Number(value).toFixed(2)} ETH`;
  };

  // Helper function to calculate progress percentage
  const calculateProgress = (
    raised: number | undefined | null,
    cost: number | undefined | null
  ) => {
    if (!raised || !cost || cost === 0) return 0;
    const progress = (Number(raised) / Number(cost)) * 100;
    return Math.min(progress, 100); // Cap at 100%
  };

  // Helper function to determine status text
  const getStatusText = (status: number) => {
    switch (status) {
      case 0:
        return "Open";
      case 1:
        return "Approved";
      case 2:
        return "Reverted";
      case 3:
        return "Deleted";
      case 4:
        return "Paid";
      default:
        return "Unknown";
    }
  };

  // Helper function to determine status color
  const getStatusColor = (status: number) => {
    switch (status) {
      case 0:
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300";
      case 1:
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
      case 2:
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300";
      case 3:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300";
      case 4:
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300";
    }
  };

  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-6",
        className
      )}
    >
      {campaignsToShow.map((item, idx) => (
        <Link
          href={`/campaigns/${item.slug}`}
          key={idx}
          className="relative group block h-full w-full"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full bg-accent/50 dark:bg-accent/30 block rounded-xl"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }}
              />
            )}
          </AnimatePresence>
          <Card>
            <CardImage src={item?.imageURL} alt={item?.title} />
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <CardTitle>{item?.title}</CardTitle>
                <div
                  className={cn(
                    "text-xs px-2 py-1 rounded-full",
                    getStatusColor(item?.status)
                  )}
                >
                  {getStatusText(item?.status)}
                </div>
              </div>
              <CardDescription>{item?.description}</CardDescription>

              <div className="mt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Raised:</span>
                  <span className="font-medium">{formatEth(item.raised)}</span>
                </div>
                <Progress
                  value={calculateProgress(item.raised, item.cost)}
                  className="h-2"
                />
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Goal:</span>
                  <span className="font-medium">{formatEth(item?.cost)}</span>
                </div>
              </div>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "rounded-xl h-full w-full overflow-hidden bg-card border border-border shadow-sm transition-all duration-200 group-hover:shadow-md group-hover:border-border/80 relative z-20",
        className
      )}
    >
      <div className="relative z-50">
        <div>{children}</div>
      </div>
    </div>
  );
};

export const CardImage = ({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) => {
  return (
    <div
      className={cn("w-full aspect-video relative overflow-hidden", className)}
    >
      <Image
        src={src || "/placeholder.svg?height=200&width=400"}
        alt={alt || "Campaign image"}
        fill
        className="object-cover transition-transform duration-300 group-hover:scale-105"
      />
    </div>
  );
};

export const CardTitle = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <h4
      className={cn(
        "text-foreground font-bold tracking-wide text-lg",
        className
      )}
    >
      {children}
    </h4>
  );
};

export const CardDescription = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <p
      className={cn(
        "mt-2 text-muted-foreground tracking-wide leading-relaxed text-sm line-clamp-3",
        className
      )}
    >
      {children}
    </p>
  );
};
