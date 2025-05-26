import {
  Drawer,
  DrawerClose,
  DrawerContent,
  // DrawerDescription,
  // DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ShotAttachment from "@/components/shot-widgets/shot-attachments";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { Shot } from "@/lib/definitions";
import { SelectProfile } from "@/db/schema/profile";
import { useEffect } from "react";
import { LikeButtonWrapper } from "../metrics-buttons/like-button-wrapper";
import { SaveButtonWrapper } from "../metrics-buttons/save-button-wrapper";
import { cn } from "@/lib/utils";
import { outfit} from "@/components/fonts";
import Link from "next/link";


export default function ShotDrawer({
  userId,
  shot,
  creator,
  likes,
  likesSetter,
  isAlreadyLiked,
  isAlreadyLikedSetter,
  isAlreadySaved,
  isAlreadySavedSetter,
  // Drawer Open State
  drawerOpen,
  setDrawerOpen,
}: {
  userId: string | null | undefined;
  shot: Shot;
  creator: SelectProfile;
  likes: number;
  likesSetter: React.Dispatch<React.SetStateAction<number>>;
  isAlreadyLiked: boolean;
  isAlreadyLikedSetter: React.Dispatch<React.SetStateAction<boolean>>;
  // isLiked: boolean | null | undefined;
  isAlreadySaved: boolean;
  isAlreadySavedSetter: React.Dispatch<React.SetStateAction<boolean>>;

  // Drawer Open State
  drawerOpen: boolean;
  setDrawerOpen: (open: boolean) => void;
}) {
  useEffect(() => {
    const baseUrl = "/"; // your homepage

    if (drawerOpen) {
      const newUrl = `/shot/${shot.id}`;
      if (window.location.pathname !== newUrl) {
        window.history.pushState(null, "", newUrl); // ✅ push new URL without navigation
      }
    } else {
      if (window.location.pathname.startsWith("/shot/")) {
        window.history.pushState(null, "", baseUrl); // ✅ go back to home
      }

      document.body.style.overflow = "auto"
    }
  }, [drawerOpen, shot.id]);

  return (
    <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
      <DrawerContent
        className={` outline-none h-full ${outfit.className} bg-background`}
      >
        <div className="mx-auto h-full w-full flex flex-col">
          <DrawerHeader className="sticky top-0 z-10">
            <DrawerTitle className="font-medium text-2xl flex items-center justify-end">
              <DrawerClose asChild >
                <Button variant="ghost" className="rounded-full">
                  <X size={16} className="stroke-3" />
                </Button>
              </DrawerClose>
            </DrawerTitle>
          </DrawerHeader>

          <ScrollArea className="flex-grow overflow-auto">
            <main className="lg:max-w-5xl mx-auto">
              <div className="flex mx-auto items-center justify-between gap-4 bg-background border-b space-y-2 flex-shrink-0 py-6 px-2 md:px-6 lg:px-0">
                <div className="flex items-center gap-4 justify-between">
                  <Link href={`/profile/${creator.userId}`}>
                  <Avatar className="h-14 w-14">
                    <AvatarImage
                      src={creator.avatar_url[0] || "/placeholder.svg"}
                      alt={creator.name}
                    />
                    <AvatarFallback className="text-lg font-bold">
                      {creator.name.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="text-md lg:text-xl font-extrabold tracking-tight">
                      {creator.name}
                    </h2>
                    <p className="text-sm lg:text-md font-medium text-foreground/50">
                      @{creator.displayUsername}
                    </p>
                  </div>
                  </Link>
                </div>
                {/* <Button className="bg-primary py-2 px-4 text-md font-semibold text-primary-foreground rounded-full hover:bg-primary/90">
                  Follow
                </Button> */}

              </div>
              <div className="flex items-center justify-between mt-8 mb-2 lg:mb-6">
                <div className="px-4 md:px-6 lg:px-0">
                  <h1
                    className={`text-3xl md:text-5xl font-semibold tracking-tighter break-all`}
                  >
                    {shot.title}
                  </h1>
                </div>
                <div className="flex items-center gap-2 mr-2 md:mr-4 lg:mr-0">
                  <LikeButtonWrapper
                    likes={likes}
                    likesSetter={likesSetter}
                    isAlreadyLiked={isAlreadyLiked}
                    isAlreadyLikedSetter={isAlreadyLikedSetter}
                    userId={userId}
                    shotId={shot.id}
                    creatorId={creator.id}
                    type="card"
                  />
                  <SaveButtonWrapper
                    shotId={shot.id}
                    creatorId={creator.id}
                    type="drawer"
                    isAlreadySaved={isAlreadySaved}
                    isAlreadySavedSetter={isAlreadySavedSetter}
                    userId={userId}
                  />
                </div>
              </div>

              <div className="p-0 mb-12">
                <ShotAttachment attachmentId={shot.attachment_id} />

                {/* Description section */}
                <div className={cn("my-8  px-4 md:px-6 lg:px-0")}>
                  <h3
                    className={cn(
                      "text-2xl font-semibold mb-2 underline underline-offset-8 decoration-lime-400 decoration-4"
                    )}
                  >
                    About this shot
                  </h3>
                  <h2 className="text-foreground text-lg font-medium mb-2 tracking-tighter break-all ">
                    {shot.description || "No description available"}
                  </h2>
                </div>

                {/* Tagss used section */}
                <div className="my-8  px-4 md:px-6 lg:px-0">
                  <h3
                    className={cn(
                      "text-2xl font-semibold mb-2 underline underline-offset-8 decoration-lime-400 decoration-4"
                    )}
                  >
                    Tags
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {shot.tags?.map((tag: string) => (
                      <span
                        key={tag}
                        className="cursor-pointer text-sm mt-4 sm:text-base lg:text-lg font-bold px-2 sm:px-3 lg:px-4 py-1.5 sm:py-2 bg-accent/50 hover:ring-2 active:ring-2 active:ring-lime-400 active:bg-lime-400/10 hover:ring-lime-400 rounded-md lg:rounded-lg hover:bg-lime-400/10 transition-all duration-100"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </main>
          </ScrollArea>
          {/* DRAWER FOOTER PLACE */}
        </div>
      </DrawerContent>
    </Drawer>
  );
}
