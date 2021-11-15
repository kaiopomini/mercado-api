import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateProducts1636326437359 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "products",
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
                        name: "gtin_code",
                        type: "varchar",
                        isUnique: true,
                    },
                    {
                        name: "description",
                        type: "varchar",
                    },
                    {
                        name: "price",
                        type: "real",
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
        await queryRunner.dropTable("products");
    }
}