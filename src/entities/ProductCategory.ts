import { Entity, Column, ManyToMany, JoinTable } from "typeorm";
import { BaseEntity } from "./BaseEntity";
import { Product } from "./Product";

@Entity("products_categories")
export class ProductCategory extends BaseEntity {
  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  image: string;

  @Column({
    default: false
  })
  active: boolean;

  @ManyToMany(() => Product)
  @JoinTable({
    name: "products_products_categories",
    joinColumns: [{ name: "category_id" }],
    inverseJoinColumns: [{ name: "product_id" }],
  })
  products: Product[];

  constructor() {
    super()
    if (!this.image) {
      this.image = 'default';
    }
    if (!this.active) {
      this.active = false;
    }

  }

}