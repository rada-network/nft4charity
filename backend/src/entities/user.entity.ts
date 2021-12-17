import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Expose, plainToClass } from "class-transformer";
import { Column, Entity, ObjectID, ObjectIdColumn } from "typeorm";
import { Role } from "../common";

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
  @Field({ nullable: true })
  description?: string;

  @Column()
  @Expose()
  @Field({ nullable: true })
  facebookUrl?: string;

  @Column()
  @Expose()
  @Field({ nullable: true })
  tiwtterUrl?: string;

  @Column()
  @Expose()
  @Field({ nullable: true })
  youtubeUrl?: string;

  @Column()
  @Expose()
  @Field({ nullable: true })
  instagramUrl?: string;

  @Column()
  @Expose()
  @Field({ nullable: true })
  frontIdentifierUrl?: string;

  @Column()
  @Expose()
  @Field({ nullable: true })
  backIdentifierUrl?: string;

  @Column({ type: "bool", default: false })
  @Expose()
  @Field(() => Boolean, { defaultValue: false })
  isEmailVerified = false;

  @Column({ type: "datetime", default: null, nullable: true })
  @Expose()
  @Field({ defaultValue: null, nullable: true })
  emailVerifiedAt: Date = null;

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

    this.roles = this.roles || [Role.USER];
    this.createdAt = this.createdAt || new Date();
    this.updatedAt = new Date();
  }
}
