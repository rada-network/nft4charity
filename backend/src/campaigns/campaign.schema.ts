import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Campaign extends Document {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  startedAt: Date;

  @Prop({ required: true })
  endedAt: Date;
}

export const CampaignSchema = SchemaFactory.createForClass(Campaign);
