// /lib/apollo.ts
import { ApolloClient, InMemoryCache } from '@apollo/client';

const tokenHeader = localStorage.getItem('token');

const apolloClient = new ApolloClient({
  uri: 'https://api.rada.charity/graphql',
  cache: new InMemoryCache(),
  headers: {
    authorization: tokenHeader ? `Bearer ${tokenHeader}` : '',
  },
});

export default apolloClient;
