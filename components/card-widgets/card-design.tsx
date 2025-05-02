"use client"

import type React from "react"

import { useState } from "react"
import { Bookmark, Heart, MessageCircle } from "lucide-react"
import Image from "next/image"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

type DesignCardProps = React.ComponentProps<typeof Card> & {
  imageUrl: string
  title: string
  authorName?: string
  authorRole?: string
  authorAvatar?: string
  likes?: number
  comments?: number
}

export function DesignCard({
  className,
  imageUrl,
  title ,
  authorName = "Sarah Johnson",
  authorRole = "UI/UX Designer",
  authorAvatar = "https://assets.purrfecto.design/DefaultAvatars/Default-04.png",
  likes = 142,
  comments = 28,
  ...props
}: DesignCardProps) {
  // const [isHovering, setIsHovering] = useState(false)
  const [isImageHovering, setIsImageHovering] = useState(false)
  const [isSaved, setIsSaved] = useState(false)

  return (
    <Card
      className={cn(
        "w-full max-w-md overflow-hidden shadow-none transition-all duration-300 rounded-xl border-none",
        // isHovering ? "border" : "border-transparent",
        className,
      )}
      // onMouseEnter={() => setIsHovering(true)}
      // onMouseLeave={() => setIsHovering(false)}
      {...props}
    >
      <div
        className="relative aspect-[4/3] w-full overflow-hidden rounded-xl"
        onMouseEnter={() => setIsImageHovering(true)}
        onMouseLeave={() => setIsImageHovering(false)}
      >
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Image overlay with title and save button */}
        <div
          className={cn(
            "absolute inset-0 bg-gradient-to-t from-black/70 to-transparent p-4 flex flex-col justify-between transition-opacity duration-300",
            isImageHovering ? "opacity-100" : "opacity-0",
          )}
        >
          <div className="self-end">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full bg-black/30 backdrop-blur-sm hover:bg-black/50"
              onClick={() => setIsSaved(!isSaved)}
            >
              <Bookmark className={cn("h-4 w-4", isSaved ? "fill-white" : "")} />
              <span className="sr-only">Save to collection</span>
            </Button>
          </div>

          <h2 className="text-white font-medium text-lg">{title}</h2>
        </div>
      </div>

      <CardContent className="p-0 bg-white dark:bg-background">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 border ">
              <AvatarImage src={authorAvatar || "/placeholder.svg"} alt={authorName} />
              <AvatarFallback>{authorName.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="">
              <h3 className="font-medium leading-none">{authorName}</h3>
              <p className="text-sm text-muted-foreground">{authorRole}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="flex items-center gap-1 px-2">
              <Heart className="h-4 w-4" />
              <span className="text-xs">{likes}</span>
            </Button>
            <Button variant="ghost" size="sm" className="flex items-center gap-1 px-2">
              <MessageCircle className="h-4 w-4" />
              <span className="text-xs">{comments}</span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
