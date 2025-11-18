import { useToast } from "@/hooks/use-toast";
import { messageSchema } from "@/schemas/messageSchema";
import { ApiResponse } from "@/types/ApiResponse";
import axios, { AxiosError } from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "../ui/button";
import SuggestionBox from "./SuggestionBox";

interface GenerateMessagesProps {
  form: ReturnType<typeof useForm<z.infer<typeof messageSchema>>>;
  inputRef: React.RefObject<HTMLDivElement>;
}

export default function GenerateMessages({
  form,
  inputRef,
}: GenerateMessagesProps) {
  const { toast } = useToast();

  const fetchSuggestedMessages = async () => {
    setIsSuggestLoading(true);
    setShowSuggestions(true);

    try {
      const response = await axios.post<ApiResponse>("/api/suggest-messages");
      setGeneratedMsg(response.data?.message);
    } catch (error) {
      console.error("Error fetching messages:", error);
      const axiosError = error as AxiosError<ApiResponse>;
      toast({
        title: "Error",
        description:
          axiosError.response?.data?.message || "Something went wrong!",
        variant: "destructive",
      });
    } finally {
      setIsSuggestLoading(false);
    }
  };

  const suggestionRef = useRef<HTMLDivElement>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSuggestLoading, setIsSuggestLoading] = useState(false);
  const [generatedMsg, setGeneratedMsg] = useState("");

  const handleMessageClick = (message: string) => {
    form.setValue("content", message);
    inputRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (showSuggestions) {
      suggestionRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [showSuggestions]);

  return (
    <div className="space-y-4 my-8">
      <div className="space-y-2">
        <p className="text-sm mb-2 text-neutral-200 mt-12">
          {" "}
          Can&#39;t think of anything atm?
          <br /> You can generate random suggestions with our Ai.
        </p>
        <Button
          onClick={fetchSuggestedMessages}
          className="my-4 font-semibold"
          disabled={isSuggestLoading}
        >
          Generate Messages with Ai
        </Button>
      </div>

      {showSuggestions && (
        <SuggestionBox
          generatedMsg={generatedMsg}
          suggestionRef={suggestionRef}
          handleMessageClick={handleMessageClick}
          isSuggestLoading={isSuggestLoading}
          showSuggestions={showSuggestions}
        />
      )}
    </div>
  );
}
