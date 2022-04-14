import {Request, Response } from 'express';
import { ImageServices } from '../../services/file/ImageServices';

export class ProductCategoryImageController {
    async store(request: Request, response: Response) {

        const { file } = request;
    
        const imageServices = new ImageServices();

        const url = await imageServices.upload(file, 'products-categories')

        return response.status(201).json({
            success: true,
            payload: {url : url},
            message: "Upload de imagem realizado com sucesso."
        });
    }

    async index(request: Request, response: Response) {

        const imageServices = new ImageServices();

        return response.status(200).json({
            success: true,
            // payload: data,
            message: "Requisição realizada com sucesso.",
            // ...rest
        });
    }

    async show(request: Request, response: Response) {

        const imageServices = new ImageServices();

        return response.status(200).json({
            success: true,
            // payload: product,
            message: "Requisição realizada com sucesso.",
            
        });
    }


    async destroy(request: Request, response: Response) {

        const imageServices = new ImageServices();

        return response.status(200).json({
            success: true,
            message: "Produto excluído com sucesso.",
            
        });
    }
}