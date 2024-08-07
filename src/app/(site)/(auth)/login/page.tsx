"use client";

import { login } from "@/lib/utils/actions";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";

const formSchema = z.object({
  email: z.string().email({
    message: "Invalid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    login(values);
  }

  return (
    <main className="min-h-screen-minus-80 container flex justify-center py-24">
      <section className="max-w-sm flex-1">
        <Card>
          <CardHeader>
            <CardTitle>Log in</CardTitle>
            <CardDescription>Log in to CommunitySpot.</CardDescription>
          </CardHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Enter your email"
                          {...field}
                        />
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
                        <div className="relative">
                          <Input
                            type={showPassword ? "text" : "password"}
                            className="hide-password-toggle pr-10"
                            placeholder="Enter your password"
                            {...field}
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                            onClick={() => setShowPassword((prev) => !prev)}
                          >
                            {showPassword ? (
                              <EyeIcon className="h-4 w-4" aria-hidden="true" />
                            ) : (
                              <EyeOffIcon
                                className="h-4 w-4"
                                aria-hidden="true"
                              />
                            )}
                            <span className="sr-only">
                              {showPassword ? "Hide password" : "Show password"}
                            </span>
                          </Button>

                          {/* hides browsers password toggles */}
                          <style>{`
                          .hide-password-toggle::-ms-reveal,
                          .hide-password-toggle::-ms-clear {
                            visibility: hidden;
                            pointer-events: none;
                            display: none;
                          }
                        `}</style>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardFooter className="flex items-center justify-between">
                <Link
                  href="/signup"
                  className={buttonVariants({ variant: "link" })}
                >
                  Switch to Sign up
                </Link>
                <Button type="submit">Log in</Button>
              </CardFooter>
            </form>
          </Form>
        </Card>
      </section>
    </main>
  );
}
