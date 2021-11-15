import {Request, Response } from 'express';
import { PermissionServices } from '../../services/admin/PermissionServices';

export class PermissionController {
    async store(request: Request, response: Response) {

        const { name, description } = request.body;

        const permissionServices = new PermissionServices();

        const permission = await permissionServices.create({ name, description });

        return response.status(201).json({
            success: true,
            payload: permission,
            message: "Permissão criada com sucesso."
        });
    }
}