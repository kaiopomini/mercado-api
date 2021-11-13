import { User } from "../../entities/User";
import { PermissionRepository, RoleRepository, UserRepository } from "../../repositories";

interface IUserACLRequest {
    user_id: string;
    roles: string[];
    permissions: string[];
}



export class AccessControlListServices {
    async create({ user_id, roles, permissions }: IUserACLRequest): Promise<User>{

        const repo = UserRepository();

        const user = await repo.findOne(user_id);

        if (!user) {
            throw new Error("Usuário não existe!");
        }

        const permissionsExists = await PermissionRepository().findByIds(permissions);

        const rolesExists = await RoleRepository().findByIds(roles);

        user.permissions = permissionsExists;
        user.roles = rolesExists;

        repo.save(user);
        
        delete user.password
        
        return user;
    }
}