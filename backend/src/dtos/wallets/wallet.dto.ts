import { Expose } from "class-transformer";

export class WalletDto {
  @Expose()
  _id: string;

  @Expose()
  address: string;

  @Expose()
  balance: number;

  @Expose()
  currency: string;

  @Expose()
  userId: string;

  @Expose()
  campaignId: string;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}
