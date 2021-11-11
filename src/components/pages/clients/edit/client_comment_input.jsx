import React, { Component }                                     from 'react';
import { withStyles }                                           from '@material-ui/core/styles';
import TextField                                                from '@material-ui/core/TextField';
import Button                                                   from '@material-ui/core/Button';
import Avatar                                                   from '@material-ui/core/Avatar';
import List                                                     from '@material-ui/core/List';
import ListItem                                                 from '@material-ui/core/ListItem';
import ListItemText                                             from '@material-ui/core/ListItemText';
import ListItemAvatar                                           from '@material-ui/core/ListItemAvatar';
import Grid                                                     from '@material-ui/core/Grid';
import { styles }                                               from '../styles';
import { CREATE_CLIENT_COMMENT_MUTATION, LOAD_CLIENT_COMMENTS } from '../clients_queries_and_mutations/queries';
import CircularProgress                                         from '@material-ui/core/CircularProgress';

class ClientCommentari extends Component {

  constructor(props) {
    super(props)
    this.state = {
      pristine: true,
      errors: {},
      commentableId: this.props.data.client.id,
      commentableType: "client",
      body: "",
      per: 1,
      count: 1
    }
  }

  onCompleteCreate(data) {
    if (data.createComment.pointers) {
      this.setState({ errors: data.createComment.pointers })
    }
  }
  
  handleChange = ({ target }) => {
    const {name, value} = target
    this.setState({ [name]: value, pristine: false })
  }

  render() {
    const { classes } = this.props
      return(
        <div>
          <Grid item container classes={{root: classes.WindowComment}}>
            {/* <Query query={LOAD_CLIENT_COMMENTS}
              variables={{ clientId : this.props.data.client.id, per: this.state.per, sortDirection: "DESC"}}
            >
              {({ loading, error, data, refetch  }) => {
                if (loading) return "Loading...";
                if (error) return `Error! ${error.message}`;
                return (
                  <div className={classes.widthWindowComment}>
                    <List classes={{root: classes.gridScrollable}}>
                      {data.clientComments.map(comment => (
                        <ListItem key={comment.id} >
                          <ListItemAvatar>
                            <Avatar key={comment.user.id} src={comment.user.avatarThumbUrl} />
                          </ListItemAvatar>
                          <ListItemText primary={this.props.data.client.firstName} secondary={comment.body} style={{ width: '100%', maxHeight: "50%" }}/>
                        </ListItem>
                      ))}
                      <Grid container item>
                        <Grid item classes={{ root: classes.buttonSeeMore }}>
                          <Button
                            color='primary'
                            variant="contained"
                            onClick={
                              () => refetch({
                                per: (this.state.per+this.state.count),
                                sortDirection: "ASC"
                              })
                            }>
                            Ver más
                          </Button>
                        </Grid>
                      </Grid>
                    </List>
                  </div>
                )
              }
              }
            </Query> */}
          </Grid>
          <Grid>
            <List>
              <ListItem alignItems="flex-start" style={{width:"100%"}} >
                <Grid>
                  {/* <Query query={LOAD_CLIENT_COMMENTS}
                    variables={{clientId : this.props.data.client.id, per: 1}}
                  >
                    {({ loading, error, data  }) => {
                      if (loading) return "Loading...";
                      if (error) return `Error! ${error.message}`;
                      return (
                          <div>
                            {data.clientComments.map(comment => (
                              <Avatar key={comment.user.id} src={comment.user.avatarThumbUrl} />
                            ))}
                          </div>
                      )}}
                  </Query> */}
                </Grid>
                <Grid style={{paddingLeft:"5%", width:"100%"}}>
                  <TextField
                  id="outlined-basic"
                  value={this.state.body}
                  fullWidth
                  multiline
                  label="Comentario"
                  name="body"
                  onChange={this.handleChange.bind(this)}
                  classes={{ root: classes.textFieldsComments }}/>
                </Grid>
              </ListItem>
            </List>
          </Grid>
          <Grid item container justifyContent='flex-end'>
            {/* <Mutation
            mutation={CREATE_CLIENT_COMMENT_MUTATION}
            variables={{ ...this.state }}
            onCompleted={this.onCompleteCreate.bind(this)}
            refetchQueries={() => [ {query: LOAD_CLIENT_COMMENTS, variables: {clientId : this.props.data.client.id, per: this.state.per, sortDirection: "DESC"}}]}>
                {
                  (mutation, { loading, error, data }) => {
                    return(
                      <Grid item container justifyContent='flex-end' classes={{ root: classes.buttonFetch }}>
                        <Button
                          disabled={this.state.pristine || loading}
                          variant="contained"
                          color="primary"
                          type="submit"
                          size='large'
                          onClick={ mutation }>
                          Enviar
                          { loading && <CircularProgress className={classes.buttonProgress} size={24} /> }
                        </Button>
                      </Grid>
                    )
                  }
                }
          </Mutation> */}
        </Grid>
      </div>
    )
  }
}

export default withStyles(styles)(ClientCommentari);

