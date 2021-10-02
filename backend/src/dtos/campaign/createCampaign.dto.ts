import {
  IsDate,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from "class-validator";

export default class CreateCampaignDto {
  @IsString()
  @Min(3)
  @Max(20)
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsOptional()
  goad?: number;

  @IsDate()
  @IsOptional()
  startedAt?: Date;

  @IsDate()
  @IsOptional()
  endedAt?: Date;
}
