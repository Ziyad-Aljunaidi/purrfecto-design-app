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
import ShotLikeAndSave from "@/components/shot-widgets/shot-like-and-save";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { Creator, Shot } from "@/lib/definitions";

export default function ShotDrawer({
  userId,
  shot,
  creator,
  likes,
  isLiked,
  handleLike,
  handleSave,
  optimisticLikes,
  optimisticSaved,
  // Drawer Open State
  drawerOpen,
  setDrawerOpen,
}: {
  userId: string | null | undefined;
  shot: Shot;
  creator: Creator;
  likes: number | null;
  isLiked: boolean | null | undefined;
  optimisticLikes: number;
  optimisticSaved: boolean | null | undefined;
  handleLike: () => void;
  handleSave: () => void;

  // Drawer Open State
  drawerOpen: boolean;
  setDrawerOpen: (open: boolean) => void;
}) {
  return (
    <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
      <DrawerContent className=" outline-none h-full">
        <div className="mx-auto h-full w-full max-w-7xl flex flex-col">
          <DrawerHeader className="sticky top-0 z-10 bg-background border-b space-y-2 flex-shrink-0">
            <DrawerTitle className="font-medium text-2xl flex items-center justify-between">
              {shot.title}
              <DrawerClose asChild>
                <Button variant="ghost" className="rounded-full">
                  <X size={16} />
                </Button>
              </DrawerClose>
            </DrawerTitle>

            <div className="flex  items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-foreground font-medium">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={creator.avatar_url[0]} alt={creator.name} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-md font-medium">{creator.name}</h2>
                  <p className="text-sm font-medium text-accent-foreground">
                    @{creator.displayUsername}
                  </p>
                </div>
              </div>

              <ShotLikeAndSave
                userId={userId}
                handleLike={handleLike}
                handleSave={handleSave}
                isLiked={isLiked}
                optimisticLikes={optimisticLikes}
                likes={likes}
                optimisticSaved={optimisticSaved}
              />
            </div>
          </DrawerHeader>

          <ScrollArea className="flex-grow overflow-auto">
            <div className="p-4 mb-12">
              <ShotAttachment attachmentId={shot.attachment_id} />

              {/* Description section */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-2">Description</h3>
                <h2 className="text-foreground text-lg font-medium mb-2">
                  {shot.description || "No description available"}
                </h2>
              </div>

              {/* Tagss used section */}
              <div className="mb-8">
                <h3 className="text-lg font-medium mb-2">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {shot.tags?.map((tag: string) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-muted rounded-full text-md font-semibold transition-all duration-50 ease-in-out hover:outline-2 hover:outline-accent-foreground cursor-pointer"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </ScrollArea>
          {/* DRAWER FOOTER PLACE */}
        </div>
      </DrawerContent>
    </Drawer>
  );
}
