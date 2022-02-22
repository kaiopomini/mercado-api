import { hash } from "bcryptjs";

import { UserRepository } from "../../repositories";

interface IUserRequest {
    name: string;
    surname: string;
    email: string;
    password: string;
}

interface IUserResponse {
    name: string;
    surname: string;
    email: string;
    id: string;
}

export class UserServices {
    async create({ name, surname, email, password } : IUserRequest ) : Promise<IUserResponse>{
        const usersRepository = UserRepository();

        if (!email) {
            throw Error("Email incorreto");
        }

        const userAlreadyExists = await usersRepository.findOne({
            email
        });

        if (userAlreadyExists) {
            throw new Error("O usuário já existe");
        }

        const userDeleted = await usersRepository.findOne({
            where: { email },
            withDeleted: true
        });

        if(userDeleted) {
            throw new Error("O usuário foi excluído recentemente, contate o administrador para reativa-lo");
        }

        const passwordHash = await hash(password, 8)

        const user = usersRepository.create({
            name,
            surname,
            email,
            password: passwordHash,
        });

        const { id }= await usersRepository.save(user);
        
        const resUser = { id, name, surname, email }

        return resUser
    }
}