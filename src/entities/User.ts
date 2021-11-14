import { Exclude } from "class-transformer";
import {Entity, Column, JoinTable, ManyToMany } from "typeorm";

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
    deleted: Boolean;
    
    @Column({ default: false })
    valid_email: Boolean;

    @Column()
    email: string;

    @Column()
    @Exclude({ toPlainOnly: true })
    password: string;

    @Column()
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

    constructor() {
        super()
        if (!this.avatar) {
            this.avatar = 'default';
        }
    }
}

export { User };