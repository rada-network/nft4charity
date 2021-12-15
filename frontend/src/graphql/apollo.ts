// /lib/apollo.ts
import { ApolloClient, InMemoryCache } from '@apollo/client';
import config from '@/config';

const tokenHeader = localStorage.getItem('token');

const apolloClient = new ApolloClient({
  uri: config.GRAPHQL_URL,
  cache: new InMemoryCache(),
  headers: {
    authorization: tokenHeader ? `Bearer ${tokenHeader}` : '',
  },
});

export default apolloClient;
