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
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChatIcon from '@material-ui/icons/Chat';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Paper                        from '@material-ui/core/Paper';

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

//----------------
const drawerWidth = 800;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  },
  title: {
    flexGrow: 1,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
  },
  drawerPaper: {
    width: drawerWidth,
    top: '15%',
    height: "70%",
    borderRadius: '4px',
    border: '1px solid rgba(0, 0, 0, 0.12)',
    boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)',
    overflow: 'hidden',
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
  },
  content: {
    flexGrow: 1,
    padding: '10px 0px 30px 24px',
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: 0,
  },
}));

const classes_drawer = useStyles();
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
      {/*<Grid container classes={{ container: classes.pageWrapper }}>
        <Grid item xs={12} sm={6}  classes={{ root: classes.genericGridHeight }}>
          <EditForm classes={ classes } history={props.history} match={props.match.params} data={data} loadingClient={loading}/>
        </Grid>
        <Grid item xs={12} sm={6}  classes={{ root: classes.genericGridHeight }}>
          <AddCommentari classes={ classes } history={props.history} data={data} loadingClient={loading}/>
        </Grid>
       </Grid>*/}
      <Grid className={classes_drawer.root} style={{ paddingTop: '8%' }}>
        <CssBaseline />
        <AppBar
          color="white"
        >
          <Toolbar>
            <Typography style={{paddingLeft: '2%'}} variant="h6" noWrap className={classes_drawer.title}>
              {<Breadcrumbs breadcrumbs={BREADCRUMBS}/>}
            </Typography>
          </Toolbar>
        </AppBar>
        <main
          className={clsx(classes_drawer.content, {
            [classes_drawer.contentShift]: open,
          })}
        >
          <div className={classes_drawer.drawerHeader} />
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
                    className={clsx(open && classes_drawer.hide)}
                  >
                    <ChatIcon fontSize="large" />
                  </IconButton>
                </div>
              </Paper>
            </Grid>
          </Grid>
        </main>
        <Drawer
          className={classes_drawer.drawer}
          variant="persistent"
          anchor="right"
          open={open}
          classes={{
            paper: classes_drawer.drawerPaper,
          }}
        >
          <div className={classes_drawer.drawerHeader}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </div>
          <Divider />
          <Grid item>
            <AddCommentari classes={ classes } history={props.history} data={data} loadingClient={loading}/>
          </Grid>
        </Drawer>
      </Grid>
    </>
  )
}

export default withStyles(styles)(Edit);
