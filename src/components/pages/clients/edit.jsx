import React, { Component }    from 'react';
import { withStyles }          from '@material-ui/core/styles';
import Grid                    from '@material-ui/core/Grid';
import TextField               from '@material-ui/core/TextField';
import Button                  from '@material-ui/core/Button';
import API                     from '../../../axios_config';
import PersonIcon              from '@material-ui/icons/Person';
import MailOutlineIcon         from '@material-ui/icons/MailOutline';
import Avatar                  from '@material-ui/core/Avatar';
import List                    from '@material-ui/core/List';
import ListItem                from '@material-ui/core/ListItem';
import ListItemText            from '@material-ui/core/ListItemText';
import ListItemAvatar          from '@material-ui/core/ListItemAvatar';
import Typography              from '@material-ui/core/Typography';
import Divider                 from '@material-ui/core/Divider';
import PhoneRoundedIcon        from '@material-ui/icons/PhoneRounded';
import BusinessIcon            from '@material-ui/icons/Business';
import AssignmentIndIcon       from '@material-ui/icons/AssignmentInd';
import EmojiTransportationIcon from '@material-ui/icons/EmojiTransportation';
import { styles }              from './styles';
import PermIdentityIcon        from '@material-ui/icons/PermIdentity';
import FormHelperText          from '@material-ui/core/FormHelperText';
import { setMessage }          from '../../interfaces/messages_interface';
import CircularProgress        from '@material-ui/core/CircularProgress';
import Breadcrumbs             from '../../ui/breadcrumbs';
import EditForm                from './edit/form';
import { useQuery }            from '@apollo/react-hooks';
import { GET_CLIENT }          from './clients_queries_and_mutations/queries';

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
          <Grid item container classes={{ container: classes.gridScrollable }}>
            <List className={ classes.commentsList }>
              <ListItem >
                <ListItemAvatar>
                  <Avatar alt="Remy Sharp" src="#" />
                </ListItemAvatar>
              <ListItemText 
                primary="Brunch this weekend?"
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      color="textPrimary"
                    >
                      Ali Connors
                    </Typography>
                    {" — I'll be in your neighborhood doing errands this…"}
                  </React.Fragment>
                }
                >
                </ListItemText>
              </ListItem>
              <Divider variant="inset"  />
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar alt="Cindy Baker" src="#" />
                </ListItemAvatar>
                <ListItemText
                  primary="Oui Oui"
                  secondary={
                    <React.Fragment>
                      <Typography
                        component="span"
                        variant="body2"
                        color="textPrimary"
                      >
                        Sandra Adams
                      </Typography>
                      {' — Do you have Paris recommendations? Have you ever…'}
                    </React.Fragment>
                  }
                />
              </ListItem>
              <Divider variant="inset" />
              <ListItem >
              <ListItemAvatar>
                <Avatar alt="Remy Sharp" src="#" />
              </ListItemAvatar>
              <ListItemText 
                primary="Brunch this weekend?"
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      color="textPrimary"
                    >
                      Ali Connors
                    </Typography>
                    {" — I'll be in your neighborhood doing errands this…"}
                  </React.Fragment>
                }
                >
                </ListItemText>
              </ListItem>
              <Divider variant="inset"  />
              <ListItem >
              <ListItemAvatar>
                <Avatar alt="Remy Sharp" src="#" />
              </ListItemAvatar>
              <ListItemText 
                primary="Brunch this weekend?"
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      color="textPrimary"
                    >
                      Ali Connors
                    </Typography>
                    {" — I'll be in your neighborhood doing errands this…"}
                  </React.Fragment>
                }
                >
                </ListItemText>
              </ListItem>
              <Divider variant="inset"  />
              <ListItem >
              <ListItemAvatar>
                <Avatar alt="Remy Sharp" src="#" />
              </ListItemAvatar>
              <ListItemText 
                primary="Brunch this weekend?"
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      color="textPrimary"
                    >
                      Ali Connors
                    </Typography>
                    {" — I'll be in your neighborhood doing errands this…"}
                  </React.Fragment>
                }
                >
                </ListItemText>
              </ListItem>
              <Divider variant="inset"  />
              <ListItem >
              <ListItemAvatar>
                <Avatar alt="Remy Sharp" src="#" />
              </ListItemAvatar>
              <ListItemText 
                primary="Brunch this weekend?"
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      color="textPrimary"
                    >
                      Ali Connors
                    </Typography>
                    {" — I'll be in your neighborhood doing errands this…"}
                  </React.Fragment>
                }
                >
                </ListItemText>
              </ListItem>
              <Divider variant="inset"  />
              <ListItem >
              <ListItemAvatar>
                <Avatar alt="Remy Sharp" src="#" />
              </ListItemAvatar>
              <ListItemText 
                primary="Brunch this weekend?"
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      color="textPrimary"
                    >
                      Ali Connors
                    </Typography>
                    {" — I'll be in your neighborhood doing errands this…"}
                  </React.Fragment>
                }
                >
                </ListItemText>
              </ListItem>
              <Divider variant="inset"  />
            </List>
          </Grid>
          <Grid item container classes={{ container: classes.gridInputComments }}>
            <List>
              <ListItem alignItems="flex-start" >
                <Avatar alt="Jan Che" src="#" />
                <TextField classes={{ root: classes.textFieldsComments }} multiline placeholder="Comentario"/>
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}

export default withStyles(styles)(Edit);
