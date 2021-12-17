import { Field, ObjectType } from "@nestjs/graphql";
import { Expose, plainToClass } from "class-transformer";
import { Column, Entity, ObjectIdColumn } from "typeorm";

@Entity({ name: "image" })
@ObjectType()
export class Image {
  @Expose()
  @Field()
  @ObjectIdColumn()
  _id: string;

  @Column()
  @Expose()
  @Field()
  url: string;

  @Column({ nullable: true })
  @Expose()
  @Field({ nullable: true })
  name?: string;

  @Column()
  @Expose()
  @Field()
  userId: string;

  @Column()
  @Expose()
  @Field()
  createdAt: Date;

  @Column()
  @Expose()
  @Field()
  updatedAt: Date;

  constructor(image: Partial<Image>) {
    Object.assign(
      this,
      plainToClass(Image, image, {
        excludeExtraneousValues: true,
      }),
    );

    this.createdAt = this.createdAt || new Date();
    this.updatedAt = new Date();
  }
}
