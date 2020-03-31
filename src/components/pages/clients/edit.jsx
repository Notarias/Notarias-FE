import React, { Component }    from 'react';
import { withStyles }          from '@material-ui/core/styles';
import Grid                    from '@material-ui/core/Grid';
import { setBreadcrumbsList }  from '../../interfaces/breadcrumbs_interface';
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

const BREADCRUMBS = [
    { name: "Inicio", path: "/" },
    { name: "Clientes", path: "/clients" },
    { name: "Nuevo", path: null }
  ]

class EditClient extends Component {

  constructor(props) {
    super(props)
    this.state = {
      errorMessage: null,
      errors: {},
      loading: false,
      first_name: "",
      last_name: "",
      business: "",
      category: "",
      address: "",
      email: "",
      phone: "",
      rfc: "",
      pristine: true
    }
  }

  componentDidMount() {
    setBreadcrumbsList(BREADCRUMBS)
    this.getClient()
  }

  handleChange = ({ target }) => {
    const {name, value} = target
    this.setState({pristine: false, [name]: value})
    this.forceUpdate()
  }

  getClient() {
    API.get(`/clients/${this.props.match.params.id}`).then((response)=> {
      this.setState({
        loading: false,
        first_name: response.data.client.first_name,
        last_name: response.data.client.last_name,
      })
    }).catch((error) => {
      if (error.response && error.response.status === 422 ) {
        this.setState({
          errors: error.response.data.pointers,
          loading: false
        })
      }
    })
  }

  submitClient = (event) => {
    event.preventDefault()
    this.setState({ loading: true })
    API.patch(`/clients/${this.props.match.params.id}`, {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
    }).then(() => {
      this.setState({
        errors: {},
        loading: false
      })
      setMessage({ type: "success", text: "Usuario actualizado, redirigiendo..." })
      setTimeout(() => { this.props.history.push('/clients') }, 1500)
    }).catch((error) => {
      if (error.response && error.response.status === 422 ) {
        this.setState({
          errors: error.response.data.pointers,
          loading: false
        })
      }
    })
  }

  canSumbmit() {
    if (this.state.pristine && !this.state.loading){
      return true
    }else if(!this.state.pristine && !this.state.loading){
      return false
    }else if(!this.state.pristine && this.state.loading){
      return true
    }
  }

  render() {
    const { classes } = this.props;
    return(
      <Grid container classes={{ container: classes.pageWrapper }}>
          <Grid item xs={12} sm={6}  classes={{ root: classes.genericGridHeight}}>
            <form onSubmit={this.submitClient} className={ classes.newClientForm }>
              <Grid item container>
                <Grid item xs={1}>
                  <PersonIcon classes={{root: classes.genericInputIcon}}/>
                </Grid>
                <Grid item xs={11}>
                  <TextField
                    id="standard-basic"
                    value={this.state.first_name}
                    classes={{ root: classes.formTextFields }}
                    onChange={this.handleChange}
                    label="Nombre"
                    error={this.state.errors.first_name}
                    name="first_name"
                  />
                  <FormHelperText error>{this.state.errors.first_name}</FormHelperText>
                </Grid>
              </Grid>
              <Grid item container>
                <Grid item xs={1}>
                  <PermIdentityIcon classes={{root: classes.genericInputIcon}}/>
                </Grid>
                <Grid item xs={11}>
                  <TextField
                    id="standard-basic"
                    value={this.state.last_name}
                    classes={{ root: classes.formTextFields }}
                    onChange={this.handleChange}
                    label="Apellido"
                    error={this.state.errors.last_name}
                    name="last_name"
                  />
                  <FormHelperText error>{this.state.errors.last_name}</FormHelperText>
                </Grid>
              </Grid>
              <Grid item container>
                <Grid item xs={1}>
                  <EmojiTransportationIcon classes={{root: classes.genericInputIcon}}/>
                </Grid>
                <Grid item xs={11}>
                  <TextField
                    id="standard-basic"
                    value={this.state.business}
                    classes={{ root: classes.formTextFields }}
                    onChange={this.handleChange}
                    label="Empresa"
                    error={this.state.errors.business}
                  />
                  <FormHelperText error>{this.state.errors.business}</FormHelperText>
                </Grid>
              </Grid>
              <Grid item container>
                <Grid item xs={1}>
                  <AssignmentIndIcon classes={{root: classes.genericInputIcon}}/>
                </Grid>
                <Grid item xs={11}>
                  <TextField
                    id="standard-basic"
                    value={this.state.category}
                    classes={{ root: classes.formTextFields }}
                    onChange={this.handleChange}
                    label="Categoría"
                    erros={this.state.errors.category}
                    name="category"
                  />
                  <FormHelperText error>{this.state.errors.category}</FormHelperText>
                </Grid>
              </Grid>
              <Grid item container>
                <Grid item xs={1}>
                  <BusinessIcon classes={{root: classes.genericInputIcon}}/>
                </Grid>
                <Grid item xs={11}>
                  <TextField
                    id="standard-basic"
                    value={this.state.address}
                    classes={{ root: classes.formTextFields }}
                    onChange={this.handleChange}
                    label="Dirección"
                    erros={this.state.errors.address}
                    name="address"
                  />
                  <FormHelperText error>{this.state.errors.address}</FormHelperText>
                </Grid>
              </Grid>
              <Grid item container>
                <Grid item xs={1}>
                  <MailOutlineIcon classes={{root: classes.genericInputIcon}} />
                </Grid>
                <Grid item xs={11}>
                  <TextField
                    id="standard-basic"
                    value={this.state.email}
                    classes={{ root: classes.formTextFields }}
                    onChange={this.handleChange}
                    label="usuario@correo.com"
                    erros={this.state.errors.email}
                    name="email"
                  />
                  <FormHelperText error>{this.state.errors.email}</FormHelperText>
                </Grid>
              </Grid>
              <Grid item container>
                <Grid item xs={1}>
                  <PhoneRoundedIcon classes={{root: classes.genericInputIcon}}/>
                </Grid>
                <Grid item xs={11}>
                  <TextField
                    id="standard-basic"
                    value={this.state.phone}
                    classes={{ root: classes.formTextFields }}
                    onChange={this.handleChange}
                    label="Teléfono"
                    erros={this.state.errors.phone}
                    name="phone"
                  />
                  <FormHelperText error>{this.state.errors.phone}</FormHelperText>
                </Grid>
              </Grid>
              <Grid item container>
                <Grid item xs={1}>
                </Grid>
                <Grid item xs={11}>
                  <TextField
                    id="standard-basic"
                    value={this.state.rfc}
                    classes={{ root: classes.formTextFields }}
                    onChange={this.handleChange}
                    label="RFC"
                    erros={this.state.errors.rfc}
                    name="rfc"
                  />
                  <FormHelperText error>{this.state.errors.rfc}</FormHelperText>
                </Grid>
              </Grid>
              <Grid item>
                <Button
                  disabled={this.canSumbmit()}
                  classes={{ root: classes.submitFormButton }}
                  variant="contained"
                  color="primary"
                  type="submit">
                  Guardar Cambios
                  { this.state.loading && <CircularProgress className={classes.buttonProgress} size={24} /> }
                </Button>
              </Grid>
            </form>
          </Grid>
          <Grid item xs={12} sm={6}  classes={{ root: classes.genericGridHeight }}>
            <Grid item container classes={{ container: classes.gridScrollable }}>
              <List>
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
    )
  }
}

export default withStyles(styles)(EditClient);