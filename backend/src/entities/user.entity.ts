import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Expose, plainToClass } from "class-transformer";
import { Column, Entity, ObjectID, ObjectIdColumn } from "typeorm";
import { ObjectID as ObjectIDConstructor } from "mongodb";
import { Role } from "src/common";

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

  @Column({ type: "enum", enum: Role, array: true, default: () => [Role.USER] })
  @Expose()
  @Field(() => [Role], { defaultValue: [Role.USER] })
  roles: Role[];

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

    this._id = (user && user._id) || this._id || new ObjectIDConstructor();
    this.roles = this.roles || [Role.USER];
    this.createdAt = this.createdAt || new Date();
    this.updatedAt = new Date();
  }
}
