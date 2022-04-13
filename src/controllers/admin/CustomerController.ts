import {Request, Response } from 'express';
import { User } from '../../entities/User';
import { CustomerServices } from '../../services/admin/CustomerServices';


export class CustomerController {
    async store(request: Request, response: Response) {

        const { name, surname, email, password, cpf, address, phones, birth_date, avatar  }  = request.body;

        const customerServices = new CustomerServices();

        const customer = await customerServices.create(address, {avatar, name, surname, email, password, cpf, phones, birth_date } as User);

        return response.status(201).json({
            success: true,
            payload: customer,
            message: "Usuário criado com sucesso."
        });
    }

    async index(request: Request, response: Response) {

        const customerServices = new CustomerServices();

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

        const customerServices = new CustomerServices();

        const customer = await customerServices.getOne(id);

        return response.status(200).json({
            success: true,
            payload: customer,
            message: "Requisição realizada com sucesso.",
            
        });
    }

    async update(request: Request, response: Response) {
        
        const { id } = request.params
        const { name, surname, email, password, cpf, address, phones, birth_date, avatar  }  = request.body;

        const customerServices = new CustomerServices();

        const customer = await customerServices.update(address, { id, avatar, name, surname, email, password, cpf, phones, birth_date } as User);

        return response.status(200).json({
            success: true,
            payload: customer,
            message: "Usuário atualizado com sucesso."
        });
    }

    async destroy(request: Request, response: Response) {

        const { id } = request.params

        const customerServices = new CustomerServices();

        const customer = await customerServices.delete(id);

        return response.status(200).json({
            success: true,
            message: "Usuário excluído com sucesso.",
            
        });
    }
}