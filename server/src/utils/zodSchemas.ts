import { z } from 'zod';

export const taskvalidation = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().optional(),
    dueDate: z.coerce.date({ required_error: "Due date is required" }),
    assignee: z.string().optional(),
    
    section: z.string().min(1, "Section is required"),
});

export type taskValidate = z.infer<typeof taskvalidation>;