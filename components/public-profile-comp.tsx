import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { outfit } from "@/components/fonts";
import { Button } from "@/components/ui/button";
import {
  Circle,
  EllipsisVertical,
  MapPin,
  AtSign,
  Instagram,
  Dribbble,
  Globe,
  Send,
  Plus
  
} from "lucide-react";
// import { PublicProfile } from "@/lib/definitions";
import { SelectProfile } from "@/db/schema/profile";

interface ProfileProps {
  profile: SelectProfile;
  // profileId?: string;
  className?: string;
  bannerClassName?: string;
}

export const Profile: React.FC<ProfileProps> = ({
  profile,
  className = "",
  bannerClassName = "",
}) => {
  const initials = profile.name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  return (
    <main className={cn("w-full h-auto", className)}>
      <div
        className={cn(
          "h-auto w-full max-w-7xl mx-auto rounded-2xl my-12 ring-1 ring-muted lg:p-4 antialiased",
          outfit.className,
          bannerClassName
        )}
      >
        <div className="flex flex-col md:flex-row gap-4 h-full p-4">
          {/* Left Column (2/3 width on md+) */}
          <div className="md:flex-[2] flex flex-col gap-4 justify-between">
            {/* Top Row: Avatar + User Info */}
            <div className="flex flex-row sm:flex-row items-start sm:items-center gap-4">
              <Avatar className="h-32 w-32 md:h-40 md:w-40 lg:h-48 lg:w-48 border-4 border-background">
                {profile.avatar_url[0] && (
                  <AvatarImage src={profile.avatar_url[0]} alt={profile.name} />
                )}
                <AvatarFallback className="bg-gray-100 text-gray-800 text-4xl">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col justify-center">
                <h3 className="text-xl md:text-3xl font-bold text-primary">
                  {profile.name}
                </h3>
                <p className="text-sm md:text-base text-muted-foreground flex flex-row items-center gap-1">
                  <AtSign className="w-4 h-4" />
                  {profile.displayUsername}
                </p>
                <p className="text-sm md:text-sm text-muted-foreground flex flex-row items-center gap-1">
                  <MapPin className="w-4 h-4" /> {profile.location?.city},{" "}
                  {profile.location?.country}
                </p>
                <div className="flex flex-row mt-2 text-sm text-muted-foreground gap-3 border-t pt-2">
                  <div className="flex flex-col items-center">
                    {profile.total_likes}
                    <span className="font-bold">Likes</span>
                  </div>
                  <div className="flex flex-col items-center">
                    {profile.total_followers}
                    <span className="font-bold">Followers</span>
                  </div>
                  <div className="flex flex-col items-center">
                    {profile.total_following}
                    <span className="font-bold">Following</span>
                  </div>
                </div>
                <div className="flex flex-row gap-2 mt-4">
                  {profile.website && (
                    <Button
                      variant="outline"
                      size="icon"
                      className="flex items-center justify-center w-10 h-10 rounded-lg bg-accent text-foreground hover:bg-accent/80"
                    >
                      <a href={profile.website}  target="_blank">
                        {" "}
                        <span className="sr-only">Instagram</span>
                        <Globe className="w-5 h-5" />
                      </a>
                    </Button>
                  )}

                  {profile.instagram_link && (
                    <Button
                      variant="outline"
                      size="icon"
                      className="flex items-center justify-center w-10 h-10 rounded-lg bg-accent text-foreground hover:bg-accent/80"
                    >
                      <a href={profile.instagram_link} target="_blank">
                        {" "}
                        <span className="sr-only">Instagram</span>
                        <Instagram className="w-5 h-5" />
                      </a>
                    </Button>
                  )}

                  {profile.dribbble_link && (
                    <Button
                      variant="outline"
                      size="icon"
                      className="flex items-center justify-center w-10 h-10 rounded-lg bg-accent text-foreground hover:bg-accent/80"
                    >
                      <a href={profile.dribbble_link}>
                        {" "}
                        <span className="sr-only">Instagram</span>
                        <Dribbble className="w-5 h-5" />
                      </a>
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    size="icon"
                    className="flex items-center justify-center w-10 h-10 rounded-lg bg-accent text-foreground hover:bg-accent/80"
                  >
                    <span className="sr-only">Instagram</span>
                    <Circle className="w-5 h-5" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="flex items-center justify-center w-10 h-10 rounded-lg bg-accent text-foreground hover:bg-accent/80"
                  >
                    <span className="sr-only">Instagram</span>
                    <Circle className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Bottom Row: New Section */}
            <div className="w-full  p-4 rounded-lg">
              {/* You can customize this content */}
              {profile.bio && (
                <h4 className="text-base md:text-2xl font-black text-foreground mb-2 break-all">
                  {profile.bio}
                </h4>
              )}

              {/* <p className="text-sm text-muted-foreground">
            This is a placeholder for additional information such as bio,
            tags, or recent activity.
          </p> */}
              <div className="flex flex-row flex-grow gap-2 mt-4">
                <Button className="py-4 px-8 font-bold text-md grow md:flex-none">
                  Follow
                  <Plus  className=" opacity-60" size={16} aria-hidden="true" />
                </Button>
                <Button
                  variant="outline"
                  className="py-4 px-8 font-bold text-md grow md:flex-none"
                >
                  Message
                  <Send  className=" opacity-60" size={16} aria-hidden="true" />
                </Button>
                <Button variant="outline" size={"icon"}>
                  <EllipsisVertical className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>

          {/* Right Column (1/3 width on md+) */}
          {/* <div className="md:flex-[1] aspect-[4/3] bg-muted rounded-lg w-full md:w-auto"></div> */}
        </div>
      </div>
    </main>
  );
};

// Example usage with the provided data
// export const ExampleProfile = () => (
//   <Profile
//     name="John Monroe"
//     email="john@figma.com"
//     className=""
//     bannerClassName=""
//   />
// );
