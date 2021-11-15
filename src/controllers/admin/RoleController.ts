import {Request, Response } from 'express';
import { RoleServices } from '../../services/admin/RoleServices';

export class RoleController {
    async store(request: Request, response: Response) {

        const { name, description } = request.body;

        const roleServices = new RoleServices();

        const role = await roleServices.create({ name, description });

        return response.status(201).json({
            success: true,
            payload: role,
            message: "Cargo criado com sucesso."
        });
    }
}