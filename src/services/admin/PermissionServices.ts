import { Permission } from "../../entities/Permission";
import { PermissionRepository } from "../../repositories";

interface IPermissionRequest {
    name: string;
    description: string;
}

export class PermissionServices {
    async create({ name, description } : IPermissionRequest): Promise<Permission>{
        const repo =  PermissionRepository();

        if (await repo.findOne({ name })) {
            throw new Error("MESSAGE:Permissão já existe")
        }

        const permission = repo.create({name, description});

        const resPermission = await repo.save(permission);

        return resPermission;
    }
}