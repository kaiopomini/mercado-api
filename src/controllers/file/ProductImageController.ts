import {Request, Response } from 'express';
import { ProductImageServices } from '../../services/file/ProductImageServices';

export class ProductImageController {
    async store(request: Request, response: Response) {

        const { file } = request;

    
        const productImageServices = new ProductImageServices()

        const url = await productImageServices.upload(file)
        return response.status(201).json({
            success: true,
            payload: {url : url},
            message: "Upload de imagem realizado com sucesso."
        });
    }

    async index(request: Request, response: Response) {

        const productImageServices = new ProductImageServices()

        return response.status(200).json({
            success: true,
            // payload: data,
            message: "Requisição realizada com sucesso.",
            // ...rest
        });
    }

    async show(request: Request, response: Response) {

        const productImageServices = new ProductImageServices()

        return response.status(200).json({
            success: true,
            // payload: product,
            message: "Requisição realizada com sucesso.",
            
        });
    }


    async destroy(request: Request, response: Response) {

        const productImageServices = new ProductImageServices()

        return response.status(200).json({
            success: true,
            message: "Produto excluído com sucesso.",
            
        });
    }
}