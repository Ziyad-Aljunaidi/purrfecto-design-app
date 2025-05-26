import type React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  EllipsisVertical,
  MapPin,
  AtSign,
  Instagram,
  Dribbble,
  Globe,
  // Send,
  PenBox,
} from "lucide-react";
import { SelectProfile } from "@/db/schema/profile";
import { FollowButton } from "./metrics-buttons/follow-toggle-button";
interface ProfileProps {
  profile: SelectProfile;
  myProfile?: boolean;
  isFollowing: boolean | null;
  followers: number;
  followings: number;
  // profileId?: string;
  className?: string;
  bannerClassName?: string;
}

export const Profile: React.FC<ProfileProps> = ({
  profile,
  myProfile = false,
  isFollowing,
  followers,
  followings,
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
          "h-auto w-full max-w-7xl mx-auto rounded-3xl p-4 md:p-8 bg-background",
          bannerClassName
        )}
      >
        <div className="flex flex-col md:flex-row gap-6 h-full relative">
          {/* Left Column - Avatar and Info */}
          <div className="flex flex-col md:flex-row gap-6 flex-1">
            {/* Avatar */}
            <div className="flex flex-row gap-6">
              <Avatar className="w-32 h-32 md:w-40 md:h-40">
                {profile.avatar_url[0] && (
                  <AvatarImage
                    src={profile.avatar_url[0] || "/placeholder.svg"}
                    alt={profile.name}
                    className="object-cover"
                  />
                )}
                <AvatarFallback className="text-2xl font-semibold bg-zinc-100 text-zinc-700">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div className="flex md:hidden justify-center items-center gap-6 pt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold">
                    {followers.toLocaleString()}
                  </div>
                  <div className="text-sm">Followers</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">
                    {followings.toLocaleString()}
                  </div>
                  <div className="text-sm">Following</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">59</div>
                  <div className="text-sm">Likes</div>
                </div>
              </div>
            </div>

            {/* User Info */}
            <div className="flex flex-col justify-center space-y-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl md:text-3xl font-bold text-primary">
                    {profile.name}
                  </h1>
                  {/* <Badge variant="default" className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-2 py-1">
                    EARLY ADOPTOR 
                    <span className="ml-1 text-xs font-normal">BETA</span>
                  </Badge> */}
                </div>

                <p className="text-foreground font-medium flex items-center gap-1">
                  <AtSign className="w-4 h-4" />
                  {profile.displayUsername}
                </p>

                {profile.location && (
                  <div className="flex items-center gap-1 text-foreground text-sm">
                    <MapPin className="w-4 h-4" />
                    <span>
                      {profile.location.city}, {profile.location.country}
                    </span>
                  </div>
                )}
              </div>

              {/* Social Links */}
              <div className="flex gap-2">
                {profile.website && (
                  <Button
                    variant="outline"
                    size="icon"
                    className="w-10 h-10 rounded-lg hover:bg-zinc-50"
                    asChild
                  >
                    <a
                      href={profile.website}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Globe className="w-5 h-5" />
                      <span className="sr-only">Website</span>
                    </a>
                  </Button>
                )}

                {profile.instagram_link && (
                  <Button
                    variant="outline"
                    size="icon"
                    className="w-10 h-10 rounded-lg hover:bg-zinc-50"
                    asChild
                  >
                    <a
                      href={profile.instagram_link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Instagram className="w-5 h-5" />
                      <span className="sr-only">Instagram</span>
                    </a>
                  </Button>
                )}

                {profile.dribbble_link && (
                  <Button
                    variant="outline"
                    size="icon"
                    className="w-10 h-10 rounded-lg hover:bg-zinc-50"
                    asChild
                  >
                    <a
                      href={profile.dribbble_link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Dribbble className="w-5 h-5" />
                      <span className="sr-only">Dribbble</span>
                    </a>
                  </Button>
                )}
              </div>

              {/* Bio */}
              {profile.bio && (
                <div className="pt-2">
                  <p className="text-primary font-medium">{profile.bio}</p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3 pt-2">
                {myProfile ? (
                  <Button className=" px-6 flex items-center gap-2">
                    Edit Profile
                    <PenBox className="w-4 h-4 opacity-60" />
                  </Button>
                ) : (
                  <>
                    <FollowButton
                      isFollowing={isFollowing}
                      profileUserId={profile.userId}
                    />
                    <Button
                      variant="outline"
                      className=" px-6 flex-1 items-center gap-2"
                    >
                      Get in Touch
                    </Button>
                    <Button variant="outline" size="icon">
                      <EllipsisVertical className="w-5 h-5" />
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Stats */}
          <div className="hidden md:flex md:flex-row justify-center md:justify-star items-end gap-6 md:gap-4 pt-4 md:pt-0 ">
            <div className="text-center">
              <div className="text-2xl font-bold">
                {followers.toLocaleString()}
              </div>
              <div className="text-sm">Followers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">
                {followings.toLocaleString()}
              </div>
              <div className="text-sm">Following</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">59</div>
              <div className="text-sm">Likes</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
