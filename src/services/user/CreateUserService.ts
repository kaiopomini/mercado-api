import { hash } from "bcryptjs";

import { UserRepository } from "../../repositories";

interface IUserRequest {
    name: string;
    surname: string;
    email: string;
    password: string;
    
}

class CreateUserService {
    async excute({ name, surname, email, password } : IUserRequest ) {
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

        const passwordHash = await hash(password, 8)

        const user = usersRepository.create({
            name,
            surname,
            email,
            password: passwordHash,
        });

        await usersRepository.save(user);

        return user;
    }
}

export { CreateUserService }