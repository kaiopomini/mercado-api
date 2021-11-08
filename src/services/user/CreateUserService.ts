import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../../repositories/UsersRepositories"

interface IUserRequest {
    name: string;
    surname: string;
    email: string;
    password: string;
    
}

class CreateUserService {
    async excute({ name, surname, email, password }) {
        const usersRepository = getCustomRepository(UsersRepositories);

        if (!email) {
            throw Error("Email incorrect");
        }

        const userAlreadyExists = await usersRepository.findOne({
            email
        });

        if (userAlreadyExists) {
            throw new Error("User already exists");
        }

        const user = usersRepository.create({
            name,
            surname,
            email,
            password,
        });

        await usersRepository.save(user);

        return user;
    }
}

export { CreateUserService }