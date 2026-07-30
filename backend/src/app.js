import express from "express";
import cookieParser from "cookie-parser";
import router from "./routes/auth.routes.js";
const app = express();

app.use(express.json());
app.use(cookieParser())
app.get("/", (req, res) => {
    res.send("Hello Express");
});

app.use("/api/auth",router);

export default app;