import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty } from "class-validator";

@InputType()
export class CreateCampaignRequest {
  @Field()
  @IsNotEmpty({ message: "userId is not empty!" })
  userId: string;

  @Field()
  @IsNotEmpty({ message: "name is not empty" })
  name: string;
}
