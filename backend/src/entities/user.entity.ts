import { Field, ObjectType } from "@nestjs/graphql";
import { Expose, plainToClass } from "class-transformer";
import { Column, Entity, ObjectIdColumn } from "typeorm";
import { uuidv4 } from "../utils";

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

    this._id = this._id || uuidv4();
    this.createdAt = this.createdAt || new Date();
    this.updatedAt = new Date();
  }
}
