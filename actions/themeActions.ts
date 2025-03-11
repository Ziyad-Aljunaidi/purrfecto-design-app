"use server";
import { cookies } from "next/headers";

export async function getThemeFromCookie() {
  const cookieStore = await cookies();
  if (cookieStore.has("theme") && cookieStore.get("theme")?.value) {
    const cookieTheme = cookieStore.get("theme")?.value;
    return cookieTheme;
  }
  return "dark";
}


export async function setThemeCookie(theme: string) {
  const cookieStore = await cookies();
  cookieStore.set("theme", theme);
}
