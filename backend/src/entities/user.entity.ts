import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Expose, plainToClass } from "class-transformer";
import { uuidv4 } from "../utils";
import { Column, Entity, ObjectIdColumn } from "typeorm";

@ObjectType()
@Entity({
  name: "users",
})
export class User {
  @Expose()
  @Field()
  @ObjectIdColumn()
  _id: string;

  @Column()
  @Expose()
  @Field()
  name: string;

  @Column()
  @Expose()
  @Field((type) => Int) // eslint-disable-line
  createdAt: number;

  @Column()
  @Expose()
  @Field((type) => Int) // eslint-disable-line
  updatedAt: number;

  constructor(user: Partial<User>) {
    Object.assign(
      this,
      plainToClass(User, user, {
        excludeExtraneousValues: true,
      }),
    );

    this._id = this._id || uuidv4();
    this.createdAt = this.createdAt || +new Date();
    this.updatedAt = +new Date();
  }
}
