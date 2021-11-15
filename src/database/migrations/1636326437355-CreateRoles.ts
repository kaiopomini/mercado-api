import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateRoles1636326437355 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "roles",
        columns: [
          {
            name: "id",
            type: "varchar",
            isPrimary: true,
            generationStrategy: 'uuid',
          },
          {
            name: "name",
            type: "varchar",
          },
          {
            name: "description",
            type: "varchar",
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "now()"
          },
          {
            name: "deleted_at",
            type: "timestamp",
            isNullable: true,
            default: null
          }
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("roles");
  }
}