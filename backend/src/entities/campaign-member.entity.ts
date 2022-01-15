import { Expose, plainToClass } from "class-transformer";
import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Column, Entity, ObjectID, ObjectIdColumn } from "typeorm";
import { CampaignRole } from "src/common";

@Entity()
@ObjectType()
export class CampaignMember {
  @Expose()
  @Field(() => ID)
  @ObjectIdColumn()
  _id: ObjectID;

  @Column()
  @Expose()
  @Field()
  campaignId: string;

  @Column()
  @Expose()
  @Field()
  userId: string;

  @Column()
  @Expose()
  @Field(() => Boolean)
  isVerified: boolean;

  @Column()
  @Expose()
  @Field(() => Boolean)
  isPrivate: boolean;

  @Column({ type: "enum", enum: CampaignMember })
  @Expose()
  @Field(() => CampaignRole)
  role: CampaignRole;

  @Column()
  @Expose()
  @Field()
  createdAt: Date;

  @Column()
  @Expose()
  @Field()
  updatedAt: Date;

  constructor(member: Partial<CampaignMember>) {
    Object.assign(
      this,
      plainToClass(CampaignMember, member, {
        excludeExtraneousValues: true,
      }),
    );

    this.createdAt = this.createdAt || new Date();
    this.updatedAt = new Date();
  }
}
