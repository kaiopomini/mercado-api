import "reflect-metadata"
import express, {Request, Response, NextFunction} from "express";
import "express-async-errors";
import cors from "cors";

import { router } from "./routes";

import "./database";

const app = express();

app.use(cors())

app.use(express.json());

app.use(router);

// middleware must be after routes
app.use((error: Error, request: Request, response: Response, next: NextFunction) => {
    if(error instanceof Error) {
        return response.status(400).json({
            success: false,
            message: error.message,
        });
    }

    return response.status(500).json({
        status: "error",
        message: "Internal Server Error"
    });
})

app.listen(process.env.PORT || 3000, () => console.log("server is running..."))