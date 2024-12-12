"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { messageSchema } from "@/schemas/messageSchema";
import { ApiResponse } from "@/types/ApiResponse";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { Loader2, LoaderPinwheel } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

export default function SendMessage() {
  const [isLoading, setIsLoading] = useState(false);
  const { username } = useParams<{ username: string }>();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof messageSchema>>({ resolver: zodResolver(messageSchema) });

  const messageContent = form.watch("content");

  const handleMessageClick = (message: string) => {
    form.setValue("content", message);
  };

  const onSubmit = async (data: z.infer<typeof messageSchema>) => {
    setIsLoading(true);
    try {
      const response = await axios.post<ApiResponse>("/api/send-message", { ...data, username });
      toast({
        title: response.data.message,
        variant: "default",
      });
      form.reset({ ...form.getValues(), content: "" });
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast({ title: "Error", description: axiosError.response?.data?.message || "Failed to sent message", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  const [isSuggestLoading, setIsSuggestLoading] = useState(false);
  const [generatedMsg, setGeneratedMsg] = useState("");
  const fetchSuggestedMessages = async () => {
    setIsSuggestLoading(true);
    try {
      const response = await axios.post<ApiResponse>("/api/suggest-messages");
      setGeneratedMsg(response.data?.message);
    } catch (error) {
      console.error("Error fetching messages:", error);
      // Handle error appropriately
    } finally {
      setIsSuggestLoading(false);
    }
  };

  const parseStringMessages = (messageString: string): string[] => {
    return messageString.split("||");
  };

  return (
    <div className="container mx-auto my-8 p-6 bg-white rounded max-w-4xl">
      <h1 className="text-4xl font-bold mb-6 text-center">Send Anonymous Message</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Send Anonymous Message to @{username}</FormLabel>
                <FormControl>
                  <Textarea placeholder="Write your anonymous message here" className="resize-none" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-center">
            {isLoading ? (
              <Button disabled>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </Button>
            ) : (
              <Button type="submit" disabled={isLoading || !messageContent}>
                Send It
              </Button>
            )}
          </div>
        </form>
      </Form>

      <div className="space-y-4 my-8">
        <div className="space-y-2">
          <Button onClick={fetchSuggestedMessages} className="my-4" disabled={isSuggestLoading}>
            Suggest Messages
          </Button>
          <p>Click on any message below to select it.</p>
        </div>
        <Card>
          <CardHeader>
            <h3 className="text-xl font-semibold">Messages</h3>
          </CardHeader>
          {isSuggestLoading ? (
            <div className="w-full h-full flex items-center justify-center mb-2">
              <LoaderPinwheel className="animate-spin" />
            </div>
          ) : (
            <CardContent className="flex flex-col space-y-4">
              {parseStringMessages(generatedMsg).map((message, index) => (
                <Button key={index} variant="outline" className="mb-2" onClick={() => handleMessageClick(message)}>
                  {message}
                </Button>
              ))}
            </CardContent>
          )}
        </Card>
      </div>
      <Separator className="my-6" />
      <div className="text-center">
        <div className="mb-4">Get Your Message Board</div>
        <Link href={"/sign-up"}>
          <Button>Create Your Account</Button>
        </Link>
      </div>
    </div>
  );
}
