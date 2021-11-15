import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUsers1636326437353 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "users",
                columns: [
                    {
                        name: "id",
                        type: "varchar",
                        isPrimary: true,
                        generationStrategy: 'uuid',
                    },
                    {
                        name: "name",
                        type: "varchar"
                    },
                    {
                        name: "surname",
                        type: "varchar"
                    },
                    {
                        name: "deleted",
                        type: "boolean",
                        default: false
                    },
                    {
                        name: "valid_email",
                        type: "boolean",
                        default: false
                    },
                    {
                        name: "avatar",
                        type: "varchar",
                        isNullable: true
                    },
                    {
                        name: "email",
                        type: "varchar",
                        isUnique: true
                    },
                    {
                        name: "password",
                        type: "varchar"
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()"
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
                
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("users")
    }

}
