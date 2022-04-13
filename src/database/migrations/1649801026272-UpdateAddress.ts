import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdateAddress1649801026272 implements MigrationInterface {
    name = 'UpdateAddress1649801026272'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`addresses\` CHANGE \`alias\` \`alias\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`addresses\` CHANGE \`alias\` \`alias\` varchar(255) NOT NULL`);
    }

}
