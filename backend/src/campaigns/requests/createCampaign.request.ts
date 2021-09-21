import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty } from "class-validator";

@InputType()
export class CreateCampaignRequest {
  @IsNotEmpty({ message: "userId is not empty!" })
  @Field()
  userId: string;

  @IsNotEmpty({ message: "name is not empty" })
  @Field()
  name: string;
}
