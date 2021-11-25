import { Entity, Column } from "typeorm";
import { BaseEntity } from "./BaseEntity";

@Entity("products")
export class Product extends BaseEntity {
  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  price: number;

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