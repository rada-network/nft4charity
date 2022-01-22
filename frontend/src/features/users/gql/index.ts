import { gql } from '@apollo/client';

export const CREATE_PROFILE = gql`
  mutation createUser($user: CreateUserDto!) {
    createUser(user: $user) {
      avatar
      firstName
      lastName
      email
      description
      youtubeUrl
      facebookUrl
      instagramUrl
      twitterUrl
      frontIdentifierUrl
      backIdentifierUrl
    }
  }
`;

export const UPDATE_PROFILE = gql`
  mutation updateUser($user: UpdateUserDto!) {
    updateUser(user: $user) {
      avatar
      firstName
      lastName
      email
      description
      youtubeUrl
      facebookUrl
      instagramUrl
      twitterUrl
      frontIdentifierUrl
      backIdentifierUrl
    }
  }
`;
