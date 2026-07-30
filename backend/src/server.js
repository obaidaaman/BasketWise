
import app from "./app.js";

import connectDB from "./config/db.js";
const PORT = 3000;
async  function startServer(){
  await connectDB();
app.listen(PORT, () => {
  console.log(`Express server listening on port ${PORT}`);
});


}


startServer();


