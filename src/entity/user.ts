import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";
import { ObjectType, Root } from "type-graphql";

@ObjectType()
@Entity()
export default class User extends BaseEntity {
  // @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id: string;

  // // @Field()
  @Column("varchar", { length: 255 })
  email: string;

  // @Field({ complexity: 3 })
  //   name(@Root() parent: User): string {
  //     return `${parent.firstName} ${parent.lastName}`;
  //   }

  @Column("text")
  password: string;

  @Column("bool", { default: false })
  confirmed: boolean;
}
