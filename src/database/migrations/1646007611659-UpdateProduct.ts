import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdateProduct1646007611659 implements MigrationInterface {
    name = 'UpdateProduct1646007611659'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`products\` ADD \`quantity_type\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`products\` DROP COLUMN \`quantity_type\``);
    }

}
