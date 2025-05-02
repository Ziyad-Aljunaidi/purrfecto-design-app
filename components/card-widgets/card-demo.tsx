"use client"

import type React from "react"

import { useState } from "react"
import { Bookmark, Heart, MessageCircle, Share2 } from "lucide-react"
import Image from "next/image"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

type DesignCardProps = React.ComponentProps<typeof Card> & {
  imageUrl?: string
  title?: string
  authorName?: string
  authorRole?: string
  authorAvatar?: string
  likes?: number
  comments?: number
}

export function DesignCardDemo({
  className,
  // imageUrl = "/placeholder.svg?height=400&width=600",
  title = "Modern Dashboard Design",
  authorName = "Sarah Johnson",
  authorRole = "UI/UX Designer",
  authorAvatar = "/placeholder.svg?height=40&width=40",
  likes = 142,
  comments = 28,
  ...props
}: DesignCardProps) {
  const [isHovering, setIsHovering] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)

  return (
    <Card
      className={cn(
        "w-full max-w-md overflow-hidden shadow-none border-0 rounded-xl transition-shadow duration-300",
        isHovering ? "shadow-md" : "",
        className,
      )}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      {...props}
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-t-xl">
        <Image
          src={"https://cdn.purrfecto.design/01_sJxF68tDDRLq9IC2bp/UNuL9wdOpJeHyMnOarGn-/hYt4f4u1-pencil-people-thumbnail.png"}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Image overlay that appears on hover */}
        <div
          className={cn(
            "absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30 p-4 flex flex-col justify-between transition-opacity duration-300",
            isHovering ? "opacity-100" : "opacity-0",
          )}
        >
          {/* Top row with buttons */}
          <div className="flex justify-end gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full bg-black/30 backdrop-blur-sm text-white hover:bg-black/50 hover:text-white"
              onClick={(e) => {
                e.stopPropagation()
                setIsLiked(!isLiked)
              }}
            >
              <Heart className={cn("h-4 w-4", isLiked ? "fill-red-500 text-red-500" : "")} />
              <span className="sr-only">Like</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full bg-black/30 backdrop-blur-sm text-white hover:bg-black/50 hover:text-white"
              onClick={(e) => {
                e.stopPropagation()
                setIsBookmarked(!isBookmarked)
              }}
            >
              <Bookmark className={cn("h-4 w-4", isBookmarked ? "fill-yellow-500 text-yellow-500" : "")} />
              <span className="sr-only">Bookmark</span>
            </Button>
          </div>

          {/* Bottom row with title */}
          <h2 className="text-white font-medium text-lg drop-shadow-md">{title}</h2>
        </div>
      </div>

      <CardContent className="p-4 bg-white dark:bg-zinc-900">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 border">
              <AvatarImage src={authorAvatar || "/placeholder.svg"} alt={authorName} />
              <AvatarFallback>{authorName.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-medium leading-none">{authorName}</h3>
              <p className="text-sm text-muted-foreground">{authorRole}</p>
            </div>
          </div>

          <div
            className={cn(
              "flex items-center gap-2 transition-opacity duration-300",
              isHovering ? "opacity-100" : "opacity-0",
            )}
          >
            <Button variant="ghost" size="sm" className="flex items-center gap-1 px-2">
              <Heart className="h-4 w-4" />
              <span className="text-xs">{likes}</span>
            </Button>
            <Button variant="ghost" size="sm" className="flex items-center gap-1 px-2">
              <MessageCircle className="h-4 w-4" />
              <span className="text-xs">{comments}</span>
            </Button>
            <Button variant="ghost" size="sm" className="px-2">
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
