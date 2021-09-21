import { Field, ObjectType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
@ObjectType()
export class Campaign extends Document {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  @Field()
  name: string;

  @Prop({ required: true })
  @Field()
  startedAt: Date;

  @Prop({ required: true })
  @Field()
  endedAt: Date;
}

export const CampaignSchema = SchemaFactory.createForClass(Campaign);
