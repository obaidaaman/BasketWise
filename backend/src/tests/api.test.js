
const BASE_URL = "https://api.quickcommerceapi.com" 

async function searchProducts() {
      const url = `${BASE_URL}/v1/supported-platforms`;



      try{
        const response = await fetch(url,
            {
                 method : "GET",
                 headers: {
                    "Content-Type" : "application/json",
                    
                 }
            }

        );

        if (!response.ok){
            throw new Error(`HTTP error: ${response.status}`);
        }
        const result = await response.json();
        console.log(`Results: ${JSON.stringify(result.platforms.slice(0,3))}`);
      }
    catch(err){
        return {
            "error" : err,
        }
    }
}



searchProducts();