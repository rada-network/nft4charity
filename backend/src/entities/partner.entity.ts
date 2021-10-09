import { Field, ObjectType } from "@nestjs/graphql";
import { Expose, plainToClass } from "class-transformer";
import { Column, Entity, ObjectIdColumn } from "typeorm";

@Entity({ name: "partners" })
@ObjectType()
export class Partner {
  @Expose()
  @Field()
  @ObjectIdColumn()
  _id: string;

  @Column()
  @Expose()
  @Field()
  name: string;

  @Column({ nullable: true })
  @Expose()
  @Field({ nullable: true })
  description?: string;

  @Column()
  @Expose()
  @Field()
  logoUrl: string;

  @Column({ default: false })
  @Expose()
  @Field({ defaultValue: false })
  isActive: boolean;

  @Column()
  @Expose()
  @Field()
  createdAt: Date;

  @Column()
  @Expose()
  @Field()
  updatedAt: Date;

  @Column()
  @Expose()
  @Field()
  sequence: number;

  constructor(partner: Partial<Partner>) {
    Object.assign(
      this,
      plainToClass(Partner, partner, {
        excludeExtraneousValues: true,
      }),
    );

    this.createdAt = this.createdAt || new Date();
    this.updatedAt = new Date();
  }
}
