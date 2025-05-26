"use client"
import { startTransition, useOptimistic, useState } from "react"
import { toggleFollow } from "@/app/actions/FollowUserAction"
import { Button } from "../ui/button"
import { UserPlus, UserMinus, LoaderCircle  } from "lucide-react"

export function FollowButton({
  isFollowing,
  profileUserId,
}: {
  isFollowing: boolean | null
  profileUserId: string
}) {
  const [isPending, setPending] = useState(false)
  const [optimisticFollowing, setOptimisticFollowing] = useOptimistic(
    isFollowing,
    (currentState, newState: boolean) => newState,
  )

  function handleFollowToggle() {
  setPending(true)
  startTransition(() => {
    if (isFollowing !== null) {
      const newFollowingState = !optimisticFollowing
      setOptimisticFollowing(newFollowingState)

      toggleFollow(profileUserId)
        .catch(() => {
          setOptimisticFollowing(isFollowing)
        })
    }
    setPending(false)
  })}

  return (
    <Button
      type="submit"
      className="px-6 flex-1 items-center gap-2"
      disabled={isPending}
      onClick={handleFollowToggle}
      
    >
      {isPending ? (
        <LoaderCircle className="animate-spin" size={16} />
      ) : optimisticFollowing ? (
        <UserMinus size={16} />
      ) : (
        <UserPlus size={16} />
      )}
      {optimisticFollowing ? "Unfollow" : "Follow"}
    </Button>

  )
}
