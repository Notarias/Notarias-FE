import React                          from 'react';
import { styles }                     from './user_form/styles';
import { withStyles }                 from '@material-ui/core/styles';
import UserForm                       from './user_form/user_form';
import Paper                          from '@material-ui/core/Paper';
import Breadcrumbs                    from '../../ui/breadcrumbs';
import { useQuery }                   from '@apollo/client';
import { GET_USER }       from './queries_and_mutations/queries';

const BREADCRUMBS = [
  { name: "Inicio", path: "/" },
  { name: "Usuarios", path: "/users" },
  { name: "Editar", path: null }
]

const Edit = (props) => {
  const { classes, match } = props;
  const { loading, error, data } = useQuery(GET_USER, { variables: { "id": match.params.id }})
  if(loading) return <p>Loadng...</p>
  if(error) return <p> { `Error ${error.message}` } </p>

  return(
      <div>
        <Breadcrumbs breadcrumbs={BREADCRUMBS}/>
        <Paper className={classes.paper}>
          <UserForm classes={ classes } userData={data && data.user}/>
        </Paper>
      </div>
  )
}

export default withStyles(styles)(Edit);
