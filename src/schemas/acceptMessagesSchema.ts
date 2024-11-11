import { z } from "zod";

export const acceptMessagesSchema = z.object({
  acceptsMessages: z.boolean(),
});
