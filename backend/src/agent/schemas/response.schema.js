// agent/schemas/response.schema.js

import { z } from "zod";

export const ResponseSchema = z.object({
    type: z.enum(["product_search", "comparison", "general", "error"])
        .describe("The type of response"),

    message: z.string()
        .describe("A short, friendly summary message for the user"),

    products: z.array(
        z.object({
            id: z.string().describe("Unique product ID"),
            name: z.string(),
            brand: z.string().nullable(),
            price: z.object({
                mrp: z.number().nullable(),
                offerPrice: z.number(),
                savings: z.number().nullable(),
            }),
            quantity: z.string().nullable(),
            inStock: z.boolean(),
            platform: z.object({
                name: z.string(),
                deliveryTime: z.string().nullable(),
            }),
            deeplink: z.string().nullable(),
            image: z.string().nullable(),
        })
    ).default([]),

    platforms: z.array(z.string()).default([]),
});


