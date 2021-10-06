import { Field, ObjectType } from "@nestjs/graphql";
import { Expose, plainToClass } from "class-transformer";
import { Column, Entity, ObjectIdColumn } from "typeorm";

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

  @Column({ nullable: true })
  @Expose()
  @Field({ nullable: true })
  currency?: string;

  @Column()
  @Expose()
  @Field()
  platform: string;

  @Column({ default: false })
  @Expose()
  @Field({ defaultValue: false })
  isVerified: boolean;

  @Column()
  @Expose()
  @Field()
  createdAt: Date;

  @Column()
  @Expose()
  @Field()
  updatedAt: Date;

  @Column()
  @Expose()
  @Field()
  userId: string;

  @Column({ nullable: true, default: null })
  @Expose()
  @Field({ nullable: true, defaultValue: null })
  campaignId?: string;

  constructor(wallet: Partial<Wallet>) {
    Object.assign(
      this,
      plainToClass(Wallet, wallet, {
        excludeExtraneousValues: true,
      }),
    );

    this.createdAt = this.createdAt || new Date();
    this.updatedAt = new Date();
  }
}
