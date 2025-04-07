import { Button } from "@/components/ui/button";
import { getThemeFromCookie} from "@/actions/themeActions";
import ThemeToggle from "./theme-toggle";
import Link from "next/link";
import Image from "next/image";

export default async function MainHeader() {
  const currentTheme = await getThemeFromCookie() || "dark";
  return (
    <header className="w-full bg-background  border-b px-4 py-3 flex items-center justify-between">
      <Link href="/" className="flex items-center">
        <div className="w-10 h-10 " aria-label="Logo">
          <Image src="/logo.png" alt="Logo" width={35} height={35} className="w-full h-full" />
        </div>
        <span className="ml-2 font-semibold hidden sm:inline-block">Purrfecto</span>
      </Link>

      <div className="flex items-center gap-4">
        <nav className="hidden md:flex items-center gap-6">
          <Link href="#" className="text-sm font-medium hover:text-primary">
            Home
          </Link>
          <Link href="#" className="text-sm font-medium hover:text-primary">
            Features
          </Link>
          <Link href="#" className="text-sm font-medium hover:text-primary">
            About
          </Link>
        </nav>
        <ThemeToggle  currentTheme={currentTheme}/>
        <Button className="rounded-full font-[family-name:var(--font-geist-mono)]">Get Started</Button>
      </div>
    </header>
  );
}