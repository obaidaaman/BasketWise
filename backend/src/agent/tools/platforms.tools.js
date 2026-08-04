import { tool } from "@langchain/core/tools";
import { fetchSupportedPlatforms } from "../services/platforms.service.js";

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
