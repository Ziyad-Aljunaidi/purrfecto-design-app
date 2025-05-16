"use client";
import { toggleShotSave } from "@/app/actions/shotSavesActions";

import { useState, useOptimistic, startTransition} from "react";
import {  Bookmark } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";


export default function SaveButton({

  isAlreadySaved,
  isAlreadySavedSetter,
  userId,
  shotId,
  creatorId,
  type,
  isOpenSetter,
}: {
  isAlreadySaved: boolean;
  isAlreadySavedSetter: React.Dispatch<React.SetStateAction<boolean>>;
  userId: string | null | undefined;
  shotId: string;
  creatorId: string;
  type: "card" | "drawer" | "page" | "card v2";
  isOpenSetter: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  // const [isSaved, setIsSaved] = useState<boolean>(isAlreadySaved || false);
  // const [totalLikes, setTotalLikes] = useState<number>(likes || 0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [optimisticSaved, setOptimisticSaved] = useOptimistic(
    isAlreadySaved,
    (currentSaved, isSaved) => {
      if (isSaved) {
        return false;
      } else {
        return true;
      }
    }
  );

  function handleSave() {
    if (!userId) {
      return { success: false, error: "User not logged in" };
    }
    console.log(optimisticSaved)
    isAlreadySavedSetter(!isAlreadySaved);
    // setIsSaved(!isSaved);
    startTransition(async () => {
      setOptimisticSaved(isAlreadySaved);
      try {
        const response =  await toggleShotSave({
          shotId,
          // userId,
          creatorId,
        });

        if (!response.success) {
          console.log("Error saving project shot: ", response.message);
          isAlreadySavedSetter(isAlreadySaved);
          isOpenSetter(true);
        } else {
          setIsAnimating(true);
          setTimeout(() => setIsAnimating(false), 700);
        }

      } catch (err) {
        console.error("Error saving project shot: ", err);
        isAlreadySavedSetter(isAlreadySaved);

      }
    });
  }

  if (type === "page") {
    return (
      <motion.button
        className={cn(
          "flex flex-row items-center gap-3 px-6 py-3 rounded-xl transition-colors duration-300",
          "bg-transparent hover:bg-accent/50",
          "cursor-pointer"
        )}
        onClick={userId? handleSave : () => isOpenSetter(true)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        <div className="relative">
          <motion.div
            initial={false}
            animate={isAlreadySaved ? { scale: [1, 1.2, 1] } : { scale: 1 }}
            transition={{ duration: 0.35 }}
          >
            <Bookmark
              className={cn(
                "w-8 h-8 transition-colors duration-300",
                isAlreadySaved
                  ? "fill-rose-500 stroke-rose-500"
                  : "stroke-primary hover:stroke-rose-500"
              )}
            />
          </motion.div>

          {/* Heart burst animation */}
          <AnimatePresence>
            {isAnimating && (
              <>
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute top-1/2 left-1/2 w-1 h-1 rounded-full bg-rose-500"
                    initial={{ scale: 0, x: "-50%", y: "-50%" }}
                    animate={{
                      scale: 0,
                      x: `calc(-50% + ${
                        Math.cos((Math.PI * 2 * i) / 6) * 20
                      }px)`,
                      y: `calc(-50% + ${
                        Math.sin((Math.PI * 2 * i) / 6) * 20
                      }px)`,
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 0.7,
                      times: [0, 0.3, 1],
                      ease: "easeOut",
                    }}
                    exit={{ opacity: 0 }}
                  />
                ))}
                <motion.div
                  className="absolute top-1/2 left-1/2 w-12 h-12 -translate-x-1/2 -translate-y-1/2 rounded-full bg-rose-500/20"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1.5, opacity: [0, 0.2, 0] }}
                  transition={{ duration: 0.7 }}
                  exit={{ opacity: 0 }}
                />
              </>
            )}
          </AnimatePresence>
        </div>

        {/* <div className="flex flex-col items-start">
          <motion.span
            key={optimisticSaved}
            className="text-2xl font-bold leading-none mb-0.5"
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 10, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {optimisticSaved}
          </motion.span>
        </div> */}
      </motion.button>
    );
  }

  if (type === "card" || type === "drawer") {
    return (
      <motion.button
        className={cn(
          "flex flex-row items-center rounded-xl transition-colors duration-300",
          type === "card"
            ? "gap-1 px-3 py-3 bg-accent/50 hover:bg-accent"
            : "gap-1 px-3 py-2.5 bg-transparent hover:bg-accent",
          "cursor-pointer"
        )}
        onClick={userId? handleSave: () => isOpenSetter(true)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        <div className="relative">
          <motion.div
            initial={false}
            animate={isAlreadySaved ? { scale: [1, 1.2, 1] } : { scale: 1 }}
            transition={{ duration: 0.35 }}
          >
            <Bookmark
              className={cn(
                "w-4 h-4 transition-colors duration-300",
                isAlreadySaved
                  ? "fill-primary stroke-primary"
                  : "stroke-primary hover:stroke-primary/80"
              )}
            />
          </motion.div>

          {/* Heart burst animation */}
          <AnimatePresence>
            {isAnimating && (
              <>
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute top-1/2 left-1/2 w-1 h-1 rounded-full bg-rose-500"
                    initial={{ scale: 0, x: "-50%", y: "-50%" }}
                    animate={{
                      scale: 0,
                      x: `calc(-50% + ${
                        Math.cos((Math.PI * 2 * i) / 6) * 20
                      }px)`,
                      y: `calc(-50% + ${
                        Math.sin((Math.PI * 2 * i) / 6) * 20
                      }px)`,
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 0.7,
                      times: [0, 0.3, 1],
                      ease: "easeOut",
                    }}
                    exit={{ opacity: 0 }}
                  />
                ))}
                <motion.div
                  className="absolute top-1/2 left-1/2 w-12 h-12 -translate-x-1/2 -translate-y-1/2 rounded-full bg-rose-500/20"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1.5, opacity: [0, 0.2, 0] }}
                  transition={{ duration: 0.7 }}
                  exit={{ opacity: 0 }}
                />
              </>
            )}
          </AnimatePresence>
        </div>

      </motion.button>
    );
  }
}
