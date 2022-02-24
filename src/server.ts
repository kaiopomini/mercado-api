import "reflect-metadata";
import express, {Request, Response, NextFunction} from "express";
import "express-async-errors";
import cors from "cors";
import { initializeTransactionalContext } from 'typeorm-transactional-cls-hooked';

initializeTransactionalContext()

import { router } from "./routes";

import "./database";


const allowedOrigins = ['http://localhost:3000', 'https://mercadocampos.netlify.app'];

const options: cors.CorsOptions = {
  origin: allowedOrigins
};

const app = express();

app.use(cors(options));

app.use(express.json());

app.use(router);

// middleware must be after routes
app.use((error: Error, request: Request, response: Response, next: NextFunction) => {
    console.log('ERROR NAME: ', error.name)
    console.log('ERROR MESSAGE: ', error.message)
    console.log('ERROR STACK: ', error.stack || null)
    if(error instanceof Error) {
        return response.status(400).json({
            success: false,
            message: "Não foi possível realizar a operação solicitada.",
        });
    }

    return response.status(500).json({
        status: "error",
        message: "Internal Server Error"
    });
})

app.listen(process.env.PORT || 3333, () => console.log("server is running..."))