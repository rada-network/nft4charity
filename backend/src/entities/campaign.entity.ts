import { Field, ObjectType } from "@nestjs/graphql";
import { Expose, plainToClass } from "class-transformer";
import { uuidv4 } from "src/utils";
import { Column, Entity, ObjectIdColumn } from "typeorm";

const commonOptions = { nullable: true };

@Entity({ name: "campaigns" })
@ObjectType()
export class Campaign {
  @Expose()
  @Field()
  @ObjectIdColumn()
  _id: string;

  @Column()
  @Expose()
  @Field()
  name: string;

  @Column({ ...commonOptions })
  @Expose()
  @Field({ ...commonOptions })
  description?: string;

  @Column({ ...commonOptions })
  @Expose()
  @Field({ ...commonOptions })
  goal?: number;

  @Column({ ...commonOptions })
  @Expose()
  @Field({ ...commonOptions })
  startedAt?: Date;

  @Column({ ...commonOptions })
  @Expose()
  @Field({ ...commonOptions })
  endedAt?: Date;

  @Column()
  @Expose()
  @Field()
  createdAt: Date;

  @Column()
  @Expose()
  @Field()
  updatedAt: Date;

  constructor(campaign: Partial<Campaign>) {
    Object.assign(
      this,
      plainToClass(Campaign, campaign, {
        excludeExtraneousValues: true,
      }),
    );

    this._id = this._id || uuidv4();
    this.createdAt = this.createdAt || new Date();
    this.updatedAt = new Date();
  }
}
