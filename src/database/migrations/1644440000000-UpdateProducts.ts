import { Column, MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey } from "typeorm";

export class UpdateProducts1644440000000 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumns(
            'products',
            [
                new TableColumn({
                    name: 'base_price',
                    type: 'real'
                }),
                new TableColumn({
                    name: 'quantity',
                    type: 'int',
                    default: 0
                }),
                new TableColumn({
                    name: 'controlled_inventory',
                    type: 'boolean',
                    default: false
                }),

            ],

        );

    }

    public async down(queryRunner: QueryRunner): Promise<void> { 
        await queryRunner.dropColumn("products", "base_price");
        await queryRunner.dropColumn("products", "quantity");
        await queryRunner.dropColumn("products", "controlled_inventory");
    }

}
