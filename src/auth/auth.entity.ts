import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()

export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    username: string;

    @Column()
    password: string;

    @Column({default: null})
    firstname: string;

    @Column({default: null})
    lastname: string;

    @Column({default: null})
    age: string;

}