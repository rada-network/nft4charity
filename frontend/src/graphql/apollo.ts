// /lib/apollo.ts
import { ApolloClient, InMemoryCache } from '@apollo/client';
import config from '@/config';
import storage from '@/utils/storage';

const userToken = storage.getUserToken();

const apolloClient = new ApolloClient({
  uri: config.GRAPHQL_URL,
  cache: new InMemoryCache(),
  headers: {
    Authorization: userToken ? userToken : '',
  },
});

export default apolloClient;
