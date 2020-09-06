import React, { Component }     from 'react';
import { withStyles }           from '@material-ui/core/styles';
import Grid                     from '@material-ui/core/Grid';
import { styles }               from './styles';
import PermIdentityIcon         from '@material-ui/icons/PermIdentity';
import FormHelperText           from '@material-ui/core/FormHelperText';
import { setMessage }           from '../../interfaces/messages_interface';
import CircularProgress         from '@material-ui/core/CircularProgress';
import Breadcrumbs              from '../../ui/breadcrumbs';
import EditForm                 from './edit/form';
import { useQuery }             from '@apollo/react-hooks';
import { GET_CLIENT }           from './clients_queries_and_mutations/queries';
import AddComment               from './edit/client_comment_input';
import clsx                     from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer                   from '@material-ui/core/Drawer';
import AppBar                   from '@material-ui/core/AppBar';
import Toolbar                  from '@material-ui/core/Toolbar';
import CssBaseline              from '@material-ui/core/CssBaseline';
import List                     from '@material-ui/core/List';
import Typography               from '@material-ui/core/Typography';
import Divider                  from '@material-ui/core/Divider';
import IconButton               from '@material-ui/core/IconButton';
import MenuIcon                 from '@material-ui/icons/Menu';
import ChevronLeftIcon          from '@material-ui/icons/ChevronLeft';
import ChatIcon                 from '@material-ui/icons/Chat';
import ChevronRightIcon         from '@material-ui/icons/ChevronRight';
import ListItem                 from '@material-ui/core/ListItem';
import ListItemIcon             from '@material-ui/core/ListItemIcon';
import ListItemText             from '@material-ui/core/ListItemText';
import InboxIcon                from '@material-ui/icons/MoveToInbox';
import MailIcon                 from '@material-ui/icons/Mail';
import Paper                    from '@material-ui/core/Paper';

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
      <Grid className={classes.rootEdit} style={{ paddingTop: '8%' }}>
        <CssBaseline />
          <AppBar
            color="white"
        >
          <Toolbar>
            <Typography style={{paddingLeft: '2%'}} variant="h6" noWrap className={classes.title}>
              {<Breadcrumbs breadcrumbs={BREADCRUMBS}/>}
            </Typography>
          </Toolbar>
        </AppBar>
        <main
          className={clsx(classes.content, {
            [classes.contentShift]: open,
          })}
        >
          <div className={classes.drawerHeader} />
          <Grid container>
            <Grid container direction="row" justify="center" alignItems="center"sm={11} >
              <EditForm classes={ classes } history={props.history} match={props.match.params} data={data} loadingClient={loading}/>
            </Grid>
            <Grid sm={1} container
              direction="row"
              justify="flex-end"
              alignItems="center">
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
        </main>
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
