"use client";

import type React from "react";

import { cn } from "@/lib/utils";

import { Card, CardContent } from "@/components/ui/card";

type DesignCardProps = React.ComponentProps<typeof Card> & {
  numberOfCards?: number;
};

export function CardsSkeletonLoader({ className, numberOfCards ,...props }: DesignCardProps) {
  return (
    // <div className="flex flex-col gap-3">
    <>

      {Array.from({ length: numberOfCards || 1 }).map(() => (
        <Card
          key={Math.random()}
          className={cn(
            "w-full max-w-md overflow-hidden shadow-none transition-all duration-300 rounded-none border-none p-0 gap-3 mx-auto",
            className
          )}
          {...props}
        >
          <div className="relative aspect-[4/3] w-full overflow-hidden border-1 bg-accent/20 animate-pulse duration-1000 rounded-lg cursor-pointer"></div>

          <CardContent className="p-0 ">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-7 w-7 border-1 rounded-full bg-accent/20 animate-pulse duration-1000"></div>
                <div className="h-4 w-24 bg-accent/20 rounded-sm"></div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-0 h-4 w-8 bg-accent/20 animate-pulse duration-1000 rounded-sm"></div>
                <div className="flex items-center gap-0 h-4 w-8 bg-accent/20 animate-pulse duration-1000 rounded-sm"></div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
      </>
    // </div>
  );
}
