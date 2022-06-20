import { Request, Response } from 'express';
import { ProductServices } from '../../services/app/ProductServices';

export class ProductController {
   
    async index(request: Request, response: Response) {

        const productServices = new ProductServices();

        const { data, ...rest } = await productServices.getAll(request);

        return response.status(200).json({
            success: true,
            payload: data,
            message: "Requisição realizada com sucesso.",
            ...rest
        });
    }

    async show(request: Request, response: Response) {

        const { id } = request.params

        const productServices = new ProductServices();

        const product = await productServices.getOne(id);

        return response.status(200).json({
            success: true,
            payload: product,
            message: "Requisição realizada com sucesso.",

        });
    }

}