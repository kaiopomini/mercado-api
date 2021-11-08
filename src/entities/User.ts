import {Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuid} from 'uuid'

@Entity("users")
class User {
    @PrimaryColumn()
    readonly id: string;

    @Column()
    name: string;

    @Column()
    surname: string;

    @Column()
    status: Number;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    avatar: string

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    constructor() {
        if(!this.id) {
            this.id =  uuid();
        }
    }

}

export { User };