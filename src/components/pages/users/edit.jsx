import React, { Component } from 'react';
import { styles }           from './user_form/styles';
import { withStyles }       from '@material-ui/core/styles';
import { GENERIC_FORM_ERROR } from '../../reducers/messages_reducer';
import { setMessage }         from '../../interfaces/messages_interface';
import UserForm             from './user_form/user_form';
import Paper                from '@material-ui/core/Paper';
import ErrorMessage         from '../../ui/custom_snackbar_message';
import { setBreadcrumbsList }              from '../../interfaces/breadcrumbs_interface';
import Breadcrumbs             from '../../ui/breadcrumbs';
import { useQuery }         from '@apollo/react-hooks';
import { gql }              from 'apollo-boost';

const BREADCRUMBS = [
  { name: "Inicio", path: "/" },
  { name: "Usuarios", path: "/users" },
  { name: "Editar", path: null }
]

const GET_USER = gql`
  query getuser($id: Int!){
    user(id: $id) {
      id
      firstName
      lastName
      email
      address
      phone
      lockedAt
      roleId
      role {
        name
        permanentLink
        createdAt
        updatedAt
      }
    }
    roles{
      name
      createdAt
      permanentLink
    }
  }
`

const Edit = (props) => {
  const { classes, match } = props;
  const { loading, error, data } = useQuery(GET_USER, { variables: { "id": parseInt(match.params.id) }})
  if(loading) return <p>Loadng...</p>
  if(error) return <p> { `Error ${error.message}` } </p>
  //acaba la query eso te va a entregar el user y se lo pasas al form ok igual puedes pasar el loading desde aqui pero separa el loading del mutador del loading de la query ok
  return(
      <div>
        <Breadcrumbs breadcrumbs={BREADCRUMBS}/>
        <Paper className={classes.paper}>
          <UserForm classes={ classes } history={props.history} match={props.match.params} data={data} loadingUser={loading}/>
        </Paper>
      </div>
  )
}

export default withStyles(styles)(Edit);
