import {Entity, Column, JoinTable, ManyToMany, OneToOne, JoinColumn, ManyToOne } from "typeorm";

import { BaseEntity } from "./BaseEntity";
import { User } from "./User";

@Entity("addresses")
class Address extends BaseEntity {

    @Column({
      nullable: true
    })
    alias: string;
    
    @Column()
    name: string;

    @Column({
      nullable: true
    })
    number: string;
    
    @Column()
    zip_code: string;

    @Column()
    city: string;

    @Column()
    federative_unity: string;

    @Column({
      default: 'Brasil'
    })
    country: string;

    @Column()
    user_id: string;

    @ManyToOne(type => User)
    @JoinColumn({name: 'user_id', referencedColumnName: 'id'})
    user: User;
    
}

export { Address };