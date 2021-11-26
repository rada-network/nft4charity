import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Expose } from "class-transformer";
import { Entity, Column, ObjectIdColumn, ObjectID } from "typeorm";

@ObjectType()
export class NftMetaData {
  @Column()
  @Expose()
  @Field()
  folderId: string;

  @Column()
  @Expose()
  @Field()
  startNumber: string;

  @Column()
  @Expose()
  @Field()
  total: number;
}

@Entity()
@ObjectType()
export class CampaignNftMetaData {
  @Expose()
  @Field(() => ID)
  @ObjectIdColumn()
  _id: ObjectID;

  @Column()
  @Expose()
  @Field()
  campaignId: string;

  @Column(() => NftMetaData)
  @Expose()
  @Field()
  nftMetaData: NftMetaData;
}
