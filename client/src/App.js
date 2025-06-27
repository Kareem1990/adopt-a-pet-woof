import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SearchPets from './pages/SearchPets';
import SavedPets from './pages/SavedPets';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Footer from './components/Footer';

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

// 🔧 Do not append /graphql here — include it in your .env value
const httpLink = createHttpLink({
  uri: process.env.REACT_APP_API_URL,
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <>
          <Navbar />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/pets' component={SearchPets} />
            <Route exact path='/saved' component={SavedPets} />
            <Route render={() => <h1 className='display-2'>Wrong page!</h1>} />
          </Switch>
          <Footer />
        </>
      </Router>
    </ApolloProvider>
  );
}

export default App;
