import {MigrationInterface, QueryRunner} from "typeorm";

export class CreatePhonesAndRelationUser1645791064029 implements MigrationInterface {
    name = 'CreatePhonesAndRelationUser1645791064029'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`phones\` (\`id\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`country_code\` varchar(255) NOT NULL DEFAULT '+55', \`phone_number\` varchar(255) NOT NULL, \`is_primary\` tinyint NOT NULL DEFAULT 0, \`is_whatsapp\` tinyint NOT NULL DEFAULT 0, \`user_id\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`phones\` ADD CONSTRAINT \`FK_0c650d6af3574662fad5d2a3ef2\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`phones\` DROP FOREIGN KEY \`FK_0c650d6af3574662fad5d2a3ef2\``);
        await queryRunner.query(`DROP TABLE \`phones\``);
    }

}
