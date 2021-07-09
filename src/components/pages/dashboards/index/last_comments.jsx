import React, { Component }         from 'react';
import { styles }                   from '../styles';
import { withStyles }               from '@material-ui/core/styles';
import Grid                         from '@material-ui/core/Grid';
import Typography                   from '@material-ui/core/Typography';
import {GET_LATEST_COMMENTS}        from '../index_queries_and_mutations/queries';
import { Query }                    from '@apollo/react-components';
import ListItemAvatar                                           from '@material-ui/core/ListItemAvatar';
import ListItem                                                 from '@material-ui/core/ListItem';
import ListItemText                                             from '@material-ui/core/ListItemText';
import Avatar                                                   from '@material-ui/core/Avatar';
import { Link } from '@material-ui/core';

class LastComments extends Component {

  render() {
    const { classes } = this.props;
    return (
      <Grid container spacing={3} style={{margin: "0px", overflowY: "scroll", height: "100%"}}>
        <Grid item xs={12} style={{margin: "0px"}}>
          <Query query={GET_LATEST_COMMENTS}
          variables={{searchField: "created_at", sortDirection: "DESC", per: 10 }}
          >
            {({ loading, error, data, refetch  }) => {
                if (loading) return "Loading...";
                if (error) return `Error! ${error.message}`;
                console.log(data, "data")
                return (
                  <div style={{ width: '100%', height:" 500px"}}>
                    {data.comments.map(comment => (
                      // <Link 
                      //   key={"comment-" + comment.id} 
                      //   href={`clients/${comment.commentableId}/edit`} 
                      //   color="inherit" 
                      //   textDecoration="none" 
                      //   underline= "none"
                      // >
                        <ListItem >
                          <Grid item container xs={3} alignItems="center" justify="center">
                            <ListItemAvatar align='center'>
                              <Avatar 
                                key={comment.commentableId} 
                                src={comment.user.avatarMidUrl} 
                                className={classes.largeAvatar}  
                                size="small"
                              />
                            </ListItemAvatar>
                          </Grid>
                          <Grid item container xs={8} classes={{root: classes.gridEllipsis}}>
                            <ListItemText  primary={
                              <Grid item container xs={12} direction="row">

                                <Grid container item xs={6}>
                                  <Typography variant="subtitle2" color="primary">
                                    {comment.user.firstName} 
                                  </Typography>
                                </Grid>
                                <Grid container item xs={6}>
                                  <Typography variant="body2" color="primary">
                                    {comment.user.createdAt.substr(0,10)}
                                  </Typography>
                                </Grid>

                              </Grid>
                            } secondary={
                              <Typography variant="body2"classes={{root: classes.gridEllipsis}}>
                                {comment.body}
                              </Typography>
                            } style={{ width: '100%', maxHeight: "50%" }}/>
                          </Grid>
                        </ListItem>
                      // </Link>
                      ))
                    }
                  </div>
                )
              }
            }
          </Query>
        </Grid>
      </Grid>
    )
  }
}

export default withStyles(styles)(LastComments);