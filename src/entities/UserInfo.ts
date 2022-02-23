import {Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, JoinColumn, OneToOne } from "typeorm";

import { BaseEntity } from "./BaseEntity";
import { User } from "./User";

@Entity("users_info")
export class UserInfo extends BaseEntity{

    @PrimaryColumn()
    readonly id: string;

    @OneToOne(type => User, user_info => UserInfo)
    @JoinColumn()
    user: string;

    @Column()
    cpf: string;

    @Column()
    gender: string;

    @Column()
    birth_date: Date;

}