import { ObjectType } from "@nestjs/graphql";
import { BasePaginationResponse } from "../../common";
import { Transaction } from "../../entities";

@ObjectType()
export class PaginatedTransaction extends BasePaginationResponse(Transaction) {}
