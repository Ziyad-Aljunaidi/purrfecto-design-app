import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface ProfileProps {
  name: string;
  email: string;
  avatarUrl?: string;
  // profileId?: string;
  className?: string;
  bannerClassName?: string;
}

export const Profile: React.FC<ProfileProps> = ({
  name,
  email,
  avatarUrl,
  // profileId,
  className = "",
  bannerClassName = "",
}) => {
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  return (
    <main className={cn("w-full h-auto", className)}>
      <div
        className={cn(
          "relative h-64 md:h-80 lg:h-96 w-full max-w-[1728px] mx-auto rounded-xl bg-background ring-1 ring-accent my-2",
          bannerClassName
        )}
      >
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
          <div className="flex flex-col items-center justify-center gap-4">
            <Avatar className="h-32 w-32 md:h-40 md:w-40 lg:h-48 lg:w-48 border-4 border-background">
              {avatarUrl && <AvatarImage src={avatarUrl} alt={name} />}
              <AvatarFallback className="bg-gray-100 text-gray-800 text-4xl">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="text-center  px-6 py-3 ">
              <h3 className="text-xl md:text-2xl font-medium text-foreground">
                {name}
              </h3>
              <p className="text-sm md:text-base text-muted-foreground">
                {email}
              </p>
            </div>
            <div className="flex flex-row ">
              <div>
                15k Like
              </div>
              <div className="mx-4">
                2k Follower
              </div>
              <div>
                1k Following
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

// Example usage with the provided data
export const ExampleProfile = () => (
  <Profile name="John Monroe" email="john@figma.com" className=""  bannerClassName="bg-gradient-to-r from-blue-500 to-purple-500" />
);
