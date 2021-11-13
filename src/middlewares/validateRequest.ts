import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

export function validateRequest(request: Request, response: Response, next: NextFunction) {

    const errors = validationResult(request);

    if(!errors.isEmpty()) {
        
        return response.status(400).json({ 
            success: false,
            message: "informações inválidas",
            errors: errors.array(),
        })
        
    }

    return next()
}