import React, { Component } from 'react';
import InputText from "./input_with_icon"
import PersonIcon from '@material-ui/icons/Person';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import PersonPinCircleIcon from '@material-ui/icons/PersonPinCircle';
import PhoneIcon from '@material-ui/icons/Phone';
import MailIcon from '@material-ui/icons/Mail';
import Button from '@material-ui/core/Button';
import { withStyles }       from '@material-ui/core/styles';
import store from '../../../store';
import { gql }                 from 'apollo-boost';
import { Mutation }            from '@apollo/react-components';
import CircularProgress        from '@material-ui/core/CircularProgress';

const styles = {
  inputBase: {
    margin: '15px 20px ',
  },
  iconStyle: {
    marginBottom: '19px',
  }
}

const UPDATE_USER_PROFILE = gql`
mutation upsateUser($input: UpdateUserInput!) {
  updateUser(input: $input) {
    user {
      id
      lockedAt
      firstName
      lastName
      address
      phone
      role {
        name
        permanentLink
      }
    }
    errors
    pointers
  }
}
`

class GeneralForm extends Component {
  state = {
    id: store.getState().currentUser.id,
    firstName: store.getState().currentUser.first_name,
    lastName: store.getState().currentUser.last_name,
    address: store.getState().currentUser.address,
    email: store.getState().currentUser.email,
    phone: store.getState().currentUser.phone,
    errors: {},
    pristine: true,
    submitting: false,
  }

  onCompleteUpdate(data) {
    this.setState({ errors: data.updateUser.pointers || {} })
  }

  handleChange = ({ target }) => {
    const {name, value} = target
    this.setState({ [name]: value, pristine: false,})
  }

  canSubmit(loading) {
    if (this.state.pristine == true && !loading) {
      return true
    } else if (this.state.pristine == false && !loading) {
      return false
    } else if (this.state.pristine == false && loading) {
      return true
    }
  }

  onSubmit(e) {
    e.preventDefault()
  }

  render() {
    const { classes } = this.props
    let user = store.getState().currentUser
    return(
        <div>
          <form onSubmit={this.onSubmit.bind(this)}>
            <InputText errors={this.state.errors} errorsKey={"first_name"} name='firstName' handleChange={this.handleChange.bind(this)} value={this.state.firstName} label="nombre(s)" icon={ <PersonIcon className={classes.iconStyle}/>}/>
            <InputText errors={this.state.errors} errorsKey={"last_name"} name='lastName' handleChange={this.handleChange.bind(this)} value={this.state.lastName} label="apellido(s)" icon={ <PersonOutlineIcon className={classes.iconStyle}/>}/>
            <InputText errors={this.state.errors} errorsKey={"address"} name='address' handleChange={this.handleChange.bind(this)} value={this.state.address} label="direccion" icon={ <PersonPinCircleIcon className={classes.iconStyle}/>}/>
            <InputText errors={this.state.errors} errorsKey={"email"} name='email' handleChange={this.handleChange.bind(this)} value={this.state.email} label="e-mail" icon={ <MailIcon className={classes.iconStyle}/>}/>
            <InputText errors={this.state.errors} errorsKey={"phone"} name='phone' handleChange={this.handleChange.bind(this)} value={this.state.phone} label="telefono" icon={ <PhoneIcon className={classes.iconStyle}/>}/>
            <Mutation
              mutation={UPDATE_USER_PROFILE}
              onCompleted={this.onCompleteUpdate.bind(this)}
              variables={
                {
                  input: {
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                    address: this.state.address,
                    phone: this.state.phone,
                    id: this.state.id,
                  }
                }
              }>
              {
                (mutation, { loading, error, data }) => {
                  return(
                    <Button
                      disabled={this.canSubmit(loading)}
                      variant="contained"
                      color="primary"
                      type="submit"
                      className={classes.inputBase}
                      onClick={ mutation }>
                      Guardar Cambios
                      { loading && <CircularProgress className={classes.buttonProgress} size={14} /> }
                    </Button>
                  )
                }
              }
            </Mutation>
            
          </form>
        </div>
    )
  }
}

export default withStyles(styles)(GeneralForm);
