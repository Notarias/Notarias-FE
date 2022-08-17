import React from 'react';
import { Route, Redirect } from 'react-router-dom';


export default function ProtectedRoute({ component: Component, currentUser, permission, ...rest }) {

  return (

    <Route
      {...rest}
     
      render={props => {
        return(
          localStorage.jwtToken ? ( <Component {...props} {...rest } /> ) :
          (
            <Redirect
              to={{
                pathname: "/sign_in",
                state: { from: props.location }
              }}
            />
          )
        )
      }}
    />
  );
}