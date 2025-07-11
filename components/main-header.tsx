import ThemeToggle from "@/components/theme-toggle";
import Link from "next/link";
import Image from "next/image";
import { Plus, ChevronRight } from "lucide-react";
import UserControlHeaderDesktop from "./auth-forms/user-control-header";
import { getUserData } from "@/app/actions/UserAction";
import { outfit } from "./fonts";

export async function AuthUserServerComponent() {
  const user = await getUserData();
  if (!user) {
    return (
      <>
        <ThemeToggle />

        <Link
          href="/auth/signin"
          className={`text-secondary font-semibold rounded-lg px-4 py-1.5 bg-primary hover:bg-primary/90 transition-colors duration-200 flex items-center justify-between`}
        >
          Get Started
          <ChevronRight className="w-4 h-4 ml-1" />
        </Link>
      </>
    );
  }
  return (
    <>
      <Link
        href="/create"
        className={`${outfit.className} tracking-wide place-items-center text-secondary font-medium rounded-lg px-4 py-1.5 bg-primary hover:bg-primary/90 transition-colors duration-200 flex items-center justify-center`}
      >
        Create
       <Plus  className="ml-1 opacity-60" size={16} aria-hidden="true" />
      </Link>
      <UserControlHeaderDesktop
        user={{
          ...user,
          displayUsername: user.displayUsername ?? "Guest",
        }}
      />
    </>
  );
}

export default async function MainHeader() {
  return (
    <header className="w-full bg-background  border-b px-4 py-3 flex items-center justify-between sticky top-0 z-50 ">
      <Link href="/" className="flex items-center">
        <div className="flex " aria-label="Logo">
          <Image
            src="/LogoAndTextForDarkMode.svg"
            alt="Logo"
            width={100}
            height={50}
            className="hidden dark:block items-center aspect-auto "
          />
          <Image
            src="/LogoAndTextForWhiteMode.svg"
            alt="Logo"
            width={100}
            height={50}
            className="block dark:hidden items-center aspect-auto "
          />
        </div>
      </Link>
      <div className="flex items-center gap-4">
        <AuthUserServerComponent />
      </div>
    </header>
  );
}
