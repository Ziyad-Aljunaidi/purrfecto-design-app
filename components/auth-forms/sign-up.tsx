"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { authClient } from "@/lib/auth-client";
import { LoaderCircle, AlertCircle } from "lucide-react";
import { useState } from "react";

import { redirect } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ShineBorder } from "@/components/magicui/shine-border";
import Link from "next/link";

const signUpSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters long"),
  name: z.string().min(3, "Name must be at least 3 characters long"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

async function onSubmit(
  values: z.infer<typeof signUpSchema>,
  setIsLoading: (loading: boolean) => void,
  setMessage: (message: string) => void
) {
  console.log(values);

  const { data, error } = await authClient.signUp.email(
    {
      email: values.email,
      password: values.password,
      name: values.name,
      image: "https://assets.purrfecto.design/DefaultAvatars/Default-04.png", // User image URL (optional)
      callbackURL: "/create", // A URL to redirect to after the user verifies their email (optional)
    },
    {
      onRequest: () => {
        setMessage("");
        setIsLoading(true);
      },
      onSuccess: () => {
        //redirect to the dashboard or sign in page
        setIsLoading(false);
        setMessage("");
        redirect("/create");
      },
      onError: (ctx) => {
        // display the error message
        // alert(ctx.error.message);
        setMessage(ctx.error.message);
        setIsLoading(false);
      },
    }
  );

  console.log("data", data);
  console.log("error", error);
}

async function GoogleSignIn() {
  const data = await authClient.signIn.social({
    provider: "google",
    // callbackURL: "/create",
  });
  console.log(data);
}

export default function SignUpForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      name: "",
      email: "",
      password: "",
    },
  });

  return (
    <main className="flex flex-col items-center justify-center max-w-[500px] w-full h-full p-4 space-y-4">
      <Card className="relative overflow-hidden max-w-[500px] w-full shadow-none border-none">
        <ShineBorder
          shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
          borderWidth={2}
        />
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Create An Account
          </CardTitle>
          <CardDescription>
            Explore A world Of Creativity And Innovation & Share Your Ideas With
            The World.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit((values) =>
                onSubmit(values, setIsLoading, setMessage)
              )}
              className="space-y-8"
            >
              <div className="lg:flex lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your Name" {...field} />
                      </FormControl>
                      <FormDescription>
                        This is your public display name.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input placeholder="Username" {...field} />
                      </FormControl>
                      <FormDescription>‎</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="email@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Password must be at least 8 characters long"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full p-4 cursor-pointer buttonHover"
              >
                {isLoading ? (
                  <LoaderCircle className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  "Sign Up"
                )}
              </Button>
              <Link
                href="/auth/signin"
                className="text-sm font-medium text-primary hover:underline items-center justify-center flex"
              >
                Already have an account? Sign In
              </Link>
            </form>
          </Form>
          <div className="flex items-center space-x-4 my-4">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="text-sm text-gray-500">or</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>
          <Button
            variant="secondary"
            className="w-full p-4 cursor-pointer buttonHover tracking-tighter"
            onClick={() => GoogleSignIn()}
            disabled={isLoading}
          >
            Continue with Google
          </Button>
        </CardContent>
      </Card>
      <div
        className={`font-['JetBrains_Mono'] rounded-lg text-red-500 p-4 bg-red-50 flex items-center space-x-4 ${cn(
          "w-full",
          message ? "block" : "hidden"
        )}`}
      >
        <AlertCircle className="h-6 w-6 flex-shrink-0" />
        <div>
          <h1 className="text-sm font-extrabold">Error</h1>
          <p className="text-sm">{message}</p>
        </div>
      </div>
    </main>
  );
}
