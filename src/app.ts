import express from "express";
import { errorHandler } from "@/middlewares/error.middleware";
import authMiddleware from "@/middlewares/auth.middleware";
import dotenv from "dotenv";
import queueRoutes from "./routes/queue.routes";

dotenv.config();

const app = express();

app.use(express.json());
app.use("/api/queues", authMiddleware, queueRoutes);

// Central error handling
app.use(errorHandler);

app.listen(
    process.env.PORT,
    () => {
        console.log(`Server is running on port ${process.env.PORT}`);
    }
)
