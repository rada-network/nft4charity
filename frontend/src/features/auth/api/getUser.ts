import { AuthUser } from '../types';

import { axios } from '@/lib/axios';

export const getUser = (): Promise<AuthUser> => {
  return axios.get('/auth/me');
};
