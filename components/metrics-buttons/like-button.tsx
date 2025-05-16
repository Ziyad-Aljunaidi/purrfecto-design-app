"use client";
import {
  // isShotLiked,
  // getShotLikes,
  toggleShotLike,
} from "@/app/actions/shotLikesAction";
import { useState, useOptimistic, startTransition} from "react";
import {  Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";


export default function LikeButton({
  likes,
  likesSetter,
  isAlreadyLiked,
  isAlreadyLikedSetter,
  userId,
  shotId,
  creatorId,
  type,
  isOpenSetter,
}: {
  likes: number | null | undefined;
  likesSetter: React.Dispatch<React.SetStateAction<number>>;
  isAlreadyLiked: boolean;
  isAlreadyLikedSetter: React.Dispatch<React.SetStateAction<boolean>>;
  userId: string | null | undefined;
  shotId: string;
  creatorId: string;
  type: "card" | "drawer" | "page" | "card v2";
  isOpenSetter: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  // const [isLiked, setIsLiked] = useState<boolean>(isAlreadyLiked || false);
  // const [totalLikes, setTotalLikes] = useState<number>(likes || 0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [optimisticLikes, setOptimisticLikes] = useOptimistic(
    likes || 0,
    (currentLikes, isLiked) => {
      if (isLiked) {
        return Number(currentLikes) - 1;
      } else {
        return Number(currentLikes) + 1;
      }
    }
  );

  // Fetch initial data (likes and isLiked) on mount
  // useEffect(() => {
  //   async function fetchLikeData() {
  //     try {
  //       // TOTAL LIKES
  //       const totalLikesResponse = await getShotLikes(shotId);
  //       if (totalLikesResponse.success && totalLikesResponse.totalLikes) {
  //         setTotalLikes(totalLikesResponse.totalLikes);
  //       } else {
  //         setTotalLikes(0);
  //       }
  //       // IS SHOT LIKED
  //       const isShotLikedResponse = await isShotLiked({ shotId });
  //       if (isShotLikedResponse.success) {
  //         setIsLiked(true);
  //       } else {
  //         setIsLiked(false);
  //       }
  //     } catch (err) {
  //       console.error("Error fetching like data:", err);
  //     }
  //   }

  //   fetchLikeData();
  // }, [shotId]);

  function handleLike() {
    isAlreadyLikedSetter(!isAlreadyLiked);
    startTransition(async () => {
      likesSetter((prev) => Number(prev) + (isAlreadyLiked ? -1 : 1));
      setOptimisticLikes(isAlreadyLiked);
      if (!isAlreadyLiked) {
        setIsAnimating(true);
        setTimeout(() => setIsAnimating(false), 700);
      }

      try {
        const response = await toggleShotLike({
          shotId,
          creatorId,
        });
        if (!response.success) {
          console.log("Error liking project shot: ", response.message);
          isAlreadyLikedSetter(isAlreadyLiked);
          likesSetter((prev) => Number(prev) + (isAlreadyLiked ? +1 : -1));
          isOpenSetter(true);
        }
      } catch (err) {
        console.error("Error liking project shot: ", err);
        isAlreadyLikedSetter(isAlreadyLiked);
        likesSetter((prev) => Number(prev) + (isAlreadyLiked ? +1 : -1));
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
        onClick={userId? handleLike : () => isOpenSetter(true)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        <div className="relative">
          <motion.div
            initial={false}
            animate={isAlreadyLiked ? { scale: [1, 1.2, 1] } : { scale: 1 }}
            transition={{ duration: 0.35 }}
          >
            <Heart
              className={cn(
                "w-8 h-8 transition-colors duration-300",
                isAlreadyLiked
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

        <div className="flex flex-col items-start">
          <motion.span
            key={optimisticLikes}
            className="text-2xl font-bold leading-none mb-0.5"
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 10, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {optimisticLikes}
          </motion.span>
        </div>
      </motion.button>
    );
  }

  if (type === "card") {
    return (
      <motion.button
        className={cn(
          "flex flex-row items-center gap-1 px-3 py-2 rounded-xl transition-colors duration-300",
          "",
          "bg-transparent hover:bg-accent/50",
          "cursor-pointer"
        )}
        onClick={userId? handleLike : () => isOpenSetter(true)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        <div className="relative">
          <motion.div
            initial={false}
            animate={isAlreadyLiked ? { scale: [1, 1.2, 1] } : { scale: 1 }}
            transition={{ duration: 0.35 }}
          >
            <Heart
              className={cn(
                "w-4 h-4 transition-colors duration-300",
                isAlreadyLiked
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

        <div className="flex flex-col items-center text-sm">
          {/* <AnimatePresence mode="wait"> */}
          {/* <motion.span
            key={optimisticLikes}
            className="text-sm font-bold leading-none mb-0.5"
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 10, opacity: 0 }}
            transition={{ duration: 0.2 }}
          > */}
            {optimisticLikes}
          {/* </motion.span> */}
        </div>
      </motion.button>
    );
  }
}
