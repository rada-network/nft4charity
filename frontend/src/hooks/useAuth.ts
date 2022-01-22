import { gql, useLazyQuery } from '@apollo/client';

const GET_PROFILE = gql`
  query GetProfile {
    me {
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

export const useAuth = () => {
  const [getProfile, dataProfile] = useLazyQuery(GET_PROFILE);
  return { getProfile, dataProfile };
};
