import { Request, Response } from "express";
import { RolePermissionServices } from "../../services/admin/RolePermissionServices";

export class RolePermissionController {
  async store(request: Request, response: Response) {
    const { role_id } = request.params;
    const { permissions } = request.body;

    const rolePermissionServices = new RolePermissionServices();

    const result = await rolePermissionServices.create({
      role_id,
      permissions,
    });

    return response.status(201).json({
        succes: true,
        payload: result,
        message: "Atribuição de permissões aos cargos realizado com sucesso."
    });
  }
}