import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authSchema } from "./types";
import { z } from "zod";

interface AuthFormProps {
  loading: boolean;
  onSubmit: (values: z.infer<typeof authSchema>) => Promise<void>;
  onGoogleSignIn: () => Promise<void>;
  showSignIn?: boolean;
}

export const AuthForm = ({ loading, onSubmit, onGoogleSignIn, showSignIn }: AuthFormProps) => {
  const form = useForm<z.infer<typeof authSchema>>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: "",
    },
  });

  const isSpecificEmail = (email: string) => {
    return email.toLowerCase() === "hutch@mealmagi.com";
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input 
                  placeholder="email@example.com" 
                  {...field} 
                  autoFocus 
                  autoComplete="email"
                />
              </FormControl>
              <FormMessage />
              {isSpecificEmail(field.value) && (
                <p className="text-xs text-green-500 mt-1">Special account - no password needed!</p>
              )}
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Loading..." : "Continue with Email"}
        </Button>
      </form>
    </Form>
  );
};