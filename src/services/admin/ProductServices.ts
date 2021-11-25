import { Request } from "express-serve-static-core";
import { Product } from "../../entities/Product";

import { ProductRepository } from "../../repositories";
import { isNumeric } from "../../utils/numberFormat";

interface IProductRequest {
    name: string;
    price: number;
    gtin_code: string;
    description?: string;
    active?: boolean;
}

interface IProductPaginatedResponse {
    data: Product[];
    total: number;
    page: number;
    per_page: number;
    last_page: number;
}

interface IProductRequestUpdate {
    id: string;
    name: string;
    description: string;
    price: number;
    gtin_code: string;
    active: boolean;
}

export class ProductServices {
    async create({ name, description, price, gtin_code, active }: IProductRequest): Promise<Product> {
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
            active
        });

        const resProduct = await productRepository.save(product);

        return resProduct
    }

    async getAll(request: Request): Promise<IProductPaginatedResponse> {
        const productRepository = ProductRepository();

        const builder = productRepository.createQueryBuilder('products');

        // search
        const { search } = request.query;
        
        // busca no codigo de barras quando é digitado apenas numeros
        if (search) {
            builder.where('products.gtin_code LIKE :s OR products.name LIKE :s2', { s: `${search}`, s2: `%${search}%` })
        } 

        // sort
        const sort: any = request.query.sort;
        if (sort) {
            builder.orderBy('products.name', sort.toUpperCase());
            builder.addOrderBy('products.created_at', 'ASC')
        } else {
            builder.orderBy('products.name', 'ASC');
            builder.addOrderBy('products.created_at', 'ASC')
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

    async update({ id, name, description, price, gtin_code, active }: IProductRequestUpdate): Promise<any> {
        const productRepository = ProductRepository();

        const productToUpdate = await productRepository.findOne({
            id
        });

        if (!productToUpdate) {
            throw new Error("O produto não foi encontrado");
        }
        
        const productAlreadyExists = await productRepository.findOne({
            gtin_code
        });

        if (productAlreadyExists && productAlreadyExists.gtin_code !== productToUpdate.gtin_code) {
            throw new Error("O produto já existe");
        }

        const product = {
            name,
            description,
            price,
            gtin_code,
            active
        };

        const resProduct = await productRepository.update(id, product);

        console.log(resProduct)

        return product
    }

    async delete(id: string) {
        const productRepository = ProductRepository();
        const product = await productRepository.findOne({
            id
        });

        if (!product) {
            throw new Error("O produto não foi encontrado");
        }

        productRepository.delete(id)

        return;
    }
}