import React from 'react'
import { render } from 'react-dom'
import './index.css';
import App from './components/App';
import { ApolloClient, createHttpLink, NormalizedCacheObject,ApolloProvider } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { cache } from './cache';
import * as log  from 'loglevel';
import { userSessionReactVar } from "./cache"
import { getUserFromToken} from './pages/access/sessionToken'
log.setLevel(process.env.REACT_APP_LOG_LEVEL ? process.env.REACT_APP_LOG_LEVEL as log.LogLevelDesc: "ERROR", true)


const graphqluri = process.env.REACT_APP_GRAPHQL_URI;
log.info(`graphqluri:${graphqluri}`)
const httpLink = createHttpLink({
  uri: graphqluri,
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const SaveTokenInCache = (  ) => {
  const token = localStorage.getItem('token')
  if (token)  userSessionReactVar(getUserFromToken(token));
  return <App />
}

export const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  cache,
  link: authLink.concat(httpLink),
});



render(
  <ApolloProvider client={client}>
    <SaveTokenInCache />
  </ApolloProvider>
,
  document.getElementById('root')
);
