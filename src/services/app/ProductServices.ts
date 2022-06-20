import { Request } from "express-serve-static-core";
import { Product } from "../../entities/Product";

import { ProductRepository } from "../../repositories";
interface IProductPaginatedResponse {
  data: Product[];
  total: number;
  page: number;
  per_page: number;
  last_page: number;
}

export class ProductServices {
  

  async getAll(request: Request): Promise<IProductPaginatedResponse> {
    const productRepository = ProductRepository();

    const builder = productRepository.createQueryBuilder("products");
    builder.where("products.active = :s", { s: true });

    // search
    const { search } = request.query;

    // busca no codigo de barras quando é digitado apenas numeros
    if (search) {
      builder.andWhere("products.name LIKE :s2", {
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

    data.forEach((product) => delete product.base_price)

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

      if (!product || !product.active) {
        throw new Error("MESSAGE:O produto não foi encontrado");
      }
      
      
      delete product.base_price;
  
      return product;
   
  }

  
}
