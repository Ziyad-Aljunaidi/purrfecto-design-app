import ThemeToggle from "@/components/theme-toggle";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import UserControlHeaderDesktop from "./auth-forms/user-control-header";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function AuthUserServerComponent() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    return null;
  }
  return (
    <UserControlHeaderDesktop
      user={{
        ...session.user,
        displayUsername: session.user.displayUsername ?? "Guest",
      }}
    />
  );
}

export default async function MainHeader() {
  return (
    <header className="w-full bg-background  border-b px-4 py-3 flex items-center justify-between sticky top-0 z-50">
      <Link href="/" className="flex items-center">
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
      <div className="flex items-center gap-4">
        <ThemeToggle />

        <Link
          href="/auth/signin"
          className={`text-secondary font-semibold rounded-lg px-4 py-1.5 bg-primary hover:bg-primary/90 transition-colors duration-200 flex items-center justify-center`}
        >
          Get Started
          <ChevronRight className="w-4 h-4 ml-1" />
        </Link>
        <AuthUserServerComponent />
      </div>
    </header>
  );
}
