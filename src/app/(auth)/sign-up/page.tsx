"use client";
import SignupForm from "@/components/auth/signup-form";
import { useToast } from "@/hooks/use-toast";
import { signUpSchema } from "@/schemas/signUpSchema";
import { ApiResponse } from "@/types/ApiResponse";
import axios, { AxiosError } from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import * as z from "zod";

export default function page() {
  const { toast } = useToast();
  const [username, setUsername] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
    setIsSubmitting(true);

    try {
      const response = await axios.post<ApiResponse>(`/api/sign-up`, data);
      toast({
        title: "Success",
        description: response.data.message,
      });
      // router.push(`/verify/${username}`);
      router.replace(`/verify/${username}`);
    } catch (error) {
      console.error("Error while signing up the user ", error);

      const axiosError = error as AxiosError<ApiResponse>;
      console.log("axiosError cast AxiosError<ApiResponse> ", axiosError);
      const errorMessage =
        axiosError.response?.data.message ?? "Error while signing up the user";

      toast({
        title: "Signup failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-165px)] max-sm:px-3 max-sm:my-3 text-foreground">
      <div className="w-full max-w-md p-8 space-y-8 rounded-lg shadow-md sm:my-6 shadow-slate-900 border">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-3 md:mb-6">
            Join True Feedback
          </h1>
          <p className="mb-4">Sign up to start your anonymous adventure</p>
        </div>

        <SignupForm
          onSubmit={onSubmit}
          isSubmitting={isSubmitting}
          username={username}
          setUsername={setUsername}
        />

        <div className="text-center mt-4">
          <p>
            Already a member?{" "}
            <Link
              href="/api/auth/signin"
              className="text-blue-600 hover:text-blue-800"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
