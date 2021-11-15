import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUsersRoles1636326437357 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "users_roles",
        columns: [
          { name: "role_id", type: "varchar" },
          { name: "user_id", type: "varchar" },
        ],
        foreignKeys: [
          {
            columnNames: ["role_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "roles",
            name: "fk_roles_users",
            onDelete: "RESTRICT",
            onUpdate: "CASCADE",
          },
          {
            columnNames: ["user_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "users",
            name: "fk_users_roles",
            onDelete: "RESTRICT",
            onUpdate: "CASCADE",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("users_roles");
  }
}