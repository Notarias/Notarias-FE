import React              from 'react';
import ReactDOM           from 'react-dom';
import { Router }         from 'react-router-dom';
import history            from './history'
import { ApolloProvider } from '@apollo/react-hooks'
import client, { cache }             from './apollo'
import { persistCache }        from 'apollo-cache-persist';
import App                from './App';
import * as serviceWorker from './serviceWorker';
import './index.css';

const setupAndRender = async () => {

  await persistCache({ cache, storage: window.localStorage });

  ReactDOM.render(
    <ApolloProvider client={client}>
      <Router history={history}>
        <App />
      </Router>
    </ApolloProvider>,
    document.getElementById('root')
  );
}

setupAndRender()

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
