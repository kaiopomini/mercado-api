import { Request } from "express-serve-static-core";
import { Product } from "../../entities/Product";

import { ProductRepository } from "../../repositories";

interface IProductRequest {
    name: string;
    description: string;
    price: number;
    gtin_code: string;

}

interface IProductPaginatedResponse {
    data: Product[];
    total: number;
    page: number;
    per_page: number;
    last_page: number;
}

export class ProductServices {
    async create({ name, description, price, gtin_code }: IProductRequest): Promise<Product> {
        const productRepository = ProductRepository();

        const productAlreadyExists = await productRepository.findOne({
            gtin_code
        });

        if (productAlreadyExists) {
            throw new Error("O produto já existe");
        }

        const product = productRepository.create({
            name,
            description,
            price,
            gtin_code,
        });

        const resProduct = await productRepository.save(product);

        return resProduct
    }

    async getAll(request: Request): Promise<IProductPaginatedResponse> {
        const productRepository = ProductRepository();

        const builder = productRepository.createQueryBuilder('products');

        // search
        const { search } = request.query;
        if (search) {
            builder.where('products.name LIKE :s OR products.description LIKE :s', { s: `%${search}%` })
        }

        // sort
        const sort: any = request.query.sort;
        if (sort) {
            builder.orderBy('products.price', sort.toUpperCase());
        }

        // paginating
        const page: number = parseInt(request.query.page as any) || 1;
        const perPage: number = parseInt(request.query.per_page as any) || 10;
        const total = await builder.getCount();

        builder.offset((page - 1) * perPage).limit(perPage);

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
        const product = await productRepository.findOne({
            id
        });

        if (!product) {
            throw new Error("O produto não encontrado");
        }

        return product;
    }
}