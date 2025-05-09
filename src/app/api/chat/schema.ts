import { z } from "zod";

const WeekSchema = z.object({
  title: z.string(),
  content: z.string(),
});

export const RoadmapSchema = z.object({
  weekNumber: z.array(WeekSchema),
});

// Type inference
export type RoadmapData = z.infer<typeof RoadmapSchema>;
