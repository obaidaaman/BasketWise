import { z } from 'zod'

export const signupSchema = z.object({
    username: z.string().min(3, "Username must be at least 3 characters"),
    email: z.email("Invalid email format"),
    password: z.string().min(8, "Password must be at least 8 characters")
})

export const loginSchema = z.object({
    email: z.email(),
    password: z.string().min(1, "Password is required")
})

export const chatSchema = z.object({
    message: z.string()
        .min(1, "Message cannot be empty")
        .max(2000, "Message too long")
})




export const locationSchema = z.object({
    location: z.object({
        latitude: z.number().min(-90).max(90),
        longitude: z.number().min(-180).max(180)
    })
});
