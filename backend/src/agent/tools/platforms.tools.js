import { tool } from "@langchain/core/tools";
import { fetchSupportedPlatforms, searchProduct } from "../services/platforms.service.js";
import { tr } from "zod/v4/locales";

export const getSupportedPlatforms = tool(
    async function () {
        try {
            const platforms = await fetchSupportedPlatforms();
            return JSON.stringify(platforms);
        } catch (err) {
            return JSON.stringify({ error: err.message });
        }
    },
    {
        name: "getSupportedPlatforms",
        description:
            "Returns a list of quick-commerce delivery platforms (e.g. BlinkIt, Zepto) " +
            "currently available. Call this when the user asks which platforms are supported.",
    }
);

export const searchProductTool = tool(async( productName,
        latitude,
        longitude,
        platform,) =>{
    try{
        return await searchProduct(productName,latitude,longitude,platform);
    }catch(error){

    }
},
{
        name: "searchProduct",
        description:
            "Searches for products on a quick-commerce platform.",

        schema: z.object({
            productName: z
                .string()
                .describe("Name of the product to search for"),

            latitude: z
                .number()
                .describe("User's latitude"),

            longitude: z
                .number()
                .describe("User's longitude"),

            platform: z
                .string()
                .describe("Quick-commerce platform like BlinkIt or Zepto"),
        }),
    }

)

