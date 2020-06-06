import React                  from 'react';
import { styles }             from './user_form/styles';
import { withStyles }         from '@material-ui/core/styles';
import UserForm               from './user_form/user_form';
import Paper                  from '@material-ui/core/Paper';
import Breadcrumbs            from '../../ui/breadcrumbs';
import { useQuery }           from '@apollo/react-hooks';
import gql                    from 'graphql-tag';

const BREADCRUMBS = [
  { name: "Inicio", path: "/" },
  { name: "Usuarios", path: "/users" },
  { name: "Editar", path: null }
]

const GET_USER = gql`
  query getuser($id: ID!){
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
  const { loading, error, data } = useQuery(GET_USER, { variables: { "id": match.params.id }})
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
