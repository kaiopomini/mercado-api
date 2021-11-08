import { Request, Response } from "express";
import { CreateUserService } from "../../services/user/CreateUserService";


class CreateUserController {
    async handle( request: Request, response: Response) {
        
        const { name, surname, email, password } = request.body;

        const createUserService = new CreateUserService();

        const user = await createUserService.excute({ name, surname, email, password });

        return response.json(user);

    }
}

export { CreateUserController }