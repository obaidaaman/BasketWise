import config from "../../config/config.js";
const BASE_URL = config.QUICK_COMMERCE_API_BASE_URL;

export async function fetchSupportedPlatforms() {
    const url = BASE_URL + "/v1/supported-platforms";

    const response = await fetch(url, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
    }

    const result = await response.json();
    return result.platforms;
}

