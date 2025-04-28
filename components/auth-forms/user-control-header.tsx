"use client";
import { authClient } from "@/lib/auth-client";
import {
  LogOut,
  Settings2,
  Plus,
  UserRound,
  MoonIcon,
  SunIcon,
} from "lucide-react";
import { useRouter } from "next/navigation"; // Optional, if you need to use router for redirection
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
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
          router.refresh(); // refresh the page to update the UI
          router.push("/auth/signin"); // redirect to login page
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
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
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
              <DropdownMenuItem>
                Create
                <DropdownMenuShortcut>
                  <Plus className="inline mr-2" size={16} />
                </DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                Settings
                <DropdownMenuShortcut>
                  <Settings2 className="inline mr-2" size={16} />
                </DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                Go to My Profile
                <DropdownMenuShortcut>
                  <UserRound className="inline mr-2" size={16} />
                </DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              {/* <DropdownMenuItem>Theme</DropdownMenuItem> */}
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>Theme</DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem>
                      Dark{" "}
                      <DropdownMenuShortcut>
                        <MoonIcon className="inline mr-2" size={16} />
                      </DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      Light{" "}
                      <DropdownMenuShortcut>
                        <SunIcon className="inline mr-2" size={16} />
                      </DropdownMenuShortcut>
                    </DropdownMenuItem>
                    {/* <DropdownMenuSeparator /> */}
                    {/* <DropdownMenuItem>More...</DropdownMenuItem> */}
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
              <DropdownMenuItem>
                New Team
                <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>GitHub</DropdownMenuItem>
            <DropdownMenuItem>Support</DropdownMenuItem>
            <DropdownMenuItem disabled>API</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={signUserOut}>
              Log out
              <DropdownMenuShortcut>
                <LogOut className="inline mr-2" size={16} />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {user && (
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
                {/* <DrawerTitle>Are you absolutely sure?</DrawerTitle>
        <DrawerDescription>This action cannot be undone.</DrawerDescription> */}
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
      )}
    </>
  );
}
