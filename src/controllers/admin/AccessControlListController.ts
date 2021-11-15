import {Request, Response } from 'express';
import { AccessControlListServices } from '../../services/admin/AccessControlListServices';

export class AccessControlListController {
    async store(request: Request, response: Response) {

        const { permissions, roles, user_id } = request.body;

        const accessControlListServices = new AccessControlListServices();

        const accessControl = await accessControlListServices.create({ user_id, permissions, roles});

        return response.status(201).json({
            success: true,
            payload: accessControl,
            message: "Cargo criado com sucesso."
        });
    }
}