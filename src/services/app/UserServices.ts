import { compare, hash } from "bcryptjs";
import { Transactional } from "typeorm-transactional-cls-hooked";
import { Address } from "../../entities/Address";
import { Phone } from "../../entities/Phone";
import { User } from "../../entities/User";

import {
  AddressRepository,
  PhoneRepository,
  UserRepository,
} from "../../repositories";

interface IUserRequest {
  name: string;
  surname: string;
  email: string;
  password: string;
  phone: string;
}

export class UserServices {
  @Transactional()
  async create({
    name,
    surname,
    email,
    password,
    phone,
  }: IUserRequest): Promise<User> {
    const usersRepository = UserRepository();
    const phoneRepository = PhoneRepository();

    if (!email) {
      throw Error("MESSAGE:Email incorreto");
    }

    try {
      const userAlreadyExists = await usersRepository.findOne({
        email,
      });

      if (userAlreadyExists) {
        throw new Error("MESSAGE:O usuário já existe");
      }

      const passwordHash = await hash(password, 8);

      const user = usersRepository.create({
        name,
        surname,
        email,
        password: passwordHash,
      });

      const resUser = await usersRepository.save(user);

      const newPhone = phoneRepository.create({
        phone_number: phone,
        user: resUser,
      });

      await phoneRepository.save(newPhone);

      delete resUser.password;

      return resUser;
    } catch (error) {
      throw new Error(error);
    }
  }

  @Transactional()
  async update(
    address: Address,
    { id, name, surname, cpf, birth_date, phones, avatar }: User
  ): Promise<User> {
    const userRepository = UserRepository();
    const addressRepository = AddressRepository();
    const phoneRepository = PhoneRepository();

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
        surname,
        email: userToUpdate.email,
        password: userToUpdate.password,
        cpf,
        birth_date,
      };

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

  async updatePassword({ id, old_password, new_password }): Promise<void> {
    const userRepository = UserRepository();

    try {
      const user = await userRepository.findOneOrFail(id);

      const passwordMatch = await compare(old_password, user.password);

      if (!passwordMatch) {
        throw new Error("MESSAGE:Senha incorreta");
      }
      const passwordHash = await hash(new_password, 8);

      await userRepository.update(id, { password: passwordHash });
    } catch (error) {
      throw new Error("MESSAGE:Não foi possível alterar a senha");
    }
  }
}
