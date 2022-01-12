import { Expose } from "class-transformer";
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

  @Column({ type: "enum", enum: CampaignMember, array: true })
  @Expose()
  @Field(() => [CampaignMember])
  roles: CampaignRole[];
}
