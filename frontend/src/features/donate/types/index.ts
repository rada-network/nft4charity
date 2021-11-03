import { BaseEntity } from '@/types';

export type WalletFilter = {
  address: string;
  currency: string;
  _id: string;
} & BaseEntity;
