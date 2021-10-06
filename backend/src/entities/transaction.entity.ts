import { Field, ObjectType } from "@nestjs/graphql";
import { Expose, plainToClass } from "class-transformer";
import { Column, Entity, ObjectIdColumn } from "typeorm";

@Entity({ name: "transactions" })
@ObjectType()
export class Transaction {
  @Expose()
  @Field()
  @ObjectIdColumn()
  _id: string;

  @Column({ nullable: true })
  @Expose()
  @Field({ nullable: true })
  sourceAddress?: string;

  @Column()
  @Expose()
  @Field()
  walletId: string;

  @Column({ nullable: true })
  @Expose()
  @Field({ nullable: true })
  description?: string;

  @Column({ nullable: true })
  @Expose()
  @Field({ nullable: true })
  currency?: string;

  @Column()
  @Expose()
  @Field()
  amount: number;

  @Column({ nullable: true })
  @Expose()
  @Field({ nullable: true })
  status?: string;

  @Column({ nullable: true })
  @Expose()
  @Field({ nullable: true })
  networkFee?: number;

  @Column()
  @Expose()
  @Field()
  transactionId: string;

  @Column()
  @Expose()
  @Field()
  createdAt: Date;

  constructor(transaction: Partial<Transaction>) {
    Object.assign(
      this,
      plainToClass(Transaction, transaction, {
        excludeExtraneousValues: true,
      }),
    );

    this.createdAt = this.createdAt || new Date();
  }
}
