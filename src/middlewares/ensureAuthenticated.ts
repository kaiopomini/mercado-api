import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { UserRepository } from "../repositories";

interface IPayload {
    sub: string;
}

export async function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {

    // receber o token
    const authToken = request.headers.authorization;

    // validade se o token está preenchido
    if (!authToken) {
        return response.status(401).json({
            success: false,
            message: "O usuário deve estar logado",
            action: "logout"
        });
    }

    const [, token] = authToken.split(" ");

    try {
        // validar se o token é válido
        const { sub } = verify(token, process.env.TOKEN_SECRET) as IPayload;

        const user = await UserRepository()
        .findOne({
            where: { id: sub },
            relations: ["permissions", "roles"]
        })
        
        if (!user) {
            throw new Error("Usuário não logado");
        }

        // recuperar informações do usuário
        request.user_id = sub;
        request.user_permissions = user.permissions ;
        request.user_roles = user.roles;

        return next();
    } catch (error) {
        return response.status(401).json({
            success: false,
            message: "O usuário deve estar logado",
            action: "logout",
        });
    }
} 