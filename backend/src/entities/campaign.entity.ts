import { CampaignType } from "../common/enums";
import { Field, ID, Int, ObjectType } from "@nestjs/graphql";
import { Expose, plainToClass } from "class-transformer";
import { Column, Entity, ObjectID, ObjectIdColumn } from "typeorm";

@Entity({ name: "campaigns" })
@ObjectType()
export class Campaign {
  @Expose()
  @Field(() => ID)
  @ObjectIdColumn()
  _id: ObjectID;

  @Column()
  @Expose()
  @Field()
  name: string;

  @Column({ nullable: true })
  @Expose()
  @Field({ nullable: true })
  description?: string;

  @Column({ nullable: true })
  @Expose()
  @Field(() => Int, { nullable: true })
  goal?: number;

  @Column({ nullable: true })
  @Expose()
  @Field({ nullable: true })
  startedAt?: Date;

  @Column({ nullable: true })
  @Expose()
  @Field({ nullable: true })
  endedAt?: Date;

  @Column({ nullable: true })
  @Expose()
  @Field({ nullable: true })
  coverImgUrl?: string;

  @Column({ nullable: true })
  @Expose()
  @Field({ nullable: true })
  thumbnailImgUrl?: string;

  @Column({
    default: () => CampaignType.FUND_RAISE,
    enum: CampaignType,
    type: "enum",
  })
  @Expose()
  @Field(() => CampaignType, { defaultValue: CampaignType.FUND_RAISE })
  type: CampaignType;

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
  userId: string;

  constructor(campaign: Partial<Campaign>) {
    Object.assign(
      this,
      plainToClass(Campaign, campaign, {
        excludeExtraneousValues: true,
      }),
    );

    this.createdAt = this.createdAt || new Date();
    this.updatedAt = new Date();
  }
}
