import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
    sub: string;
}

export function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {

    // receber o token
    const authToken = request.headers.authorization;

    // validade se o token está preenchido
    if(!authToken) {
        return response.status(401).json({
            success: false,
            message: "O usuário deve estar logado",
            action: "logout"
        });
    }

    const [, token ] = authToken.split(" ");

    try {
        // validar se o token é válido
        const { sub } = verify(token, process.env.TOKEN_SECRET) as IPayload;

        // recuperar informações do usuário
        request.user_id = sub;

        return next();
    } catch (error) {
        return response.status(401).json({
            success: false,
            message: "O usuário deve estar logado",
            action: "logout",
        });
    }
} 