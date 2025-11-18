"use client";

import CTA from "@/components/message-sending-page/CTA";
import GenerateMessages from "@/components/message-sending-page/GenerateMessages";
import MessageSendingForm from "@/components/message-sending-page/MessageSendingForm";
import { Separator } from "@/components/ui/separator";
import { messageSchema } from "@/schemas/messageSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "next/navigation";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

export default function SendMessage() {
  const { username } = useParams();

  const inputRef = useRef<HTMLHeadingElement>(null);

  const form = useForm<z.infer<typeof messageSchema>>({
    resolver: zodResolver(messageSchema),
  });

  return (
    <div className="container mx-auto my-8 p-3 rounded max-w-4xl">
      <h1 ref={inputRef} className="text-4xl font-bold mb-6 text-center">
        Send Anonymous Message to <br /> @{username}
      </h1>

      <MessageSendingForm form={form} />

      <Separator className="my-8" />

      <GenerateMessages form={form} inputRef={inputRef} />

      <Separator className="my-8 mt-14" />

      <CTA />
    </div>
  );
}
