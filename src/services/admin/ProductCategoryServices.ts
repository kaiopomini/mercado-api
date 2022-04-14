import { Request } from "express-serve-static-core";
import {
  ProductCategoryRepository,
  ProductRepository,
} from "../../repositories";
import { Transactional } from "typeorm-transactional-cls-hooked";
import { ProductCategory } from "../../entities/ProductCategory";
import { Product } from "../../entities/Product";

interface IProductCategoryPaginatedResponse {
  data: ProductCategory[];
  total: number;
  page: number;
  per_page: number;
  last_page: number;
}

interface IProductCategoryLabelsResponse {
  id: string;
  name: string;
}

export class ProductCategoryServices {
  async create({ name, description, image, active }): Promise<ProductCategory> {
    const productCategoryRepository = ProductCategoryRepository();

    try {
      const productCategory = productCategoryRepository.create({
        name,
        description,
        image,
        active,
      });

      const newProductCategory = await productCategoryRepository.save(
        productCategory
      );

      return newProductCategory;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getAll(request: Request): Promise<IProductCategoryPaginatedResponse> {
    try {
      const productCategoryRepository = ProductCategoryRepository();

      const builder =
        productCategoryRepository.createQueryBuilder("categories");
      builder.select(["categories"]);

      // search
      const { search } = request.query;

      // busca no codigo de barras quando é digitado apenas numeros
      if (search) {
        builder.where("categories.id = :s OR categories.name LIKE :s2 ", {
          s: `${search}`,
          s2: `%${search}%`,
        });
      }

      // sort
      const sort: any = request.query.sort;
      const orderBy: any = request.query.order_by;

      builder.orderBy(
        orderBy ? `categories.${orderBy}` : "categories.name",
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
    } catch (error) {
      throw new Error(error);
    }
  }

  async getOne(id: string): Promise<ProductCategory> {
    try {
      const productCategoryRepository = ProductCategoryRepository();

      const builder =
        productCategoryRepository.createQueryBuilder("categories");
      builder.select(["categories"]);
      builder.leftJoinAndSelect("categories.products", "products");
      builder.where("categories.id = :s", { s: `${id}` });

      const category = await builder.getOne();

      if (!category) {
        throw new Error("MESSAGE:A categoria não foi encontrada");
      }

      return category;
    } catch (error) {
      throw new Error(error);
    }
  }

  async update({
    id,
    name,
    description,
    image,
    active,
  }): Promise<ProductCategory> {
    try {
      const productCategoryRepository = ProductCategoryRepository();

      const builder =
        productCategoryRepository.createQueryBuilder("categories");
      builder.select(["categories"]);
      builder.where("categories.id = :s", { s: `${id}` });

      const category = await builder.getOne();

      if (!category) {
        throw new Error("MESSAGE:A categoria não foi encontrada");
      }

      const categoryToUpdate = productCategoryRepository.create({
        id,
        name,
        description,
        image,
        active,
      });

      const newCategory = await productCategoryRepository.save(
        categoryToUpdate
      );

      return newCategory;
    } catch (error) {
      throw new Error(error);
    }
  }

  async delete(id: string) {
    try {
      const productCategoryRepository = ProductCategoryRepository();

      const builder =
        productCategoryRepository.createQueryBuilder("categories");
      builder.select(["categories"]);
      builder.where("categories.id = :s", { s: `${id}` });

      const category = await builder.getOne();

      if (!category) {
        throw new Error("MESSAGE:O cliente não foi encontrado");
      }

      await productCategoryRepository.softDelete(id);
      return;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getAllLabels(): Promise<Array<IProductCategoryLabelsResponse>> {
    try {
      const productCategoryRepository = ProductCategoryRepository();

      const builder =
        productCategoryRepository.createQueryBuilder("categories");
      builder.select(["categories"]);

      // sort
      builder.orderBy("categories.name", "ASC");

      const categories = await builder.getMany();

      const categoriesData = categories?.map((category) => {
        return { name: category.name, id: category.id };
      });

      return categoriesData;
    } catch (error) {
      throw new Error(error);
    }
  }

  async addProducts(
    category_id: string,
    products_ids: string[]
  ): Promise<Array<Product>> {
    try {
      const productCategoryRepository = ProductCategoryRepository();

      const builder =
        productCategoryRepository.createQueryBuilder("categories");
      builder.select(["categories"]);
      builder.leftJoinAndSelect("categories.products", "products");
      builder.where("categories.id = :s", { s: `${category_id}` });

      const category = await builder.getOne();

      const products = await ProductRepository().findByIds(products_ids);

      products.forEach((product) => {
        if (!category.products?.some((item) => item.id === product.id)) {
          category.products.push(product);
        }
      });

      await productCategoryRepository.save(category);

      return products;
    } catch (error) {}
  }

  async removeProducts(
    category_id: string,
    products_ids: string[]
  ): Promise<Array<Product>> {
    try {
      const productCategoryRepository = ProductCategoryRepository();

      const builder =
        productCategoryRepository.createQueryBuilder("categories");
      builder.select(["categories"]);
      builder.leftJoinAndSelect("categories.products", "products");
      builder.where("categories.id = :s", { s: `${category_id}` });

      const category = await builder.getOne();

      const productsToRemove = await ProductRepository().findByIds(
        products_ids
      );

      const removedProducts = Array<Product>();

      const products = category.products.filter(product => {
        let stayProduct = true;
        productsToRemove.forEach(item => {
          if (product.id === item.id) {
            stayProduct = false;
          }
        });

        !stayProduct && removedProducts.push(product);

        return stayProduct;
      });

      category.products = products;

      await productCategoryRepository.save(category);

      return removedProducts;
    } catch (error) {}
  }
}
