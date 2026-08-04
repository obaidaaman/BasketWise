import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import router from "./routes/auth.routes.js";
import chatRouter from "./routes/chat.routes.js";
import userRouter from "./routes/user.routes.js";
const app = express();

// Allow requests from any browser/origin and allow cookies
app.use(cors({
    origin: true, // true reflects the request origin, allowing any browser
    credentials: true,
}));

app.use(express.json());
app.use(cookieParser())

app.get("/", (req, res) => {
    res.send("Hello Express");
});

app.use("/api/auth", router);
app.use("/api", chatRouter);
app.use("/api", userRouter);

export default app;