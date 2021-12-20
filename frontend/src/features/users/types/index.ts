import { BaseEntity } from '@/types';

export type User = {
  firstName: string;
  lastName: string;
  email: string;
  role: 'ADMIN' | 'USER';
  teamId: string;
  password: string;
  // facebook?: string;
  // twitter?: string;
  // youtube?: string;
  // instagram?: string;
} & BaseEntity;
