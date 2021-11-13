import {Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, JoinColumn, OneToOne } from "typeorm";

import { BaseEntity } from "./BaseEntity";
import { User } from "./User";

@Entity("user_info")
export class UserInfo extends BaseEntity{

    @PrimaryColumn()
    readonly id: string;

    @Column()
    user_id: string;

    @JoinColumn({name: "user_id"})
    @OneToOne(() => User)
    user: User;

    @Column()
    cpf: string;

    @Column()
    gender: string;

    @Column()
    birth_date: Date;

}