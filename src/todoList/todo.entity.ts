import { BaseEntity } from "src/Entity/base.entity";
import {Column, Entity } from "typeorm";

@Entity()

export class Todo extends BaseEntity {

    @Column()
    tittle: string;

    @Column({default: false})
    completed: boolean;

    @Column({default: false})
    isPinned: boolean;

    @Column()
    user_id: number;

    @Column()
    order: number

    @Column({default: false})
    isHiddened: boolean
}