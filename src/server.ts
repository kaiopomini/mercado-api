import "reflect-metadata";
import express, {Request, Response, NextFunction} from "express";
import "express-async-errors";
import cors from "cors";
import { initializeTransactionalContext } from 'typeorm-transactional-cls-hooked';

initializeTransactionalContext()

import { router } from "./routes";

import "./database";

import { isNumeric } from "./utils/numberFormat";


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

   
    console.log('----:: ERROR LOG START::----')
    console.log('ERROR MESSAGE: ', error.message)
    console.log('ERROR STACK: ', error.stack || null)

    const [ ,status] = error.message.split('STATUS:', 2)
    const slicedStatus = status?.slice(0, 3)
    const statusNumeric =  isNumeric(slicedStatus) ? parseInt(slicedStatus) : null
    const [ ,message] = error.message.split('MESSAGE:', 2)

    console.log('----:: ERROR LOG END ::----')
  
    if(statusNumeric && message) {
        return response.status(statusNumeric).json({
            success: false,
            message: message,
        });
    } 

    if(message) {
        return response.status(400).json({
            success: false,
            message: message,
        });
    }

    return response.status(500).json({
        success: false,
        message: "Internal Server Error"
    });

    
})

app.listen(process.env.PORT || 3333, () => console.log("server is running..."))