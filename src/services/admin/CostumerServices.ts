import { Request } from "express-serve-static-core";
import { hash } from "bcryptjs";
import { UserRepository } from "../../repositories";
import { User } from "../../entities/User";
import { Transactional } from "typeorm-transactional-cls-hooked";

interface IUserRequest {
    name: string;
    surname: string;
    email: string;
    password: string;
    cpf?: string;
    gender?: string;
    birth_date?: Date;
}

interface IUserResponse {
    name: string;
    surname: string;
    email: string;
    id: string;
}

interface IUserPaginatedResponse {
    data: User[];
    total: number;
    page: number;
    per_page: number;
    last_page: number;
}

interface ICostumerRequestUpdate {
    id: string;
    name: string;
    surname: string;
    email: string;
    password: string;
    cpf?: string;
    gender?: string;
    birth_date?: Date;
}

export class CostumerServices {

    async create({ name, surname, email, password, cpf, gender, birth_date }: IUserRequest): Promise<IUserResponse> {
        const userRepository = UserRepository();

        if (!email) {
            throw Error("Email incorreto");
        }

        const userAlreadyExists = await userRepository.findOne({
            email,
        });

        if (userAlreadyExists) {
            throw new Error("O usuário já existe");
        }

        const userDeleted = await userRepository.findOne({
            where: { email },
            withDeleted: true
        });

        const passwordHash = await hash(password, 8)

        const user = userRepository.create({
            name,
            surname,
            email,
            password: passwordHash,
            cpf,
            gender,
            birth_date,
        });

        if (userDeleted) {
            await userRepository.update(userDeleted.id, { name, surname, email, deleted_at: null })
            const resUser = { id: userDeleted.id, name, surname, email }
            return resUser
        }

        const newUser = await userRepository.save(user);
        
        delete newUser.password

        return { ...newUser }
    }

    async getAll(request: Request): Promise<IUserPaginatedResponse> {
        const userRepository = UserRepository();

        const builder = userRepository.createQueryBuilder('costumers');
        builder.select(['costumers'])
        builder.leftJoin('costumers.roles', 'roles')
        builder.where("roles.name IS NULL or roles.name = ' '")

        // search
        const { search } = request.query;

        // busca no codigo de barras quando é digitado apenas numeros
        if (search) {
            builder.andWhere('costumers.id LIKE :s OR costumers.name LIKE :s2 OR costumers.email LIKE :s3', { s: `${search}`, s2: `%${search}%`, s3: `${search}%` })
        }

        // sort
        const sort: any = request.query.sort;
        if (sort) {
            builder.orderBy('costumers.name', sort.toUpperCase());
            builder.addOrderBy('costumers.created_at', 'ASC')
        } else {
            builder.orderBy('costumers.name', 'ASC');
            builder.addOrderBy('costumers.created_at', 'ASC')
        }

        // paginating
        const page: number = parseInt(request.query.page as any) || 1;
        const perPage: number = parseInt(request.query.per_page as any) || 10;
        const total = await builder.getCount();

        builder.offset((page - 1) * perPage).limit(perPage);

        const data = await builder.getMany();

        data.forEach(item => delete item.password)

        const result = {
            data,
            total,
            page,
            per_page: perPage,
            last_page: Math.ceil(total / perPage),
        };

        return result;
    }

    async getOne(id: string): Promise<User> {

        // const user = await usersRepositories.findOne({id: user_id}, {relations: ["roles", "permissions"]});

        // if(!user){
        //     throw new Error("Usuário não logado");
        // }

        // delete user.password;
        // return user;
        const userRepository = UserRepository();

        const builder = userRepository.createQueryBuilder('costumers');
        builder.select(['costumers'])
        builder.leftJoin('costumers.roles', 'roles')
        builder.where("roles.name IS NULL or roles.name = ' '")
        // builder.andWhere(`costumers.id = ${id}`)
        // const costumer = await userRepository.findOne({ id }, { relations: ['user_info'] });
        const costumer = await builder.getOneOrFail();

        if (!costumer) {
            throw new Error("O cliente não foi encontrado");
        }
        delete costumer.password;

        return costumer;
    }

    async update({ id, name, surname, email, password, cpf, gender, birth_date }: ICostumerRequestUpdate): Promise<any> {
        const userRepository = UserRepository();

        const costumerToUpdate = await userRepository.findOne({
            id
        });

        if (!costumerToUpdate) {
            throw new Error("O cliente não foi encontrado");
        }

        const customerEmailAlreadyExists = await userRepository.findOne({
            email
        });

        if (customerEmailAlreadyExists && customerEmailAlreadyExists.email !== costumerToUpdate.email) {
            throw new Error("O email já cadastrado");
        }

        const passwordHash = await hash(password, 8)

        const costumer = {
            id,
            name,
            surname,
            email,
            password: passwordHash,
            cpf,
            gender,
            birth_date,
        };

        const resCostumer = await userRepository.save(costumer);

        delete resCostumer.password

        console.log(resCostumer)

        return resCostumer
    }

    async delete(id: string) {
        const userRepository = UserRepository();
        const costumer = await userRepository.findOne({
            id
        });

        if (!costumer) {
            throw new Error("O cliente não foi encontrado");
        }

        await userRepository.softDelete(id)

        return;
    }
}