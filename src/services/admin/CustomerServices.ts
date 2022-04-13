import { Request } from "express-serve-static-core";
import { hash } from "bcryptjs";
import {
  AddressRepository,
  PhoneRepository,
  UserRepository,
} from "../../repositories";
import { User } from "../../entities/User";
import { Transactional } from "typeorm-transactional-cls-hooked";
import { Address } from "../../entities/Address";
import { Phone } from "../../entities/Phone";

interface IUserPaginatedResponse {
  data: User[];
  total: number;
  page: number;
  per_page: number;
  last_page: number;
}

export class CustomerServices {
  @Transactional()
  async create(
    address: Address,
    { name, surname, email, password, cpf, birth_date, phones, avatar }: User
  ): Promise<User> {
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

      //create new phones
      const phonesTo = phones?.map((phone) => {
        return phoneRepository.create({
          ...phone,
          user,
        });
      });

      //save new phones
      const newPhones = Array<Phone>();
      await Promise.all(
        phonesTo?.map(async (phone) => {
          try {
            const newPhone = await phoneRepository.save(phone);
            delete newPhone.user;
            newPhones.push(newPhone);
          } catch (error) {}
        })
      );

      const newAddresses = Array<Address>();

      //create new address
      const addressesTo = addressRepository.create({
        ...address,
        user,
      });

      //save new address
      try {
        const newAddress = await addressRepository.save(addressesTo);
        delete newAddress.user;
        newAddresses.push(newAddress);
      } catch (error) {}

      delete newUser.password;

      return { ...newUser, phones: newPhones, addresses: newAddresses };
    } catch (error) {
      throw new Error(error);
    }
  }

  async getAll(request: Request): Promise<IUserPaginatedResponse> {
    const userRepository = UserRepository();

    const builder = userRepository.createQueryBuilder("customers");
    builder.select(["customers"]);
    builder.leftJoin("customers.roles", "roles");
    builder.where("roles.name IS NULL or roles.name = ' '");
    builder.leftJoinAndSelect("customers.phones", "phones");
    builder.leftJoinAndSelect("customers.addresses", "addresses");

    // search
    const { search } = request.query;

    // busca no codigo de barras quando é digitado apenas numeros
    if (search) {
      builder.where(
        'customers.id = :s OR concat(customers.name, " ", customers.surname) LIKE :s2 OR customers.email LIKE :s3',
        { s: `${search}`, s2: `%${search}%`, s3: `${search}%` }
      );
    }

    // sort
    const sort: any = request.query.sort;
    const orderBy: any = request.query.order_by;

    builder.orderBy(
      orderBy ? `customers.${orderBy}` : "customers.name",
      sort ? sort.toUpperCase() : "ASC"
    );

    // paginating
    const page: number = parseInt(request.query.page as any) || 1;
    const perPage: number = parseInt(request.query.per_page as any) || 10;
    const total = await builder.getCount();

    builder.skip(page * perPage - perPage).take(perPage);

    const data = await builder.getMany();

    data.forEach((customer) => {
      delete customer.password;
    });

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

    const builder = userRepository.createQueryBuilder("customers");
    builder.select(["customers"]);
    builder.leftJoin("customers.roles", "roles");
    builder.where("roles.name IS NULL or roles.name = ' '");
    builder.leftJoinAndSelect("customers.phones", "phones");
    builder.leftJoinAndSelect("customers.addresses", "addresses");
    builder.where("customers.id = :s", { s: `${id}` });

    const customer = await builder.getOne();

    if (!customer) {
      throw new Error("MESSAGE:O cliente não foi encontrado");
    }
    delete customer.password;

    return customer;
  }

  @Transactional()
  async update(
    address: Address,
    {
      id,
      name,
      surname,
      cpf,
      birth_date,
      phones,
      avatar,
      email,
      password,
    }: User
  ): Promise<User> {
    const userRepository = UserRepository();
    const addressRepository = AddressRepository();
    const phoneRepository = PhoneRepository();

    if (!email) {
      throw Error("MESSAGE:Email incorreto");
    }

    try {
      const builder = userRepository.createQueryBuilder("users");
      builder.select(["users"]);
      builder.leftJoin("users.roles", "roles");
      builder.where("roles.name IS NULL or roles.name = ' '");
      builder.leftJoinAndSelect("users.phones", "phones");
      builder.leftJoinAndSelect("users.addresses", "addresses");
      builder.where("users.id = :s", { s: `${id}` });

      const userToUpdate = await builder.getOne();

      if (!userToUpdate) {
        throw new Error("MESSAGE:O cliente não foi encontrado");
      }

      const emailAlreadyExists = await userRepository.findOne({
        email,
      });

      if (emailAlreadyExists && email !== userToUpdate.email) {
        throw new Error("MESSAGE:Email já cadastrado");
      }

      if (cpf) {
        const cpfAlreadyExists = await userRepository.findOne({
          cpf,
        });

        //verify if cpf already exists and if isn't the same
        if (cpfAlreadyExists && cpfAlreadyExists.cpf !== userToUpdate.cpf) {
          throw new Error("MESSAGE:Cpf já cadastrado");
        }
      }

      const user = {
        id,
        avatar,
        name,
        email,
        surname,
        cpf,
        birth_date,
      } as User;

      if (password) {
        const passwordHash = await hash(password, 8);
        user.password = passwordHash;
      }

      if (email) {
        user.validated_email = false;
      }

      const newUser = await userRepository.save(user);

      //find if have phones to delete
      Promise.all(
        userToUpdate.phones?.map(async (phone) => {
          let hasToDeletePhone = true;
          phones.forEach((newPhone, index) => {
            if (phone.phone_number === newPhone.phone_number) {
              hasToDeletePhone = false;
              phones.splice(index, 1);
            }
          });
          try {
            if (hasToDeletePhone) {
              await phoneRepository.softDelete(phone.id);
            }
          } catch (error) {
            throw error;
          }
        })
      );

      //create new phones
      const phonesTo = phones?.map((phone) => {
        return phoneRepository.create({
          ...phone,
          user,
        });
      });

      //save new phones
      const newPhones = Array<Phone>();
      await Promise.all(
        phonesTo?.map(async (phone) => {
          try {
            const newPhone = await phoneRepository.save(phone);
            delete newPhone.user;
            newPhones.push(newPhone);
          } catch (error) {}
        })
      );

      //find if have address to delete

      let hasToUpdateAddress = true;

      Promise.all(
        userToUpdate.addresses?.map(async (oldAddress) => {
          if (
            oldAddress.name === address.name &&
            oldAddress.number === address.number &&
            oldAddress.city === address.city &&
            oldAddress.federative_unity === address.federative_unity &&
            oldAddress.zip_code === address.zip_code
          ) {
            hasToUpdateAddress = false;
          } else {
            try {
              await addressRepository.softDelete(oldAddress.id);
            } catch (error) {
              throw error;
            }
          }
        })
      );

      const newAddresses = Array<Address>();

      if (hasToUpdateAddress) {
        //create new address
        const addressesTo = addressRepository.create({
          ...address,
          user,
        });

        //save new address
        try {
          const newAddress = await addressRepository.save(addressesTo);
          delete newAddress.user;
          newAddresses.push(newAddress);
        } catch (error) {}
      }

      delete newUser.password;

      return { ...newUser, phones: newPhones, addresses: newAddresses };
    } catch (error) {
      throw new Error(error);
    }
  }

  async delete(id: string) {
    const userRepository = UserRepository();

    const builder = userRepository.createQueryBuilder("customers");
    builder.select(["customers"]);
    builder.leftJoin("customers.roles", "roles");
    builder.where("roles.name IS NULL or roles.name = ' '");
    builder.where("customers.id = :s", { s: `${id}` });

    const customer = await builder.getOne();

    if (!customer) {
      throw new Error("MESSAGE:O cliente não foi encontrado");
    }

    await userRepository.softDelete(id);

    return;
  }
}
