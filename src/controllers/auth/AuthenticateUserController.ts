import { Request, Response } from "express";
import { AuthenticateServices } from "../../services/auth/AuthenticateServices";

class AuthenticateUserController {
    async store(request: Request, response: Response) {
        const { email, password } = request.body;

        const authenticateUserService = new AuthenticateServices();

        const token = await authenticateUserService.authUser({
            email,
            password
        });

        return response.status(201).json({
            succes: true,
            payload: token,
            message: "Login realizado com sucesso."
        });
    }
}

export { AuthenticateUserController }