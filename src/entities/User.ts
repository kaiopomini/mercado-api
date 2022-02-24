import { Exclude } from "class-transformer";
import {Entity, Column, JoinTable, ManyToMany, OneToOne, JoinColumn } from "typeorm";

import { BaseEntity } from "./BaseEntity";
import { Permission } from "./Permission";
import { Role } from "./Role";

@Entity("users")
class User extends BaseEntity {
    
    @Column()
    name: string;

    @Column()
    surname: string;
    
    @Column({ default: false })
    validated_email: Boolean;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column({
      nullable: true,
    })
    avatar: string;

    @Column({
      nullable: true,
    })
    cpf: string;

    @Column({
      nullable: true,
    })
    gender: string;

    @Column({
      nullable: true,
    })
    birth_date: Date;

    @ManyToMany(() => Role)
    @JoinTable({
      name: "users_roles",
      joinColumns: [{ name: "user_id" }],
      inverseJoinColumns: [{ name: "role_id" }],
    })
    roles: Role[];
  
    @ManyToMany(() => Permission)
    @JoinTable({
      name: "users_permissions",
      joinColumns: [{ name: "user_id" }],
      inverseJoinColumns: [{ name: "permission_id" }],
    })
    permissions: Permission[];

}

export { User };