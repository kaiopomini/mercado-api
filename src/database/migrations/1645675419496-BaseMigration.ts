import {MigrationInterface, QueryRunner} from "typeorm";

export class BaseMigration1645675419496 implements MigrationInterface {
    name = 'BaseMigration1645675419496'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`permissions\` (\`id\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`roles\` (\`id\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`products_categories\` (\`id\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`image\` varchar(255) NOT NULL, \`active\` tinyint NOT NULL DEFAULT 0, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`products\` (\`id\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NULL, \`price\` int NOT NULL, \`base_price\` int NOT NULL, \`quantity\` int NOT NULL, \`controlled_inventory\` tinyint NOT NULL DEFAULT 0, \`image\` varchar(255) NULL, \`active\` tinyint NOT NULL DEFAULT 0, \`gtin_code\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_f28179f6a09c4ad19b3c4d071c\` (\`gtin_code\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`name\` varchar(255) NOT NULL, \`surname\` varchar(255) NOT NULL, \`valiteded_email\` tinyint NOT NULL DEFAULT 0, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`avatar\` varchar(255) NULL, \`cpf\` varchar(255) NULL, \`gender\` varchar(255) NULL, \`birth_date\` datetime NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`permissions_roles\` (\`role_id\` varchar(255) NOT NULL, \`permission_id\` varchar(255) NOT NULL, INDEX \`IDX_e08f6859eaac8cbf7f087f64e2\` (\`role_id\`), INDEX \`IDX_3309f5fa8d95935f0701027f2b\` (\`permission_id\`), PRIMARY KEY (\`role_id\`, \`permission_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`products_products_categories\` (\`category_id\` varchar(255) NOT NULL, \`product_id\` varchar(255) NOT NULL, INDEX \`IDX_8b220e3a143cdf12103ec047d5\` (\`category_id\`), INDEX \`IDX_4aa4b35c00f6e78a991fcccd71\` (\`product_id\`), PRIMARY KEY (\`category_id\`, \`product_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users_roles\` (\`user_id\` varchar(255) NOT NULL, \`role_id\` varchar(255) NOT NULL, INDEX \`IDX_e4435209df12bc1f001e536017\` (\`user_id\`), INDEX \`IDX_1cf664021f00b9cc1ff95e17de\` (\`role_id\`), PRIMARY KEY (\`user_id\`, \`role_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users_permissions\` (\`user_id\` varchar(255) NOT NULL, \`permission_id\` varchar(255) NOT NULL, INDEX \`IDX_4de7d0b175f702be3be5527002\` (\`user_id\`), INDEX \`IDX_b09b9a210c60f41ec7b453758e\` (\`permission_id\`), PRIMARY KEY (\`user_id\`, \`permission_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`permissions_roles\` ADD CONSTRAINT \`FK_e08f6859eaac8cbf7f087f64e2b\` FOREIGN KEY (\`role_id\`) REFERENCES \`roles\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`permissions_roles\` ADD CONSTRAINT \`FK_3309f5fa8d95935f0701027f2bd\` FOREIGN KEY (\`permission_id\`) REFERENCES \`permissions\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`products_products_categories\` ADD CONSTRAINT \`FK_8b220e3a143cdf12103ec047d5a\` FOREIGN KEY (\`category_id\`) REFERENCES \`products_categories\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`products_products_categories\` ADD CONSTRAINT \`FK_4aa4b35c00f6e78a991fcccd713\` FOREIGN KEY (\`product_id\`) REFERENCES \`products\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`users_roles\` ADD CONSTRAINT \`FK_e4435209df12bc1f001e5360174\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`users_roles\` ADD CONSTRAINT \`FK_1cf664021f00b9cc1ff95e17de4\` FOREIGN KEY (\`role_id\`) REFERENCES \`roles\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`users_permissions\` ADD CONSTRAINT \`FK_4de7d0b175f702be3be55270023\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`users_permissions\` ADD CONSTRAINT \`FK_b09b9a210c60f41ec7b453758e9\` FOREIGN KEY (\`permission_id\`) REFERENCES \`permissions\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users_permissions\` DROP FOREIGN KEY \`FK_b09b9a210c60f41ec7b453758e9\``);
        await queryRunner.query(`ALTER TABLE \`users_permissions\` DROP FOREIGN KEY \`FK_4de7d0b175f702be3be55270023\``);
        await queryRunner.query(`ALTER TABLE \`users_roles\` DROP FOREIGN KEY \`FK_1cf664021f00b9cc1ff95e17de4\``);
        await queryRunner.query(`ALTER TABLE \`users_roles\` DROP FOREIGN KEY \`FK_e4435209df12bc1f001e5360174\``);
        await queryRunner.query(`ALTER TABLE \`products_products_categories\` DROP FOREIGN KEY \`FK_4aa4b35c00f6e78a991fcccd713\``);
        await queryRunner.query(`ALTER TABLE \`products_products_categories\` DROP FOREIGN KEY \`FK_8b220e3a143cdf12103ec047d5a\``);
        await queryRunner.query(`ALTER TABLE \`permissions_roles\` DROP FOREIGN KEY \`FK_3309f5fa8d95935f0701027f2bd\``);
        await queryRunner.query(`ALTER TABLE \`permissions_roles\` DROP FOREIGN KEY \`FK_e08f6859eaac8cbf7f087f64e2b\``);
        await queryRunner.query(`DROP INDEX \`IDX_b09b9a210c60f41ec7b453758e\` ON \`users_permissions\``);
        await queryRunner.query(`DROP INDEX \`IDX_4de7d0b175f702be3be5527002\` ON \`users_permissions\``);
        await queryRunner.query(`DROP TABLE \`users_permissions\``);
        await queryRunner.query(`DROP INDEX \`IDX_1cf664021f00b9cc1ff95e17de\` ON \`users_roles\``);
        await queryRunner.query(`DROP INDEX \`IDX_e4435209df12bc1f001e536017\` ON \`users_roles\``);
        await queryRunner.query(`DROP TABLE \`users_roles\``);
        await queryRunner.query(`DROP INDEX \`IDX_4aa4b35c00f6e78a991fcccd71\` ON \`products_products_categories\``);
        await queryRunner.query(`DROP INDEX \`IDX_8b220e3a143cdf12103ec047d5\` ON \`products_products_categories\``);
        await queryRunner.query(`DROP TABLE \`products_products_categories\``);
        await queryRunner.query(`DROP INDEX \`IDX_3309f5fa8d95935f0701027f2b\` ON \`permissions_roles\``);
        await queryRunner.query(`DROP INDEX \`IDX_e08f6859eaac8cbf7f087f64e2\` ON \`permissions_roles\``);
        await queryRunner.query(`DROP TABLE \`permissions_roles\``);
        await queryRunner.query(`DROP TABLE \`users\``);
        await queryRunner.query(`DROP INDEX \`IDX_f28179f6a09c4ad19b3c4d071c\` ON \`products\``);
        await queryRunner.query(`DROP TABLE \`products\``);
        await queryRunner.query(`DROP TABLE \`products_categories\``);
        await queryRunner.query(`DROP TABLE \`roles\``);
        await queryRunner.query(`DROP TABLE \`permissions\``);
    }

}
