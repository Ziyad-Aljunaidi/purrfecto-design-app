import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db/drizzle"; // your drizzle instance
import { user, session, account, verification} from "@/db/schema/auth-schema"; // your user table
import { username } from "better-auth/plugins"; // your username table
import onUserCreateProfileAction from "./on-user-created";
import { generateCatID } from "./generate-cat-id";
import { richUser} from "@/lib/types";
import { nextCookies } from "better-auth/next-js";


export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg", // or "mysql", "sqlite"
    schema: {
      user: user, // your user table
      session: session, // your session table
      account: account, // your account table
      verification: verification, // your verification table
      // profile: profile, 
    },

  }),
  plugins: [
    username(),
    nextCookies(),
  ],
  databaseHooks: {
    user: {
      create: {
        before:async (user:richUser) => {
          const usernameCatId = generateCatID();
          user.username = user.username ?? usernameCatId;
          user.displayUsername = user.displayUsername ?? usernameCatId; // Generate a random username if not provided
          console.log(user) // Generate a random username if not provided
        },
        after:async (user:richUser) => {
          await onUserCreateProfileAction({
            userId: user.id,
            username: user.username ?? "",
            displayUsername: user.displayUsername ?? "",
            name: user.name ?? "",
            email: user.email ?? "",
            avatar_url: user.image ?? "",
            created_at: user.createdAt ?? new Date(),
            updated_at: user.updatedAt ?? new Date()  
          })
        }
      }
    }
  },
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
});
