import { UserResponse } from '../types';

import { axios } from '@/lib/axios';

export type LoginCredentialsDTO = {
  email: string;
  password: string;
};

export const loginWithEmailAndPassword = (data: LoginCredentialsDTO): Promise<UserResponse> => {
  return axios.post('/auth/login', data);
};
