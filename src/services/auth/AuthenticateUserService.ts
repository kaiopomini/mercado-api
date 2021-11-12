import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../../repositories/UsersRepositories";

interface IAuthenticateRequest {
    email: string;
    password: string;
}

class AuthenticateUserService {
    async execute({ email, password } : IAuthenticateRequest) {
        const usersRepositories = getCustomRepository(UsersRepositories)

        // verifica se o email existe
        const user = await usersRepositories.findOne({ email });

        if(!user){
            throw new Error("Email ou Senha incorreta")
        }

        // verifica se a senha está correta
        const passwordMatch = await compare(password, user.password);

        if(!passwordMatch) {
            throw new Error("Email ou Senha incorreta")
        }

        // gerar token


        const token = sign({
            email: user.email
        }, process.env.TOKEN_SECRET, {
            subject : user.id,
            expiresIn: "1d"
        });

        return token;
    }
}

export { AuthenticateUserService };
