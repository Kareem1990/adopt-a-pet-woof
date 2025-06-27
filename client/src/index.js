import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

// 🔗 Use fully deployed GraphQL endpoint from Serverless
const httpLink = createHttpLink({
  uri: 'https://wam7mddstc.execute-api.us-east-1.amazonaws.com/dev/graphql',
  fetchOptions: {
    mode: 'cors', // ✅ Ensure cross-origin requests allow credentials
  },
});

// 🔐 Inject JWT token from localStorage into each request
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  console.log('[Apollo DEBUG] token being sent:', token); // 🔍 TEMP DEBUG
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : '', // ✅ Capital "A" is critical!
    },
  };
});

// 🚀 Initialize Apollo Client with auth link and cache
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

// 🧠 Wrap root App with ApolloProvider
ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
