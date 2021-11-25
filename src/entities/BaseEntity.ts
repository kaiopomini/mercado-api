import { PrimaryColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from "typeorm";
import { v4 as uuid } from "uuid";

export class BaseEntity {
    @PrimaryColumn()
    readonly id: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;

    constructor() {
        if (!this.id) {
            this.id = uuid();
        }
    }
}