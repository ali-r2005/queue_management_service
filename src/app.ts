import express from "express";
import { errorHandler } from "@/middlewares/error.middleware";
import authMiddleware from "@/middlewares/auth.middleware";
import dotenv from "dotenv";
import queueCrudRoutes from "./routes/queueCrud.routes";
import logger from "./utils/logger";

dotenv.config();

const app = express();

app.use(express.json());
app.use("/api/queues", authMiddleware, queueCrudRoutes);

// Central error handling
app.use(errorHandler);

app.listen(
    process.env.PORT,
    () => {
        logger.info(`Server is running on port ${process.env.PORT}`);
    }
)
