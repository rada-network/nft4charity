import { ApolloProvider } from '@apollo/client';

import apolloClient from './graphql/apollo';
import { AppProvider } from './providers/app';
import { AppRoutes } from './routes';

function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <AppProvider>
        <AppRoutes />
      </AppProvider>
    </ApolloProvider>
  );
}

export default App;
