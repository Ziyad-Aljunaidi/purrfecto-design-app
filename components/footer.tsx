import React from "react";
import { cn } from "@/lib/utils";
import { outfit } from "./fonts";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <footer
      className={cn(
        "bg-background border-t py-12 px-4 sm:px-6 lg:px-8",
        outfit.className
      )}
    >
      <div className="w-full max-w-7xl mx-auto flex flex-row flex-wrap gap-6 place-items-end">
        {/* Logo and Newsletter */}
        <div className="md:col-span-1">
          <Link href="/" className="flex items-center place-items-center">
            <div className="flex " aria-label="Logo">
              <Image
                src="/LogoAndTextForDarkMode.svg"
                alt="Logo"
                width={100}
                height={50}
                className="hidden dark:block items-center aspect-auto mx-4"
              />
              <Image
                src="/LogoAndTextForWhiteMode.svg"
                alt="Logo"
                width={100}
                height={50}
                className="block dark:hidden items-center aspect-auto mx-4"
              />
            </div>
          </Link>
          {/* <div className="mt-6">
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Join our newsletter
            </h3>
            <p className="text-foreground mb-4">
              Get exclusive news, features, and updates.
            </p>
            <div className="flex flex-col space-y-2">
              <input
                type="email"
                placeholder="Email"
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="bg-blue-600 text-white font-bold text-lg px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                Subscribe
              </button>
            </div>
          </div> */}
        </div>
        <div>
          <Link href="/">
            <h3 className="text-lg font-semibold text-foreground mb-4 transition-all duration-200 hover:text-[#E4281f] hover:underline underline-offset-8 decoration-[#E4281f] decoration-4 cursor-pointer">
              Inspiration
            </h3>
          </Link>
        </div>
        <div>
          <Link href="/">
            <h3 className="text-lg font-semibold text-foreground mb-4 transition-all duration-200 hover:text-[#e12826] hover:underline underline-offset-8 decoration-[#e12826] decoration-4 cursor-pointer">
              About
            </h3>
          </Link>
        </div>
        <div>
          <Link href="/">
            <h3 className="text-lg font-semibold text-foreground mb-4 transition-all duration-200 hover:text-[#91040c] hover:underline underline-offset-8 decoration-[#91040C] decoration-4 cursor-pointer">
              Support
            </h3>
          </Link>
        </div>
        <div>
          <Link href="/">
            <h3 className="text-lg font-semibold text-foreground mb-4 transition-all duration-200 hover:text-[#FA3C76] hover:underline underline-offset-8 decoration-[#FA3C76] decoration-4 cursor-pointer">
              Advertise
            </h3>
          </Link>
        </div>
      </div>

      {/* Copyright or additional info can be added here */}
      <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-accent-15 text-center text-gray-500">
        <p>
          © {new Date().getFullYear()} Purrfecto.design. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
