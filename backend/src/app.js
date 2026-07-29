import express from "express";

import router from "./routes/auth.routes.js";
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello Express");
});

app.use("/api/auth",router);

export default app;