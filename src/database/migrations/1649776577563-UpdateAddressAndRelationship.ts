import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdateAddressAndRelationship1649776577563 implements MigrationInterface {
    name = 'UpdateAddressAndRelationship1649776577563'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`FK_16aac8a9f6f9c1dd6bcb75ec023\` ON \`addresses\``);
        await queryRunner.query(`ALTER TABLE \`addresses\` ADD CONSTRAINT \`FK_16aac8a9f6f9c1dd6bcb75ec023\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`addresses\` DROP FOREIGN KEY \`FK_16aac8a9f6f9c1dd6bcb75ec023\``);
        await queryRunner.query(`CREATE INDEX \`FK_16aac8a9f6f9c1dd6bcb75ec023\` ON \`addresses\` (\`user_id\`)`);
    }

}
