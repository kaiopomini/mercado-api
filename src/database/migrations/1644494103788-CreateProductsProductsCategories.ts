import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateProductsProductsCategories1644494103788 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
              name: "products_products_categories",
              columns: [
                { name: "product_id", type: "varchar" },
                { name: "category_id", type: "varchar" },
              ],
              foreignKeys: [
                {
                  columnNames: ["product_id"],
                  referencedColumnNames: ["id"],
                  referencedTableName: "products",
                  name: "fk_products_categories",
                  onDelete: "RESTRICT",
                  onUpdate: "CASCADE",
                },
                {
                  columnNames: ["category_id"],
                  referencedColumnNames: ["id"],
                  referencedTableName: "products_categories",
                  name: "fk_categories_products",
                  onDelete: "RESTRICT",
                  onUpdate: "CASCADE",
                },
              ],
            })
          );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("products_products_categories");
    }

}
