import { ArgsType, Field, Int } from "@nestjs/graphql";
import { Transform } from "class-transformer";
import { IsNumber, IsOptional } from "class-validator";

@ArgsType()
export class PaginationParamsDto {
  @Field(() => Int, { nullable: true, defaultValue: 20 })
  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
  limit = 20;

  @Field(() => Int, { nullable: true, defaultValue: 0 })
  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
  offset = 0;
}
