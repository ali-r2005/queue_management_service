import express from "express";
import "module-alias/register";
import { errorHandler } from "@/middlewares/error.middleware";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(express.json());
// app.use("/api/users", userRoutes);

// Central error handling
app.use(errorHandler);

app.listen(
    process.env.PORT,
    () => {
        console.log(`Server is running on port ${process.env.PORT}`);
    }
)
