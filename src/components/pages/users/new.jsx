import React, { Component } from 'react';
import { withStyles }       from '@material-ui/core/styles';
import Paper                from '@material-ui/core/Paper';
import { styles }           from './user_form/styles';
import UserForm             from './user_form/user_form_new';
import Breadcrumbs          from '../../ui/breadcrumbs';
import gql                  from 'graphql-tag';
import { useQuery }         from '@apollo/react-hooks';

const BREADCRUMBS = [
  { name: "Inicio", path: "/" },
  { name: "Usuarios", path: "/users" },
  { name: "Nuevo", path: null }
]

const GET_ROLES = gql`
query getRoles{
  roles{
    name
    permanentLink
  }
}
`

const New = (props) => {
  const { classes } = props;
  const { data } = useQuery(GET_ROLES)
  return(
      <div>
        <Breadcrumbs breadcrumbs={BREADCRUMBS}/>
        <Paper className={classes.paper}>
          <UserForm classes={ classes } history={props.history} data={data} />
        </Paper>
      </div>
  )
}

export default withStyles(styles)(New);

