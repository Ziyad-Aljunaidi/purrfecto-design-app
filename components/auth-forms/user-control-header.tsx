"use client";
import { authClient } from "@/lib/auth-client";
import { LogOut, Settings2 } from "lucide-react";
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

export default function UserControlHeaderDesktop({ user }: { user: AdditionalUserFields }) {
  const router = useRouter(); // Optional, if you need to use router for redirection

  const signUserOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
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
            <Button variant="ghost" size={"icon"} className="p-0 rounded-full" >
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
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                Profile
                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                Billing
                <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                Settings
                <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                Keyboard shortcuts
                <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>Team</DropdownMenuItem>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>Invite users</DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem>Email</DropdownMenuItem>
                    <DropdownMenuItem>Message</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>More...</DropdownMenuItem>
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
            <DropdownMenuItem>
              Log out
              <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {user && (
        <div className="md:hidden items-center justify-end">
          <Drawer>
            <DrawerTrigger>
              {" "}
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
                      src={                  user.image
                        ? user.image
                        : "https://assets.purrfecto.design/DefaultAvatars/Default-04.png"}
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
