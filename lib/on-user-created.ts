"use server";
import { db } from "@/db/drizzle";
import { profile } from "@/db/schema/profile";
import { nanoid } from "nanoid";

export default async function onUserCreateProfileAction({userId, username,displayUsername, name, email, avatar_url, created_at, updated_at}:{
    userId: string;
    username: string;
    displayUsername: string;
    name: string;
    email: string;
    avatar_url: string;
    created_at: Date;
    updated_at: Date;
}){
  // const id = generateCatID();
  const profileId = nanoid();
  
  try{
    await db.insert(profile).values({
        id: profileId,
        userId: userId,
        username: username,
        displayUsername: displayUsername, // Generate a random username if not provided
        name: name,
        email: email,
        avatar_url: [avatar_url],
        createdAt: created_at,
        updatedAt: updated_at,
    });
    return {success: true};
  }catch(error){
    console.error("Error creating user profile: ", error);
    return {success: false, error: "Error creating user profile"};
  }
}