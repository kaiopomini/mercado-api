import { Request, Response } from "express";
import { User } from "../../entities/User";
import { UserServices } from "../../services/app/UserServices";


export class UserController {
    async store( request: Request, response: Response) {
        
        const { name, surname, email, password, phone } = request.body;

        const userService = new UserServices();

        const user = await userService.create({ name, surname, email, password, phone });

        return response.status(201).json({
            success: true,
            payload: user,
            message: "Usuário criado com sucesso."
        });

    }

    async update( request: Request, response: Response) {
        
        const { user_id, body: { name, surname, phones, address, cpf, birth_date, avatar } } = request;

        const userService = new UserServices();

        const user = await userService.update(address, { id: user_id, name, surname, phones, cpf, birth_date, avatar } as User );

        return response.status(201).json({
            success: true,
            payload: user,
            message: "Usuário atualizado com sucesso."
        });

    }

    async updatePassword( request: Request, response: Response) {
        
        const { user_id, body: { old_password, new_password } } = request;

        const userService = new UserServices();

        userService.updatePassword({ id: user_id, old_password, new_password } );

        return response.status(201).json({
            success: true,
            payload: null,
            message: "Senha alterada com sucesso."
        });

    }
}