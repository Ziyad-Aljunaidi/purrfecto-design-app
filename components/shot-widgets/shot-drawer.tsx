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
import { Creator, Shot } from "@/lib/definitions";
import { useEffect } from "react";
import { LikeButtonWrapper } from "../metrics-buttons/like-button-wrapper";
import { SaveButtonWrapper } from "../metrics-buttons/save-button-wrapper";
import { cn } from "@/lib/utils";
import { poppins, chivo} from "@/components/fonts";

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
  creator: Creator;
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
    }
  }, [drawerOpen, shot.id]);

  return (
    <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
      <DrawerContent
        className={` outline-none h-full ${poppins.className} bg-background`}
      >
        <div className="mx-auto h-full w-full flex flex-col">
          <DrawerHeader className="sticky top-0 z-10">
            <DrawerTitle className="font-medium text-2xl flex items-center justify-end">
              <DrawerClose asChild>
                <Button variant="ghost" className="rounded-full">
                  <X size={16} className="stroke-3" />
                </Button>
              </DrawerClose>
            </DrawerTitle>
          </DrawerHeader>

          <ScrollArea className="flex-grow overflow-auto">
            <main className="max-w-5xl mx-auto">
              <div className="flex mx-auto items-center justify-between gap-4 bg-background border-b space-y-2 flex-shrink-0 py-6 px-2 md:px-0">
                <div className="flex items-center gap-4 justify-between">
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
                    <p className="text-smlg:text-md font-medium text-foreground/50">
                      @{creator.displayUsername}
                    </p>
                  </div>
                </div>
                <Button className="bg-primary py-2 px-4 text-md font-semibold text-primary-foreground rounded-full hover:bg-primary/90">
                  Follow
                </Button>
              </div>
              <div className="flex items-center justify-between mt-8 mb-2 lg:mb-6">
                <div className=" px-4 md:px-0">
                  <h1
                    className={`text-3xl md:text-5xl font-semibold tracking-tighter break-all ${chivo.className}`}
                  >
                    {shot.title}
                  </h1>
                </div>
                <div className="flex items-center gap-2 mr-2 md:mr-0">
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
                <div className="my-8 px-4 md:px-0">
                  <h3
                    className={cn(
                      "text-2xl font-semibold mb-2 underline underline-offset-8 decoration-violet-500 decoration-4 underline-green-500",
                      chivo.className
                    )}
                  >
                    About this shot
                  </h3>
                  <h2 className="text-foreground text-lg font-medium mb-2 tracking-tighter break-all ">
                    {shot.description || "No description available"}
                  </h2>
                </div>

                {/* Tagss used section */}
                <div className="my-8 px-4 md:px-0">
                  <h3
                    className={cn(
                      "text-2xl font-semibold mb-2 underline underline-offset-8 decoration-violet-500 decoration-4 underline-green-500",
                      chivo.className
                    )}
                  >
                    Tags
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {shot.tags?.map((tag: string) => (
                      <span
                        key={tag}
                        className="px-4 mt-4 py-2 bg-muted rounded-full text-md font-semibold transition-all duration-50 ease-in-out hover:bg-violet-500/15 hover:text-violet-500 hover:outline-2 hover:outline-violet-500 cursor-pointer"
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
