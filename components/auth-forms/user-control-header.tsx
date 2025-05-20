"use client";
import { authClient } from "@/lib/auth-client";
import { LogOut, Settings2, Plus, UserRound } from "lucide-react";
import { useRouter } from "next/navigation"; // Optional, if you need to use router for redirection
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  // DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { User } from "better-auth/types";
import ThemeToggle from "../theme-toggle";
import { Separator } from "../ui/separator";

interface AdditionalUserFields extends User {
  displayUsername: string;
}

export default function UserControlHeaderDesktop({
  user,
}: {
  user: AdditionalUserFields;
}) {
  const router = useRouter(); // Optional, if you need to use router for redirection

  const signUserOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/auth/signin");
          router.refresh(); // refresh the page to update the UI
          // redirect to login page
        },
      },
    });
  };
  return (
    <>
      <div className="hidden md:flex items-center justify-end">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size={"icon"} className="p-0 rounded-full">
              <img
                src={
                  user.image
                    ? user.image
                    : "https://assets.purrfecto.design/DefaultAvatars/Default-04.png"
                }
                className="rounded-full w-9 h-9 cursor-pointer"
                alt="User Avatar"
              />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-auto max-w-96 min-w-56"
            align="end"
            sideOffset={5}
          >
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Link href={`/profile/${user.id}`}>

                <div className="flex items-center gap-2 p-2">
                  <img
                    src={
                      user.image
                        ? user.image
                        : "https://assets.purrfecto.design/DefaultAvatars/Default-04.png"
                    }
                    className="rounded-full w-12 h-12 cursor-pointer"
                    alt="User Avatar"
                  />
                  <div>
                    <h2 className="text-sm font-semibold">{user.name}</h2>
                    <h3 className="text-xs text-foreground">
                      @{user.displayUsername}
                    </h3>
                  </div>
                </div>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => router.push("/create")}>
                Create
                <DropdownMenuShortcut>
                  <Plus className="inline mr-2" size={16} />
                </DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                Settings
                <DropdownMenuShortcut>
                  <Settings2 className="inline mr-2" size={16} />
                </DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                My Profile
                <DropdownMenuShortcut>
                  <UserRound className="inline mr-2" size={16} />
                </DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuLabel className="flex flex-row justify-between items-center">
                Theme <ThemeToggle />
              </DropdownMenuLabel>
            </DropdownMenuGroup>
            <DropdownMenuItem onClick={signUserOut}>
              Log out
              <DropdownMenuShortcut>
                <LogOut className="inline mr-2" size={16} />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {/* {user && ( */}

      <div className="flex md:hidden items-center justify-center">
        <Drawer>
          <DrawerTrigger className="">
            <img
              src={
                user.image
                  ? user.image
                  : "https://assets.purrfecto.design/DefaultAvatars/Default-04.png"
              }
              className="rounded-full w-10 h-10 mr-2 cursor-pointer"
              alt="User Avatar"
            />
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle></DrawerTitle>
              <div className="flex flex-col items-start ">
                <div className="flex items-center gap-4">
                  <img
                    src={
                      user.image
                        ? user.image
                        : "https://assets.purrfecto.design/DefaultAvatars/Default-04.png"
                    }
                    className="rounded-full w-20 h-20 "
                    alt="User Avatar"
                  />
                  <div className="flex flex-col">
                    <span className="font-semibold text-xl">{user.name}</span>
                    <span className="text-lg text-accent-foreground">
                      @{user.displayUsername}
                    </span>
                  </div>
                </div>
              </div>
              <Separator className="my-2" />
              <Button
                variant="ghost"
                className="flex justify-between text-md"
                onClick={() => router.push("/create")}
              >
                Create
                <Plus className="inline mr-2" size={16} />
              </Button>
              <Separator className="my-2" />
              <Button variant="ghost" className="flex justify-between text-md">
                My Profile
                <UserRound className="inline mr-2" size={16} />
              </Button>
              <Separator className="my-2" />

              <Button variant="ghost" className="flex justify-between text-md">
                Settings
                <Settings2 className="inline mr-2" size={16} />
              </Button>
              <div className="flex flex-row justify-between items-center font-semibold px-3">
                Theme
                <ThemeToggle />
                {/* <Separator className="my-2" /> */}
              </div>
              <Separator className="mt-2" />
            </DrawerHeader>

            <DrawerFooter className="pt-0">
              <DrawerClose asChild>
                <Button className="flex justify-between" onClick={signUserOut}>
                  Log Out
                  <LogOut className="inline mr-2" size={16} />
                </Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
      {/* )} */}
    </>
  );
}
