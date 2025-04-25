"use client"
import { useState } from "react";
import clsx from "clsx"; // Optional, helps conditionally apply classes
import { authClient } from "@/lib/auth-client";


export default function UserControlHeaderDesktop() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  // const profileImage = "https://assets.purrfecto.design/DefaultAvatars/Default-04.png";
  const { 
    data: session, 
    // isPending, //loading state
    // error, //error object
    // refetch //refetch the session
  } = authClient.useSession() 
  console.log("session", session);
  return (
    <>
    {session && ( <div className="relative">
      <img
        src={!!session && session.user.image ? session.user.image : "https://assets.purrfecto.design/DefaultAvatars/Default-04.png"}
        className="rounded-full w-8 h-8 cursor-pointer"
        alt="User Avatar"
        onClick={() => setDropdownOpen(!dropdownOpen)}
      />
      
      <div
        className={clsx(
          "absolute right-0 top-10 w-80 bg-primary-foreground border-1 rounded-lg transition-all duration-200 ease-in-out",
          dropdownOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none "
        )}
      >
        <ul className="list-none m-0 p-2">
          <li className="py-6 px-4 cursor-pointer hover:bg-accent rounded-lg">Option 1</li>
          <li className="border-t my-2 border-gray-300"></li>
          <li className="py-2 px-4 font-semibold text-sm cursor-pointer hover:bg-accent rounded-lg">Settings</li>
          <li className="py-2 px-4 font-semibold text-sm cursor-pointer hover:bg-accent rounded-lg">Log Out</li>
        </ul>
      </div>
    </div>)} 
    </>
    // Optional, replace with your image URL
   
  );
}
