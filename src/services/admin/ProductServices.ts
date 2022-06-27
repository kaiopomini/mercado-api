import { Request } from "express-serve-static-core";
import { Product } from "../../entities/Product";

import {
  ProductCategoryRepository,
  ProductRepository,
} from "../../repositories";
interface IProductPaginatedResponse {
  data: Product[];
  total: number;
  page: number;
  per_page: number;
  last_page: number;
}
export class ProductServices {
  async create({
    name,
    description,
    price,
    gtin_code,
    active,
    base_price,
    image,
    controlled_inventory,
    quantity,
    quantity_type,
    categories,
  }: Product): Promise<Product> {
    const productRepository = ProductRepository();

    const productAlreadyExists = await productRepository.findOne({
      gtin_code,
    });

    if (productAlreadyExists) {
      throw new Error("MESSAGE:O produto já existe");
    }

    const productCategoryRepository = ProductCategoryRepository();
    const categoriesToAdd = await productCategoryRepository.findByIds(
      categories
    );

    const product = productRepository.create({
      name,
      description,
      price,
      gtin_code,
      active,
      base_price,
      image,
      controlled_inventory,
      quantity,
      quantity_type,
      categories: categoriesToAdd ? categoriesToAdd : [],
    });

    const resProduct = await productRepository.save(product);

    return resProduct;
  }

  async getAll(request: Request): Promise<IProductPaginatedResponse> {
    const productRepository = ProductRepository();

    const builder = productRepository.createQueryBuilder("products");

    // search
    const { search } = request.query;

    // busca no codigo de barras quando é digitado apenas numeros
    if (search) {
      builder.where("products.gtin_code LIKE :s OR products.name LIKE :s2", {
        s: `${search}`,
        s2: `%${search}%`,
      });
    }

    // sort
    const sort: any = request.query.sort;
    const orderBy: any = request.query.order_by;

    builder.orderBy(
      orderBy ? `products.${orderBy}` : "products.name",
      sort ? sort.toUpperCase() : "ASC"
    );

    // paginating
    const page: number = parseInt(request.query.page as any) || 1;
    const perPage: number = parseInt(request.query.per_page as any) || 10;
    const total = await builder.getCount();

    builder.skip(page * perPage - perPage).take(perPage);

    const data = await builder.getMany();

    const result = {
      data,
      total,
      page,
      per_page: perPage,
      last_page: Math.ceil(total / perPage),
    };

    return result;
  }

  async getOne(id: string): Promise<Product> {
    const productRepository = ProductRepository();

    const builder = productRepository.createQueryBuilder("products");
    builder.select(["products"]);
    builder.leftJoinAndSelect("products.categories", "categories");
    builder.where("products.id = :s", { s: `${id}` });

    const product = await builder.getOne();

    if (!product) {
      throw new Error("MESSAGE:O produto não foi encontrado");
    }

    return product;
  }

  async update({
    id,
    name,
    description,
    price,
    gtin_code,
    active,
    base_price,
    controlled_inventory,
    image,
    quantity,
    quantity_type,
    categories,
  }: Product): Promise<Product> {
    const productRepository = ProductRepository();

    const productToUpdate = await productRepository.findOne({
      id,
    });

    if (!productToUpdate) {
      throw new Error("MESSAGE:O produto não foi encontrado");
    }

    const productAlreadyExists = await productRepository.findOne({
      gtin_code,
    });

    if (
      productAlreadyExists &&
      productAlreadyExists.gtin_code !== productToUpdate.gtin_code
    ) {
      throw new Error("MESSAGE:O produto já existe");
    }

    const productCategoryRepository = ProductCategoryRepository();
    const categoriesToAdd = await productCategoryRepository.findByIds(
      categories
    );

    const product = {
      id,
      name,
      description,
      price,
      gtin_code,
      active,
      base_price,
      image,
      controlled_inventory,
      quantity,
      quantity_type,
      categories: categoriesToAdd ? categoriesToAdd : [],
    };

    const resProduct = await productRepository.save(product);

    return resProduct;
  }

  async delete(id: string) {
    const productRepository = ProductRepository();
    const product = await productRepository.findOne({
      id,
    });

    if (!product) {
      throw new Error("MESSAGE:O produto não foi encontrado");
    }

    productRepository.delete(id);

    return;
  }

  async getAllByCategory(request: Request): Promise<IProductPaginatedResponse> {
    const productRepository = ProductRepository();

    const builder = productRepository.createQueryBuilder("products");

    // search
    const { id } = request.params;
    const { search, filter } = request.query;

    builder
      .select("products")
      .leftJoinAndSelect("products.categories", "categories");

    switch (filter) {
      case "own":
        builder.where("categories.id = :id", { id });
        break;
      case "others":
        builder.where("categories.id != :id or categories.id is null", { id });
        break;
      default:
    }

    // busca no codigo de barras quando é digitado apenas numeros
    if (search) {
      builder.andWhere("products.gtin_code LIKE :s OR products.name LIKE :s2", {
        s: `${search}`,
        s2: `%${search}%`,
      });
    }

    // sort
    const sort: any = request.query.sort;
    const orderBy: any = request.query.order_by;

    builder.orderBy(
      orderBy ? `products.${orderBy}` : "products.name",
      sort ? sort.toUpperCase() : "ASC"
    );

    // paginating
    const page: number = parseInt(request.query.page as any) || 1;
    const perPage: number = parseInt(request.query.per_page as any) || 10;
    const total = await builder.getCount();

    builder.skip(page * perPage - perPage).take(perPage);

    const data = await builder.getMany();

    const result = {
      data,
      total,
      page,
      per_page: perPage,
      last_page: Math.ceil(total / perPage),
    };

    return result;
  }
}
