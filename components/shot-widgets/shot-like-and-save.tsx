
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import Link from "next/link";
import { Heart, Bookmark } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ShotLikeAndSave({
  userId,
  handleLike,
  handleSave,
  isLiked,
  optimisticLikes,
  likes,
  optimisticSaved,
}: {
  userId: string | null | undefined;
  handleLike: () => void;
  handleSave: () => void;
  isLiked: boolean | null | undefined;
  optimisticLikes: number;
  likes: number | null | undefined;
  optimisticSaved: boolean | null | undefined;
}) {
  return (
    // <DrawerFooter className="sticky bottom-0 z-10 bg-background border-t  ">
    <div className="">
      <div className="flex items-center gap-2">
        {userId && (
          <Button
            variant="ghost"
            size="sm"
            className="w-auto h-10 rounded-full flex items-center gap-1 px-2"
            onClick={handleLike}
          >
            <Heart
              className={cn(
                "h-4 w-4",
                isLiked ? "fill-zinc-950 dark:fill-white" : ""
              )}
            />
            <span className="text-xs">{optimisticLikes}</span>
          </Button>
        )}
        {!userId && (
          <Dialog>
            <DialogTrigger className="flex items-center gap-1 px-2">
              <Heart
                className={cn(
                  "h-4 w-4",
                  isLiked ? "fill-zinc-950 dark:fill-white" : ""
                )}
              />
              <span className="text-xs">{likes}</span>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="text-xl font-medium text-foreground">
                  Want to Like this shot?
                </DialogTitle>
                <DialogDescription className="text-md text-foreground">
                  You need to be Signed in to Like this shot. Please Sign in or
                  Sign up to continue.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="outline" className="text-md" asChild>
                  <Link href="/auth/signin">Sign in</Link>
                </Button>
                <Button variant="outline" className="text-md" asChild>
                  <Link href="/auth/signup">Sign up</Link>
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
        {userId && (
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 rounded-full bg-background backdrop-blur-sm"
            onClick={handleSave}
          >
            <Bookmark
              // size={16}
              className={cn(
                "h-4 w-4",
                optimisticSaved ? "fill-zinc-950 dark:fill-white" : ""
              )}
            />
            <span className="sr-only">Save to collection</span>
          </Button>
        )}
        {!userId && (
          <Dialog>
            <DialogTrigger className="flex items-center gap-1 p-3 rounded-full bg-background backdrop-blur-sm hover:bg-accent">
              <Bookmark
                size={24}
                className={cn(
                  "h-12 w-12",
                  optimisticSaved ? "fill-zinc-950 dark:fill-white" : ""
                )}
              />
              <span className="sr-only">Save to collection</span>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="text-xl font-medium text-foreground">
                  Want to Save this shot?
                </DialogTitle>
                <DialogDescription className="text-md text-foreground">
                  You need to be Signed in to Save this shot. Please Sign in or
                  Sign up to continue.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="outline" className="text-md" asChild>
                  <Link href="/auth/signin">Sign in</Link>
                </Button>
                <Button variant="outline" className="text-md" asChild>
                  <Link href="/auth/signup">Sign up</Link>
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
    // </DrawerFooter>
  );
}
