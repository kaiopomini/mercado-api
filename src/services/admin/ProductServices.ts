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
    async create({ name, description, price, gtin_code, active, base_price, image, controlled_inventory, quantity, quantity_type }: Product): Promise<Product> {
        const productRepository = ProductRepository();
        console.log(quantity_type)

        const productAlreadyExists = await productRepository.findOne({
            gtin_code
        });

        if (productAlreadyExists) {
            throw new Error("MESSAGE:O produto já existe");
        }

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
            quantity_type
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
            builder.addOrderBy('products.created_at', 'DESC')
        } else {
            builder.orderBy('products.name', 'ASC');
            builder.addOrderBy('products.created_at', 'DESC')
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
            throw new Error("MESSAGE:O produto não foi encontrado");
        }

        return product;
    }

    async update({ id, name, description, price, gtin_code, active, base_price, controlled_inventory, image, quantity, quantity_type }: Product): Promise<Product> {
        const productRepository = ProductRepository();
        console.log(quantity_type)

        const productToUpdate = await productRepository.findOne({
            id
        });

        if (!productToUpdate) {
            throw new Error("MESSAGE:O produto não foi encontrado");
        }
        
        const productAlreadyExists = await productRepository.findOne({
            gtin_code
        });

        if (productAlreadyExists && productAlreadyExists.gtin_code !== productToUpdate.gtin_code) {
            throw new Error("MESSAGE:O produto já existe");
        }

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
            quantity_type
        };

        const resProduct = await productRepository.save(product);

        return resProduct;
    }

    async delete(id: string) {
        const productRepository = ProductRepository();
        const product = await productRepository.findOne({
            id
        });

        if (!product) {
            throw new Error("MESSAGE:O produto não foi encontrado");
        }

        productRepository.delete(id)

        return;
    }
}