import { Entity, Column, ManyToMany, JoinTable } from "typeorm";
import { BaseEntity } from "./BaseEntity";
import { ProductCategory } from "./ProductCategory";

@Entity("products")
export class Product extends BaseEntity {
  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column()
  base_price: number;

  @Column()
  quantity: number;

  @Column({
    default: false
  })
  controlled_inventory: boolean;

  @Column()
  image: string;

  @Column({
    default: false
  })
  active: boolean;

  @Column({
    unique: true,
  })
  gtin_code: string;

  @ManyToMany(() => ProductCategory)
  @JoinTable({
    name: "products_products_categories",
    joinColumns: [{ name: "product_id" }],
    inverseJoinColumns: [{ name: "category_id" }],
  })
  categories: ProductCategory[];

  constructor() {
    super()
    if (!this.image) {
      this.image = 'default';
    }
    if (!this.active) {
      this.active = false;
    }
    if (!this.quantity) {
      this.quantity = 0;
    }
    if (!this.controlled_inventory) {
      this.controlled_inventory = false;
    }

  }

}