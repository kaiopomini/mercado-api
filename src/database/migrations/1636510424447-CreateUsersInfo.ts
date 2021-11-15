import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateUserInfo1636510424447 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "user_info",
                columns:[
                    {
                        name: "id",
                        type: "varchar",
                        isPrimary: true,
                        generationStrategy: 'uuid',
                    },
                    {
                        name: "user_id",
                        type: "varchar",
                    },
                    {
                        name: "cpf",
                        type: "varchar",
                    },
                    {
                        name: "gender",
                        type: "varchar",
                        isNullable: true
                    },
                    {
                        name: "birth_date",
                        type: "timestamp",
                        isNullable: true
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
                ],
                foreignKeys: [
                    {
                        name: "FKUserUser_info",
                        referencedTableName: "users",
                        referencedColumnNames: ["id"],
                        columnNames: ["user_id"],
                        onDelete: "RESTRICT",
                        onUpdate: "CASCADE",
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("user_info")
    }

}
