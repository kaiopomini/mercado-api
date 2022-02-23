import { Exclude } from "class-transformer";
import {Entity, Column, JoinTable, ManyToMany, OneToOne, JoinColumn } from "typeorm";

import { BaseEntity } from "./BaseEntity";
import { Permission } from "./Permission";
import { Role } from "./Role";
import { UserInfo } from "./UserInfo";

@Entity("users")
class User extends BaseEntity {
    
    @Column()
    name: string;

    @Column()
    surname: string;

    @Column({ default: false })
    deleted: Boolean;
    
    @Column({ default: false })
    valid_email: Boolean;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column({
      nullable: true,
    })
    avatar: string;

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