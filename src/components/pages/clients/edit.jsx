import React, { Component }    from 'react';
import { withStyles }          from '@material-ui/core/styles';
import Grid                    from '@material-ui/core/Grid';
import { styles }              from './styles';
import PermIdentityIcon        from '@material-ui/icons/PermIdentity';
import FormHelperText          from '@material-ui/core/FormHelperText';
import { setMessage }          from '../../interfaces/messages_interface';
import CircularProgress        from '@material-ui/core/CircularProgress';
import Breadcrumbs             from '../../ui/breadcrumbs';
import EditForm                from './edit/form';
import { useQuery }            from '@apollo/react-hooks';
import { GET_CLIENT }          from './clients_queries_and_mutations/queries';
import AddCommentari           from './edit/client_comment_input';

const BREADCRUMBS = [
    { name: "Inicio", path: "/" },
    { name: "Clientes", path: "/clients" },
    { name: "Editar", path: null }
  ]

const Edit = (props) => {
  const { classes, match } = props;
  const { loading, error, data } = useQuery(GET_CLIENT, { variables: { "id": match.params.id }})
  if(loading) return <p>Loadng...</p>
  if(error) return <p> { `Error ${error.message}` } </p>
  return(
    <>
      <Breadcrumbs breadcrumbs={BREADCRUMBS}/>
      <Grid container classes={{ container: classes.pageWrapper }}>
        <Grid item xs={12} sm={6}  classes={{ root: classes.genericGridHeight }}>
          <EditForm classes={ classes } history={props.history} match={props.match.params} data={data} loadingClient={loading}/>
        </Grid>
        <Grid item xs={12} sm={6}  classes={{ root: classes.genericGridHeight }}>
          <AddCommentari classes={ classes } history={props.history} data={data} loadingClient={loading}/>
        </Grid>
      </Grid>
    </>
  )
}

export default withStyles(styles)(Edit);
