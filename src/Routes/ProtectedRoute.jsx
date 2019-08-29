import React from 'react';
import { Route, Redirect } from 'react-router-dom';


export default function ProtectedRoute({ component: Component, ...rest }) {
  return (
    <Route exact
      {...rest}
     
      render={props =>
        localStorage.jwtToken ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/sign_in",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
}