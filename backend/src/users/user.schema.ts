import { Field, ObjectType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
@ObjectType()
export class User extends Document {
  @Prop({ required: true })
  @Field()
  name: string;

  @Prop({ required: true })
  @Field()
  createdAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
