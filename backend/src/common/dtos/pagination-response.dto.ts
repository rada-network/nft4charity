import { Type } from "@nestjs/common";
import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType("PaginationMeta")
export class PaginationMeta {
  @Field(() => Int)
  limit: number;

  @Field(() => Int)
  offset: number;

  @Field(() => Int)
  total: number;
}
export interface PaginationType<T> {
  data: T[];
  meta: PaginationMeta;
}

export function BasePaginationResponse<T>(
  classRef: Type<T>,
): Type<PaginationType<T>> {
  @ObjectType({ isAbstract: true })
  abstract class PaginatedType implements PaginationType<T> {
    @Field(() => [classRef], { nullable: true })
    data: T[];

    @Field(() => PaginationMeta)
    meta: PaginationMeta;
  }
  return PaginatedType as Type<PaginationType<T>>;
}
