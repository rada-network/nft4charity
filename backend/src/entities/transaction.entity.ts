import { Field, ObjectType } from "@nestjs/graphql";
import { Expose, plainToClass } from "class-transformer";
import { uuidv4 } from "src/utils";
import { Column, Entity, ObjectIdColumn } from "typeorm";

const commonOptions = { nullable: true };

@Entity({ name: "transactions" })
@ObjectType()
export class Transaction {
  @Expose()
  @Field()
  @ObjectIdColumn()
  _id: string;

  @Column()
  @Expose()
  @Field()
  walletId: string;

  @Column()
  @Expose()
  @Column()
  amount?: number;

  @Column()
  @Expose()
  @Field()
  sourceAddress?: string;

  @Column()
  @Expose()
  @Field()
  transactionId: string;

  @Column({ ...commonOptions })
  @Expose()
  @Field({ ...commonOptions })
  startedAt?: Date;

  @Column({ ...commonOptions })
  @Expose()
  @Field({ ...commonOptions })
  endedAt?: Date;

  @Column()
  @Expose()
  @Field()
  createdAt: Date;

  @Column()
  @Expose()
  @Field()
  updatedAt: Date;

  constructor(transaction: Partial<Transaction>) {
    Object.assign(
      this,
      plainToClass(Transaction, transaction, {
        excludeExtraneousValues: true,
      }),
    );

    this._id = this._id || uuidv4();
    this.createdAt = this.createdAt || new Date();
    this.updatedAt = new Date();
  }
}
