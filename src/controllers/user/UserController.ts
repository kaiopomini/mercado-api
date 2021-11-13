import { Request, Response } from "express";
import { UserServices } from "../../services/user/UserServices";


export class UserController {
    async store( request: Request, response: Response) {
        
        const { name, surname, email, password } = request.body;

        const createUserService = new UserServices();

        const user = await createUserService.create({ name, surname, email, password });

        return response.status(201).json({
            succes: true,
            payload: user,
            message: "Usuário criado com sucesso."
        });

    }
}