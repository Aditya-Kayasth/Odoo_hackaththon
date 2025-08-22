import {z} from 'zod';

export const BlogSchema = z.object({

    userId: z.string(),

    title: z.string()
    .min(10,{message:"Title Must Be more than 10 Characters!"})
    .max(150,{message:"Title Must less than 150 Characters!"}),

    content: z.string().min(10,{message:"Content Must Be more than 10 Characters!"}),

    converImage: z.string().optional(),

    isPublic: z.boolean(),

    tags: z.array(z.string())

})

export type BlogSchemaType = z.infer<typeof BlogSchema>