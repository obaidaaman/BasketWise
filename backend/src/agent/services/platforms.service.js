import { abort } from "process";
import config from "../../config/config.js";
import { clear } from "console";

const BASE_URL = config.QUICK_COMMERCE_API_BASE_URL;
const abortController = new AbortController();

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



export async function searchProduct(productName, lattitude, longitude,platform) {

        const timeout = setTimeout(() => abortController.abort(), 9000);
try{

    
    const url =`${BASE_URL}/v1/search?q=${encodeURIComponent(productName)}&lat=${lattitude}&lon=${longitude}&platform=${platform}`
    const response = await fetch(url,{
        method : "GET",
        headers: {
            "Content-Type" : "application/json",
            "X-API-Key" : config.QUICK_COMMERCE_API_KEY
        },
        signal : abortController.signal
    });

    clearTimeout(timeout);
    if(!response.ok){
        const error = await response.text();
        return {
            "response" : "Something went wrong",
            "status" : response.status,
            "error" : error
        }
    }   
   
    const result = await response.json();

    // console.log(result);

    return result.data.products.slice(0,5).map((product) => ({
        id: product.id,
        name: product.name,
        brand: product.brand,

        price: {
            mrp: product.mrp,
            offerPrice: product.offer_price,
            savings: product.mrp - product.offer_price
        },

        quantity: product.quantity,

        availability: {
            inStock: product.available,
            inventory: product.inventory
        },

        rating: {
            average: product.rating,
            count: product.rating_count
        },

        platform: {
            name: product.platform.name,
            deliveryTime: product.platform.sla
        },

        deeplink: product.deeplink,
        image: product.images?.[0] ?? null
    }));

    

} catch(error){
    clearTimeout(timeout);
    if(error.name === "AbortError"){
        throw new Error("QuickCommerce request timed out.");
    }
    throw error;
}
 
}