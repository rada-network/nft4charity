import { ObjectType } from "@nestjs/graphql";
import { BasePaginationResponse } from "src/common";
import { Transaction } from "src/entities";

@ObjectType()
export class PaginatedTransaction extends BasePaginationResponse(Transaction) {}
