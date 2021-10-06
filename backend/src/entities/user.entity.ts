import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Expose, plainToClass } from "class-transformer";
import { Column, Entity, ObjectID, ObjectIdColumn } from "typeorm";

@Entity({ name: "users" })
@ObjectType()
export class User {
  @Expose()
  @Field(() => ID)
  @ObjectIdColumn()
  _id: ObjectID;

  @Column()
  @Expose()
  @Field()
  firstName: string;

  @Column()
  @Expose()
  @Field()
  lastName: string;

  @Column()
  @Expose()
  @Field()
  email: string;

  @Column()
  @Expose()
  @Field()
  password: string;

  @Column()
  @Expose()
  @Field()
  createdAt: Date;

  @Column()
  @Expose()
  @Field()
  updatedAt: Date;

  constructor(user: Partial<User>) {
    Object.assign(
      this,
      plainToClass(User, user, {
        excludeExtraneousValues: true,
      }),
    );

    this.createdAt = this.createdAt || new Date();
    this.updatedAt = new Date();
  }
}
