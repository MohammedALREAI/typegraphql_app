import {Entity, PrimaryGeneratedColumn, BaseEntity,Column} from "typeorm";
import { Field,ObjectType,ID } from "type-graphql";


@Entity()
export class User extends BaseEntity{
@Field(()=>ID)
    @PrimaryGeneratedColumn()
    id: number;
@Field(()=>String)
    @Column()
    firstName: string;
@Field(()=>String)
    @Column()
    lastName: string;
@Field(()=>String)
    @Column()
    email: string;
@Field(()=>String)
    @Column()
    password: String;

}
