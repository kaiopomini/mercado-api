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

  @Column({
    unique: true,
  })
  gtin_code: string;
  
}