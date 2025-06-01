import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function ArrowButton({
  children,
  onClick,
  onSide,
  variant,
  className
}: {
  children: React.ReactNode;
  onClick: () => void;
  onSide: "left" | "right";
  variant?: "ghost" | "outline";
  className?: string;
}) {
  return (
    <Button className={cn(className, "group")} variant={variant || "default"} onClick={onClick}>
      {onSide === "left" ? (
        <>
          <ArrowLeftIcon
            className="-ms-1 opacity-60 transition-transform group-hover:-translate-x-0.5"
            size={16}
            aria-hidden="true"
          />
          {children}
        </>
      ) : (
        <>
          {children}
          <ArrowRightIcon
            className="-me-1 opacity-60 transition-transform group-hover:translate-x-0.5"
            size={16}
            aria-hidden="true"
          />
        </>
      )}
      {/* <ArrowLeftIcon
        className="-ms-1 opacity-60 transition-transform group-hover:-translate-x-0.5"
        size={16}
        aria-hidden="true"
      />
      Button */}
    </Button>
  );
}
