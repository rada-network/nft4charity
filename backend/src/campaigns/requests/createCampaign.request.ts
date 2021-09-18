import { IsInt, IsNotEmpty } from "class-validator";

export class CreateCampaignRequest {
  @IsInt({ message: "userId must be an integer!" })
  userId: number;

  @IsNotEmpty({ message: "name is not empty" })
  name: string;
}
