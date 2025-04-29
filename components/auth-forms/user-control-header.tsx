"use client";
import { authClient } from "@/lib/auth-client";
import {
  LogOut,
  Settings2,
  Plus,
  UserRound
} from "lucide-react";
import { useRouter } from "next/navigation"; // Optional, if you need to use router for redirection
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
                className="rounded-full w-8 h-8 cursor-pointer"
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
        <div className="md:hidden items-center justify-end">
          <Drawer>
            <DrawerTrigger>
              <img
                src={
                  user.image
                    ? user.image
                    : "https://assets.purrfecto.design/DefaultAvatars/Default-04.png"
                }
                className="rounded-full w-8 h-8 mr-4 cursor-pointer"
                alt="User Avatar"
              />
            </DrawerTrigger>
            <DrawerContent className="h-1/2">
              <DrawerHeader>
                <DrawerTitle>Are you absolutely sure?</DrawerTitle>
                <div>
                  <div className="flex items-center">
                    <img
                      src={
                        user.image
                          ? user.image
                          : "https://assets.purrfecto.design/DefaultAvatars/Default-04.png"
                      }
                      className="rounded-full w-30 h-30 mr-4"
                      alt="User Avatar"
                    />
                    <div className="flex flex-col">
                      <span className="font-semibold text-lg">{user.name}</span>
                      <span className="text-md text-gray-500">
                        @{user.displayUsername}
                      </span>
                    </div>
                  </div>
                </div>
              </DrawerHeader>
              <DrawerFooter>
                <Button>
                  <Settings2 className="inline mr-2" size={16} />
                  Account Settings
                </Button>
                <DrawerClose asChild>
                  <Button variant="outline" onClick={signUserOut}>
                    <LogOut className="inline mr-2" size={16} /> Log Out
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
