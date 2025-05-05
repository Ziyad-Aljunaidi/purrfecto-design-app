"use client"

import type React from "react"

import { useState } from "react"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"

interface ShotDrawerProps {
  children: React.ReactNode
  title?: string
  description?: string
}

export function ShotDrawer({ children, title = "Shot Details", description }: ShotDrawerProps) {
  const [open, setOpen] = useState(false)

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <div className="cursor-pointer">{children}</div>
        <div className="cursor-pointer">{children}</div>
      </DrawerTrigger>
      <DrawerContent className="">
        <div className="mx-auto w-full max-w-7xl bg-amber-300">
          <DrawerHeader>
            <DrawerTitle>{title}</DrawerTitle>
            {description && <DrawerDescription>{description}</DrawerDescription>}
          </DrawerHeader>
          <div className="p-4">
            {/* Shot details content would go here */}
            <div className="aspect-video w-full bg-muted rounded-lg flex items-center justify-center">
              Shot details would be displayed here
            </div>
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline">Close</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
