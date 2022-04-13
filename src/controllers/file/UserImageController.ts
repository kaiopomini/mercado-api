import {Request, Response } from 'express';
import { UserImageServices } from '../../services/file/UserImageServices';

export class UserImageController {
    async store(request: Request, response: Response) {

        const { file } = request;
    
        const userImageServices = new UserImageServices()

        const url = await userImageServices.upload(file)
        return response.status(201).json({
            success: true,
            payload: {url : url},
            message: "Upload de imagem realizado com sucesso."
        });
    }

    async index(request: Request, response: Response) {

        const userImageServices = new UserImageServices()

        return response.status(200).json({
            success: true,
            // payload: data,
            message: "Requisição realizada com sucesso.",
            // ...rest
        });
    }

    async show(request: Request, response: Response) {

        const userImageServices = new UserImageServices()

        return response.status(200).json({
            success: true,
            // payload: product,
            message: "Requisição realizada com sucesso.",
            
        });
    }


    async destroy(request: Request, response: Response) {

        const productImageServices = new UserImageServices()

        return response.status(200).json({
            success: true,
            message: "Produto excluído com sucesso.",
            
        });
    }
}