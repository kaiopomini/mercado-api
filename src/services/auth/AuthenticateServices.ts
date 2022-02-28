import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { UserRepository } from "../../repositories";

interface IAuthenticateRequest {
    email: string;
    password: string;
}

export class AuthenticateServices {
    async authUser({ email, password } : IAuthenticateRequest) {
        const usersRepositories = UserRepository();

        // verifica se o email existe
        const user = await usersRepositories.findOne({email});

        if(!user){
            throw new Error("MESSAGE:Email ou Senha incorreta");
        }

        // verifica se a senha está correta
        const passwordMatch = await compare(password, user.password);

        if(!passwordMatch) {
            throw new Error("MESSAGE:Email ou Senha incorreta");
        }

        // gerar token
        const token = sign({
            email: user.email,
            
        }, process.env.TOKEN_SECRET, {
            subject : user.id,
            expiresIn: "15d"
        });

        return token;
    }

    async me(user_id: string) {
        const usersRepositories = UserRepository();

        // verifica se o email existe
        const user = await usersRepositories.findOne({id: user_id}, {relations: ["roles", "permissions"]});

        if(!user){
            throw new Error("MESSAGE:Usuário não logado");
        }

        delete user.password;
        return user;
    }
}
