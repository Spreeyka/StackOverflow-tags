import { z } from "zod";

export const tagSchema = z.object({
  name: z.string(),
  is_moderator_only: z.boolean(),
  is_required: z.boolean(),
  has_synonyms: z.boolean(),
  count: z.number(),
});

export type Tag = z.infer<typeof tagSchema>;
