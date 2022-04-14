import {Request, Response } from 'express';
import { User } from '../../entities/User';
import { ProductCategoryServices } from '../../services/admin/ProductCategoryServices';


export class ProductCategoryController {
    async store(request: Request, response: Response) {

        const { name, description, image, active }  = request.body;

        const productCategoryServices = new ProductCategoryServices();

        const productCategory = await productCategoryServices.create({name, description, image, active});

        return response.status(201).json({
            success: true,
            payload: productCategory,
            message: "Categoria de produtos criada com sucesso."
        });
    }

    async index(request: Request, response: Response) {

        const productCategoryServices = new ProductCategoryServices();

        const {data, ...rest} = await productCategoryServices.getAll(request);

        return response.status(200).json({
            success: true,
            payload: data,
            message: "Requisição realizada com sucesso.",
            ...rest
        });
    }

    async show(request: Request, response: Response) {

        const { id } = request.params

        const productCategoryServices = new ProductCategoryServices();

        const customer = await productCategoryServices.getOne(id);

        return response.status(200).json({
            success: true,
            payload: customer,
            message: "Requisição realizada com sucesso.",
            
        });
    }

    async update(request: Request, response: Response) {
        
        const { id } = request.params
        const { name, description, image, active }  = request.body;

        const productCategoryServices = new ProductCategoryServices();

        const productCategory = await productCategoryServices.update({id, name, description, image, active});

        return response.status(200).json({
            success: true,
            payload: productCategory,
            message: "Categoria atualizado com sucesso."
        });
    }

    async destroy(request: Request, response: Response) {

        const { id } = request.params

        const productCategoryServices = new ProductCategoryServices();

        const productCategory = await productCategoryServices.delete(id);

        return response.status(200).json({
            success: true,
            message: "Usuário excluído com sucesso.",
            
        });
    }

    async labelsForInput(request: Request, response: Response) {

        const productCategoryServices = new ProductCategoryServices();

        const data = await productCategoryServices.getAllLabels();

        return response.status(200).json({
            success: true,
            payload: data,
            message: "Requisição realizada com sucesso.",
        });
    }

    async addProducts(request: Request, response: Response) {

        const { category_id, products_ids } = request.body;

        const productCategoryServices = new ProductCategoryServices();

        const data = await productCategoryServices.addProducts(category_id, products_ids);

        return response.status(200).json({
            success: true,
            payload: data,
            message: "Requisição realizada com sucesso.",
        });
    }

    async removeProducts(request: Request, response: Response) {

        const { category_id, products_ids } = request.body;

        const productCategoryServices = new ProductCategoryServices();

        const data = await productCategoryServices.removeProducts(category_id, products_ids);

        return response.status(200).json({
            success: true,
            payload: data,
            message: "Requisição realizada com sucesso.",
        });
    }
}