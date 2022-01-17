import React                     from 'react';
import { withStyles }           from '@material-ui/core/styles';
import Grid                     from '@material-ui/core/Grid';
import { styles }               from './styles';
import Breadcrumbs              from '../../ui/breadcrumbs';
import EditForm                 from './edit/form';
import { useQuery }             from '@apollo/client';
import { GET_CLIENT }           from './clients_queries_and_mutations/queries';
import AddComment               from './edit/client_comment_input';
import clsx                     from 'clsx';
import Drawer                   from '@material-ui/core/Drawer';
import Divider                  from '@material-ui/core/Divider';
import IconButton               from '@material-ui/core/IconButton';
import ChevronLeftIcon          from '@material-ui/icons/ChevronLeft';
import ChatIcon                 from '@material-ui/icons/Chat';
import ChevronRightIcon         from '@material-ui/icons/ChevronRight';
import Paper                    from '@material-ui/core/Paper';
import { useTheme } from '@material-ui/core/styles';

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

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return(
    <>
      <Breadcrumbs breadcrumbs={ BREADCRUMBS }/>
      <Grid>
        <Grid container>
          <Grid container item direction="row" justifyContent="center" alignItems="center"sm={11} >
            <EditForm classes={ classes } history={props.history} match={props.match.params} data={data} loadingClient={loading}/>
          </Grid>
          <Grid 
            container
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
          >
            <Paper className={classes.paper_button_chat_margin}>
              <div>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={handleDrawerOpen}
                  className={clsx(open && classes.hide)}
                >
                  <ChatIcon fontSize="large" />
                </IconButton>
              </div>
            </Paper>
          </Grid>
        </Grid>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="right"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </div>
          <Divider />
          <Grid item>
            <AddComment classes={ classes } history={props.history} data={data} loadingClient={loading}/>
          </Grid>
        </Drawer>
      </Grid>
    </>
  )
}

export default withStyles(styles)(Edit);
