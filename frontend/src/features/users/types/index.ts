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

export interface CreateProfileForm {
  firstName: string;
  lastName: string;
  email: string;
  description: string;
  youtubeUrl?: string;
  facebookUrl?: string;
  instagramUrl?: string;
  twitterUrl?: string;
}

export interface CreateProfileDto extends CreateProfileForm {
  avatar?: string;
  frontIdentifierUrl?: string;
  backIdentifierUrl?: string;
  wallet: {
    platform: string;
    currency?: string;
  };
}

export interface UpdateProfileDto extends CreateProfileForm {
  avatar?: string;
  frontIdentifierUrl?: string;
  backIdentifierUrl?: string;
}
