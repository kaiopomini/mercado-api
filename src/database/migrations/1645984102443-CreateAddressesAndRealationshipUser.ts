import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateAddressesAndRealationshipUser1645984102443 implements MigrationInterface {
    name = 'CreateAddressesAndRealationshipUser1645984102443'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` ADD UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`)`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD UNIQUE INDEX \`IDX_230b925048540454c8b4c481e1\` (\`cpf\`)`);
        await queryRunner.query(`ALTER TABLE \`addresses\` ADD CONSTRAINT \`FK_16aac8a9f6f9c1dd6bcb75ec023\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`addresses\` DROP FOREIGN KEY \`FK_16aac8a9f6f9c1dd6bcb75ec023\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP INDEX \`IDX_230b925048540454c8b4c481e1\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\``);
    }

}
