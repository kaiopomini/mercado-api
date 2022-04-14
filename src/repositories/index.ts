import { Role } from "../entities/Role";
import { User } from "../entities/User";
import { getCustomRepository, getRepository } from "typeorm";
import { Product } from "../entities/Product";
import { Permission } from "../entities/Permission";

import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { Phone } from "../entities/Phone";
import { Address } from "../entities/Address";
import { ProductCategory } from "../entities/ProductCategory";

@EntityRepository(User)
class UserRepositoryClass extends BaseRepository<User> {}
export const UserRepository = () => {
  return getCustomRepository(UserRepositoryClass);
};

@EntityRepository(Role)
class RoleRepositoryClass extends BaseRepository<Role> {}
export const RoleRepository = () => {
  return getCustomRepository(RoleRepositoryClass);
};

@EntityRepository(Permission)
class PermissionRepositoryClass extends BaseRepository<Permission> {}
export const PermissionRepository = () => {
  return getCustomRepository(PermissionRepositoryClass);
};

@EntityRepository(Product)
class ProductRepositoryClass extends BaseRepository<Product> {}
export const ProductRepository = () => {
  return getCustomRepository(ProductRepositoryClass);
};

@EntityRepository(ProductCategory)
class ProductCategoryRepositoryClass extends BaseRepository<ProductCategory> {}
export const ProductCategoryRepository = () => {
  return getCustomRepository(ProductCategoryRepositoryClass);
};

@EntityRepository(Phone)
class PhoneRepositoryClass extends BaseRepository<Phone> {}
export const PhoneRepository = () => {
  return getCustomRepository(PhoneRepositoryClass);
};

@EntityRepository(Address)
class AddressRepositoryClass extends BaseRepository<Address> {}
export const AddressRepository = () => {
  return getCustomRepository(AddressRepositoryClass);
};
