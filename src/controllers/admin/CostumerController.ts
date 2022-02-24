import {Request, Response } from 'express';
import { CostumerServices } from '../../services/admin/CostumerServices';

export class CostumerController {
    async store(request: Request, response: Response) {

        const { name, surname, email, password, cpf, gender, birth_date } = request.body;

        const customerServices = new CostumerServices();

        const customer = await customerServices.create({ name, surname, email, password, cpf, gender, birth_date });

        return response.status(201).json({
            success: true,
            payload: customer,
            message: "Usuário criado com sucesso."
        });
    }

    async index(request: Request, response: Response) {

        const customerServices = new CostumerServices();

        const {data, ...rest} = await customerServices.getAll(request);

        return response.status(200).json({
            success: true,
            payload: data,
            message: "Requisição realizada com sucesso.",
            ...rest
        });
    }

    async show(request: Request, response: Response) {

        const { id } = request.params

        const customerServices = new CostumerServices();

        const customer = await customerServices.getOne(id);

        return response.status(200).json({
            success: true,
            payload: customer,
            message: "Requisição realizada com sucesso.",
            
        });
    }

    async update(request: Request, response: Response) {
        
        const { id } = request.params
        const { name, surname, email, password, cpf, gender, birth_date  } = request.body;

        const customerServices = new CostumerServices();

        const customer = await customerServices.update({ id, name, surname, email, password, cpf, gender, birth_date  });

        return response.status(200).json({
            success: true,
            payload: customer,
            message: "Usuário atualizado com sucesso."
        });
    }

    async destroy(request: Request, response: Response) {

        const { id } = request.params

        const customerServices = new CostumerServices();

        const customer = await customerServices.delete(id);

        return response.status(200).json({
            success: true,
            message: "Usuário excluído com sucesso.",
            
        });
    }
}