import { z } from 'zod';

export const expertSchema = z.object({
  name: z.string().min(2, 'Name is too short'),
  category: z.string().min(2, 'Category is required'),
  rating: z.number().min(0).max(5).default(0),
  experience: z.number().min(0).default(0),
  bio: z.string().min(10, 'Bio is too short'),
  avatar: z.string().url().optional(),
  slots: z.array(z.object({
    startTime: z.string(), // ISO string
    isBooked: z.boolean().default(false)
  }))
});

export type Expert = z.infer<typeof expertSchema> & { _id: string };
