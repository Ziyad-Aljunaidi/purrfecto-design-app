import { cookies } from "next/headers";
import { ReactNode } from "react";
interface ApplyThemeProps {
  children: ReactNode;
}

export default async function ApplyTheme({ children }: ApplyThemeProps) {
  const cookieStore = await cookies();
  const themeCookie = cookieStore.get("theme")?.value;
  if(themeCookie && (themeCookie === "dark" || themeCookie === "light")) {
    return (
      <html lang="en" className={themeCookie}>
        {children}
      </html>
    );
  }
  
  return (
    <html lang="en" className="dark">
      {children}
    </html>
  );
}
