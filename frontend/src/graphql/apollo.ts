// /lib/apollo.ts
import { ApolloClient, InMemoryCache } from '@apollo/client';

const apolloClient = new ApolloClient({
  uri: 'https://api.rada.charity/graphql',
  cache: new InMemoryCache(),
});

export default apolloClient;
