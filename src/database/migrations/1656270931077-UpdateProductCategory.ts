import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdateProductCategory1656270931077 implements MigrationInterface {
    name = 'UpdateProductCategory1656270931077'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`products_categories\` CHANGE \`description\` \`description\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`products_categories\` CHANGE \`description\` \`description\` varchar(255) NOT NULL`);
    }

}
