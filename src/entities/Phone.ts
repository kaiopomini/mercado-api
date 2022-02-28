import { Exclude } from "class-transformer";
import {Entity, Column, JoinTable, ManyToMany, OneToOne, JoinColumn, ManyToOne } from "typeorm";

import { BaseEntity } from "./BaseEntity";
import { User } from "./User";

@Entity("phones")
class Phone extends BaseEntity {
    
    @Column({
      default: '+55'
    })
    country_code: string;

    @Column()
    phone_number: string;
    
    @Column({ default: false })
    is_primary: Boolean;

    @Column({ default: false })
    is_whatsapp: Boolean;

    @Column()
    user_id: string;
   
    @ManyToOne(type => User)
    @JoinColumn({name: 'user_id', referencedColumnName: 'id'})
    user: User;
    
}

export { Phone };