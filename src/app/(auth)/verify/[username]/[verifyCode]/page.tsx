"use client";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp";
import { useToast } from "@/hooks/use-toast";
import { verifySchema } from "@/schemas/verifySchema";
import { ApiResponse } from "@/types/ApiResponse";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { Loader2 } from "lucide-react";
import { redirect, useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

function Verify() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const params = useParams<{ username: string; verifyCode?: string }>();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof verifySchema>>({
    resolver: zodResolver(verifySchema),
    defaultValues: {
      code: params?.verifyCode || "",
    },
  });
  const onSubmit = async (data: z.infer<typeof verifySchema>) => {
    if (!data) {
      toast({ title: "Error", description: "Please enter the OTP" });
      return;
    }
    setIsSubmitting(true);
    try {
      const response = await axios.post(`/api/verify-code`, { username: params.username, code: data.code });
      console.log("[RESPONSE](/api/verify-code)=> ", response);
      if (response?.data?.success) {
        toast({ title: "Success", description: response.data.message });
        router.push("/sign-in");
      } else {
        toast({ title: "Error", description: "Something went wrong" });
      }
    } catch (error) {
      console.error("Error while verifying the user ", error);
      const axiosError = error as AxiosError<ApiResponse>;
      console.log("axiosError cast AxiosError<ApiResponse> ", axiosError);
      const errorMessage = axiosError.response?.data.message ?? "Error while verifying the user";
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
    <div className="flex justify-center items-center min-h-[calc(100vh-165px)]">
      <div className="w-full max-w-md p-8 space-y-8 rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">Verify Your Account</h1>
          <p className="mb-4">Enter the verification code sent to your email</p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              name="code"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Verification Code</FormLabel>
                  <FormControl>
                    {/* <Input {...field} className="w-12 h-12 text-center border rounded-md shadow-sm focus:border-teal-500 focus:ring-teal-500" type="text" maxLength="1" pattern="[0-9]" inputmode="numeric" autocomplete="one-time-code" required/> */}
                    <InputOTP {...field} maxLength={6}>
                      <InputOTPGroup>
                        <InputOTPSlot className="w-14" index={0} />
                        <InputOTPSlot className="w-14" index={1} />
                        <InputOTPSlot className="w-14" index={2} />
                      </InputOTPGroup>
                      <InputOTPSeparator />
                      <InputOTPGroup>
                        <InputOTPSlot className="w-14" index={3} />
                        <InputOTPSlot className="w-14" index={4} />
                        <InputOTPSlot className="w-14" index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full" type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Verifying...
                </>
              ) : (
                "Verify"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default Verify;
