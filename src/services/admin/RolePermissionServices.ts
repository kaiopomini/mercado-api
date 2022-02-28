import { Role } from "../../entities/Role";
import { PermissionRepository, RoleRepository } from "../../repositories";

interface IRolePermissionRequest {
  role_id: string;
  permissions: string[];
};

export class RolePermissionServices {
  async create({
    role_id,
    permissions,
  }: IRolePermissionRequest): Promise<Role > {
    const repo = RoleRepository();

    const role = await repo.findOne(role_id);

    if (!role) {
      throw new Error("MESSAGE:Role does not exists!");
    }

    const permissionsExists = await PermissionRepository().findByIds(
      permissions
    );

    role.permissions = permissionsExists;

    await repo.save(role);

    return role;
  }
}