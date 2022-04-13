import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdateAddressAndRelationship1649775144554 implements MigrationInterface {
    name = 'UpdateAddressAndRelationship1649775144554'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`addresses\` DROP FOREIGN KEY \`FK_16aac8a9f6f9c1dd6bcb75ec023\``);
        await queryRunner.query(`DROP INDEX \`REL_16aac8a9f6f9c1dd6bcb75ec02\` ON \`addresses\``);
        await queryRunner.query(`ALTER TABLE \`addresses\` ADD \`alias\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`addresses\` DROP COLUMN \`alias\``);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_16aac8a9f6f9c1dd6bcb75ec02\` ON \`addresses\` (\`user_id\`)`);
        await queryRunner.query(`ALTER TABLE \`addresses\` ADD CONSTRAINT \`FK_16aac8a9f6f9c1dd6bcb75ec023\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
