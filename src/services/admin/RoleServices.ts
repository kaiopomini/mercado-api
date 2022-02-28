import { Role } from "../../entities/Role";
import { RoleRepository } from "../../repositories";

interface IRoleRequest {
    name: string;
    description: string;
}

export class RoleServices {
    async create({ name, description } : IRoleRequest): Promise<Role>{
        const repo =  RoleRepository();

        if (await repo.findOne({ name })) {
            throw new Error("MESSAGE:Role já existe")
        }

        const role = repo.create({name, description});

        const resRole = await repo.save(role);

        return resRole;
    }
}