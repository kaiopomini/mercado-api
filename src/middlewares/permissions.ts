import { NextFunction, Request, Response } from "express";

export function can(permissionsRoutes: string[]) {
    return async (request: Request, response: Response, next: NextFunction) => {
        const { user_permissions } = request;

        const permissionExists = user_permissions
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
        const { user_roles } = request;

        const roleExists = user_roles
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