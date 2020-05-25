import React, { Component }       from 'react';
import { Mutation }               from '@apollo/react-components';
import PermIdentityIcon           from '@material-ui/icons/PermIdentity';
import FormHelperText             from '@material-ui/core/FormHelperText';
import PhoneRoundedIcon           from '@material-ui/icons/PhoneRounded';
import BusinessIcon               from '@material-ui/icons/Business';
import AssignmentIndIcon          from '@material-ui/icons/AssignmentInd';
import EmojiTransportationIcon    from '@material-ui/icons/EmojiTransportation';
import PersonIcon                 from '@material-ui/icons/Person';
import MailOutlineIcon            from '@material-ui/icons/MailOutline';
import CircularProgress           from '@material-ui/core/CircularProgress';
import Button                     from '@material-ui/core/Button';
import Grid                       from '@material-ui/core/Grid';
import TextField                  from '@material-ui/core/TextField';
import withStyles                 from '@material-ui/core/styles/withStyles';
import { styles }                 from './../styles';
import { GLOBAL_MESSAGE }         from '../../../../resolvers/queries';
import { UPDATE_CLIENT_MUTATION } from '../clients_queries_and_mutations/queries';

class EditClientForm extends Component {

  constructor(props) {
    super(props)
    const { client } = this.props.data
    this.state = {
      id: client.id,
      pristine: true,
      errors: {},
      firstName: client.firstName,
      lastName: client.lastName,
      phone: client.phone,
      business: client.business,
      category: client.category,
      address: client.address,
      email: client.email,
      rfc: client.rfc,
    }
  }

  handleChange = ({ target }) => {
    const {name, value} = target
    this.setState({ [name]: value, pristine: false })
  }

  onCompleteCreate(data) {
    if (data.updateClient.pointers) {
      this.setState({ errors: data.updateClient.pointers })
    }
  }

  submitForm(mutation) {
    mutation(
      {
        variables: {
          input: { ...this.state }
        },
        update: (store, { data: { updateClient } }) => {
          if(!updateClient.errors){
            store.writeQuery({
              query: GLOBAL_MESSAGE,
              data: {
                globalMessage: {
                  message: "Se actualizo el perfil exitosamente",
                  type: "success",
                  __typename: "globalMessage"
                }
              }
            })
          }
        }
      }
    )
  }

  render() {
    const { classes } = this.props
    return (
      <form className={ classes.newClientForm } onSubmit={(e) => e.preventDefault()}>
        <Grid item container >
          <Grid item xs={1}>
            <PersonIcon classes={{root: classes.paddingInformationClient}}/>
          </Grid>
          <Grid item xs={11}>
            <TextField
              value={this.state.firstName}
              classes={{ root: classes.formTextFields }}
              onChange={this.handleChange.bind(this)}
              label="Nombre"
              error={this.state.errors.firstName}
              name="firstName"/>
            <FormHelperText error>{this.state.errors.first_name}</FormHelperText>
          </Grid>
        </Grid>
        <Grid item container >
          <Grid item xs={1}>
            <PermIdentityIcon classes={{root: classes.genericInputIcon}}/>
          </Grid>
          <Grid item xs={11}>
            <TextField
              value={this.state.lastName}
              classes={{ root: classes.formTextFields }}
              onChange={this.handleChange.bind(this)}
              label="Apellido"
              error={this.state.errors.lastName}
              name="lastName"/>
            <FormHelperText error>{this.state.errors.last_name}</FormHelperText>
          </Grid>
        </Grid>
        <Grid item container >
          <Grid item xs={1}>
            <EmojiTransportationIcon classes={{root: classes.genericInputIcon}}/>
          </Grid>
          <Grid item xs={11}>
            <TextField
              value={this.state.business}
              classes={{ root: classes.formTextFields }}
              onChange={this.handleChange.bind(this)}
              label="Empresa"
              error={this.state.errors.business}
              name="business"/>
            <FormHelperText error>{this.state.errors.business}</FormHelperText>
          </Grid>
        </Grid>
        <Grid item container >
          <Grid item xs={1}>
            <AssignmentIndIcon classes={{ root: classes.genericInputIcon }}/>
          </Grid>
          <Grid item xs={11}>
            <TextField
              value={this.state.category}
              classes={{ root: classes.formTextFields }}
              onChange={this.handleChange.bind(this)}
              label="Categoría"
              erros={this.state.errors.category}
              name="category"/>
            <FormHelperText error>{this.state.errors.category}</FormHelperText>
          </Grid>
        </Grid>
        <Grid item container >
          <Grid item xs={1}>
            <BusinessIcon classes={{root: classes.genericInputIcon}}/>
          </Grid>
          <Grid item xs={11}>
            <TextField
              value={this.state.address}
              classes={{ root: classes.formTextFields }}
              onChange={this.handleChange.bind(this)}
              label="Dirección"
              erros={this.state.errors.address}
              name="address"/>
            <FormHelperText error>{this.state.errors.address}</FormHelperText>
          </Grid>
        </Grid>
        <Grid item container >
          <Grid item xs={1}>
            <MailOutlineIcon classes={{root: classes.genericInputIcon}} />
          </Grid>
          <Grid item xs={11}>
            <TextField
              value={this.state.email}
              classes={{ root: classes.formTextFields }}
              onChange={this.handleChange.bind(this)}
              label="usuario@correo.com"
              erros={this.state.errors.email}
              name="email"/>
            <FormHelperText error>{this.state.errors.email}</FormHelperText>
          </Grid>
        </Grid>
        <Grid item container >
          <Grid item xs={1}>
            <PhoneRoundedIcon classes={{root: classes.genericInputIcon}}/>
          </Grid>
          <Grid item xs={11}>
            <TextField
              value={this.state.phone}
              classes={{ root: classes.formTextFields }}
              onChange={this.handleChange.bind(this)}
              label="Teléfono"
              erros={this.state.errors.phone}
              name="phone"/>
            <FormHelperText error>{this.state.errors.phone}</FormHelperText>
          </Grid>
        </Grid>
        <Grid item container >
          <Grid item xs={1}>

          </Grid>
          <Grid item xs={11}>
            <TextField
              value={this.state.rfc}
              classes={{ root: classes.formTextFields }}
              onChange={this.handleChange.bind(this)}
              label="RFC"
              erros={this.state.errors.rfc}
              name="rfc"/>
            <FormHelperText error>{this.state.errors.rfc}</FormHelperText>
          </Grid>
        </Grid>
        <Grid item>
          <Mutation
            mutation={UPDATE_CLIENT_MUTATION}
            variables={{ ...this.state }}
            onCompleted={this.onCompleteCreate.bind(this)}>
            {
              (mutation, { loading, error, data }) => {
                return(
                  <Button
                    disabled={this.state.pristine || loading}
                    fullWidth
                    variant="contained"
                    color="primary"
                    type="submit"
                    classes={{ root: classes.submitFormButton }}
                    onClick={ this.submitForm.bind(this, mutation) }>
                    Guardar Cambios
                    { loading && <CircularProgress className={classes.buttonProgress} size={24} /> }
                  </Button>
                )
              }
            }
          </Mutation>
        </Grid>
      </form>
    )
  }
}

export default withStyles(styles)(EditClientForm)
