import { Field, ObjectType } from "@nestjs/graphql";
import { Expose, plainToClass } from "class-transformer";
import { uuidv4 } from "src/utils";
import { Column, Entity, ObjectIdColumn } from "typeorm";

const commonOptions = { nullable: true };

@Entity({ name: "wallets" })
@ObjectType()
export class Wallet {
  @Expose()
  @Field()
  @ObjectIdColumn()
  _id: string;

  @Column()
  @Expose()
  @Field()
  address: string;

  @Column()
  @Expose()
  @Field()
  currency: string;

  @Column()
  @Expose()
  @Field()
  campaignId: string;

  @Column()
  @Expose()
  @Field()
  userId: string;

  @Column()
  @Expose()
  @Field()
  platform: string;

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

  constructor(wallet: Partial<Wallet>) {
    Object.assign(
      this,
      plainToClass(Wallet, wallet, {
        excludeExtraneousValues: true,
      }),
    );

    this._id = this._id || uuidv4();
    this.createdAt = this.createdAt || new Date();
    this.updatedAt = new Date();
  }
}
