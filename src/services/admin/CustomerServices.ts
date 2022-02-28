import { Request } from "express-serve-static-core";
import { hash } from "bcryptjs";
import { AddressRepository, PhoneRepository, UserRepository } from "../../repositories";
import { User } from "../../entities/User";
import { Transactional } from "typeorm-transactional-cls-hooked";

interface IUserPaginatedResponse {
    data: User[];
    total: number;
    page: number;
    per_page: number;
    last_page: number;
}


export class CustomerServices {

    @Transactional()
    async create({ name, surname, email, password, cpf, birth_date, phones, address, avatar }: User): Promise<User> {
        const userRepository = UserRepository();
        const addressRepository = AddressRepository();
        const phoneRepository = PhoneRepository();

        if (!email) {
            throw Error("MESSAGE:Email incorreto");
        }

        try {
            const emailAlreadyExists = await userRepository.findOne({
                email,
            });

            if (emailAlreadyExists) {
                throw new Error("MESSAGE:Email já cadastrado");
            }
            if (cpf) {
                const cpfAlreadyExists = await userRepository.findOne({
                    cpf,
                });

                if (cpfAlreadyExists) {
                    throw new Error("MESSAGE:Cpf já cadastrado");
                }
            }

            const passwordHash = await hash(password, 8);

            const user = userRepository.create({
                avatar,
                name,
                surname,
                email,
                password: passwordHash,
                cpf,
                birth_date,
            });

            const newUser = await userRepository.save(user);

            const phonesTo = phones?.map(phone => {
                return phoneRepository.create({
                    ...phone,
                    user: newUser
                })
            })

            phonesTo?.forEach(async phone => {
                try {
                    await phoneRepository.save(phone);
                } catch (error) {

                }

            })

            const addressTo = addressRepository.create({
                ...address,
                user: newUser
            })

            await addressRepository.save(addressTo)

            delete newUser.password

            return newUser
        } catch (error) {
            throw new Error(error)
        }

    }

    async getAll(request: Request): Promise<IUserPaginatedResponse> {
        const userRepository = UserRepository();

        const builder = userRepository.createQueryBuilder('customers');
        builder.select(['customers'])
        builder.leftJoin('customers.roles', 'roles')
        builder.where("roles.name IS NULL or roles.name = ' '")
        builder.leftJoinAndSelect('customers.phones', 'phones')
        builder.leftJoinAndSelect('customers.address', 'address')

        // search
        const { search } = request.query;

        // busca no codigo de barras quando é digitado apenas numeros
        if (search) {
            builder.where('customers.id = :s OR concat(customers.name, " ", customers.surname) LIKE :s2 OR customers.email LIKE :s3', { s: `${search}`, s2: `%${search}%`, s3: `${search}%` })
        }

        // sort
        const sort: any = request.query.sort;
        const orderBy: any = request.query.order_by;

        builder.orderBy(orderBy ? `customers.${orderBy}` : 'customers.name', sort ? sort.toUpperCase() : 'ASC');

        // paginating
        const page: number = parseInt(request.query.page as any) || 1;
        const perPage: number = parseInt(request.query.per_page as any) || 10;
        const total = await builder.getCount();

        builder.offset((page - 1) * perPage).limit(perPage);

        const data = await builder.getMany();

        data.forEach(customer => {
            delete customer.password
        })

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

        const userRepository = UserRepository();

        const builder = userRepository.createQueryBuilder('customers');
        builder.select(['customers'])
        builder.leftJoin('customers.roles', 'roles')
        builder.where("roles.name IS NULL or roles.name = ' '")
        builder.leftJoinAndSelect('customers.phones', 'phones')
        builder.leftJoinAndSelect('customers.address', 'address')
        builder.where('customers.id = :s', { s: `${id}` })


        const customer = await builder.getOne();

        if (!customer) {
            throw new Error("MESSAGE:O cliente não foi encontrado");
        }
        delete customer.password;

        return customer;
    }

    @Transactional()
    async update({ id, name, surname, email, password, cpf, birth_date, phones, address, avatar }: User): Promise<any> {
        const userRepository = UserRepository();
        const addressRepository = AddressRepository();
        const phoneRepository = PhoneRepository();

        const builder = userRepository.createQueryBuilder('customers');
        builder.select(['customers'])
        builder.leftJoin('customers.roles', 'roles')
        builder.where("roles.name IS NULL or roles.name = ' '")
        builder.leftJoinAndSelect('customers.phones', 'phones')
        builder.leftJoinAndSelect('customers.address', 'address')
        builder.where('customers.id = :s', { s: `${id}` })

        const customerToUpdate = await builder.getOne();

        if (!customerToUpdate) {
            throw new Error("MESSAGE:O cliente não foi encontrado");
        }

        const customerEmailAlreadyExists = await userRepository.findOne({
            email
        });

        if (customerEmailAlreadyExists && customerEmailAlreadyExists.email !== customerToUpdate.email) {
            throw new Error("STATUS:400 MESSAGE:Email já cadastrado");
        }


        if (cpf) {
            const cpfAlreadyExists = await userRepository.findOne({
                cpf,
            });

            //verify if cpf already exists and if isn't the same
            if (cpfAlreadyExists && cpfAlreadyExists.cpf !== customerToUpdate.cpf) {
                throw new Error("MESSAGE:Cpf já cadastrado");
            }
        }

        const passwordHash = await hash(password, 8)

        const customer = {
            id,
            avatar,
            name,
            surname,
            email,
            password: passwordHash,
            cpf,
            birth_date,
        };

        const resCustomer = await userRepository.save(customer);

        const phonesTo = phones?.map(phone => {
            return phoneRepository.create({
                ...phone,
                user: customer
            })
        })

        phonesTo?.forEach(async phone => {
            try {
                await phoneRepository.save(phone);
            } catch (error) {

            }

        })

        const addressTo = addressRepository.create({
            ...address,
            user: customer
        })

        await addressRepository.save(addressTo)

        delete resCustomer.password

        return resCustomer
    }

    async delete(id: string) {
        const userRepository = UserRepository();

        const builder = userRepository.createQueryBuilder('customers');
        builder.select(['customers'])
        builder.leftJoin('customers.roles', 'roles')
        builder.where("roles.name IS NULL or roles.name = ' '")
        builder.leftJoinAndSelect('customers.phones', 'phones')
        builder.leftJoinAndSelect('customers.address', 'address')
        builder.where('customers.id = :s', { s: `${id}` })

        const customer = await builder.getOne();

        if (!customer) {
            throw new Error("MESSAGE:O cliente não foi encontrado");
        }

        await userRepository.softDelete(id)

        return;
    }
}