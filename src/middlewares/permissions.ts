import { NextFunction, Request, Response } from "express";
import { UserRepository } from "../repositories";


export function can(permissionsRoutes: string[]) {
    return async (request: Request, response: Response, next: NextFunction) => {
        const { user_id } = request;

        const user = await UserRepository()
            .findOne({
                where: { id: user_id },
                relations: ["permissions"]
            })

        if (!user) {
            return response.status(401).json({
                success: false,
                message: "Usuário não encontrado"
            })
        }

        const permissionExists = user.permissions
            .map(permission => permission.name)
            .some(permission => permissionsRoutes.includes(permission))

        if (!permissionExists) {
            return response.status(401).json({
                success: false,
                message: "Não autorizado"
            })
        }

        return next()
    }
}

export function is(rolesRoutes: string[]) {
    return async (request: Request, response: Response, next: NextFunction) => {
        const { user_id } = request;

        const user = await UserRepository()
            .findOne({
                where: { id: user_id },
                relations: ["roles"]
            })

        if (!user) {
            return response.status(401).json({
                success: false,
                message: "Usuário não encontrado"
            })
        }

        const roleExists = user.roles
            .map(role => role.name)
            .some(role => rolesRoutes.includes(role))

        if (!roleExists) {
            return response.status(401).json({
                success: false,
                message: "Não autorizado"
            })
        }

        return next()
    }
}