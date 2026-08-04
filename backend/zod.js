import { searchProduct } from "./src/agent/services/platforms.service.js";


const result = await searchProduct("Tata tea", 26.919905,80.968592,"BlinkIt");

console.log(result);