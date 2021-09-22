import { Field, ObjectType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@ObjectType()
@Schema()
export class Campaign extends Document {
  @Prop({ required: true })
  userId: string;

  @Field()
  @Prop({ required: true })
  name: string;

  @Field()
  @Prop({ required: true })
  startedAt: Date;

  @Field()
  @Prop({ required: true })
  endedAt: Date;
}

export const CampaignSchema = SchemaFactory.createForClass(Campaign);
