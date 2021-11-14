import {Request, Response } from 'express';
import { ProductServices } from '../../services/admin/ProductServices';

export class ProductController {
    async store(request: Request, response: Response) {

        const { name, description, price, gtin_code } = request.body;

        const productServices = new ProductServices();

        const product = await productServices.create({ name, description, price, gtin_code });

        return response.status(201).json({
            succes: true,
            payload: product,
            message: "Produto criado com sucesso."
        });
    }

    async index(request: Request, response: Response) {

        const productServices = new ProductServices();

        const {data, ...rest} = await productServices.getAll(request);

        return response.status(200).json({
            succes: true,
            payload: data,
            message: "Requisição realizada com sucesso.",
            ...rest
        });
    }

    async show(request: Request, response: Response) {

        const { id } = request.params

        const productServices = new ProductServices();

        const produto = await productServices.getOne(id);

        return response.status(200).json({
            succes: true,
            payload: produto,
            message: "Requisição realizada com sucesso.",
            
        });
    }

    async update(request: Request, response: Response) {
        
        const { id } = request.params
        const { name, description, price, gtin_code } = request.body;

        const productServices = new ProductServices();

        const product = await productServices.update({ name, description, price, gtin_code, id });

        return response.status(201).json({
            succes: true,
            payload: product,
            message: "Produto atualizado com sucesso."
        });
    }

    async destroy(request: Request, response: Response) {

        const { id } = request.params

        const productServices = new ProductServices();

        const produto = await productServices.delete(id);

        return response.status(200).json({
            succes: true,
            message: "Produto excluído com sucesso.",
            
        });
    }
}