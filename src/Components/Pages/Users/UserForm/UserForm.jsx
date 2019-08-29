import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import renderTextField      from './../../../Ui/renderTextField';
import RoleSelectDropdown   from './RoleSelectDropdown';
import Button               from '@material-ui/core/Button';
import API                  from './../../../../axiosConfig';
import MenuItem             from '@material-ui/core/MenuItem';
import { connect }          from 'react-redux'
import compose              from 'recompose/compose';
import withStyles           from '@material-ui/core/styles/withStyles';
import { styles }           from './styles';
import CircularProgress     from '@material-ui/core/CircularProgress';

class  UserForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      requiredFields: this.props.requiredFields,
      notRequiredFields: this.props.notRequiredFields,
      roles: [],
      errors: this.props.errors
    }
  }

  componentDidMount() {
    API.get("/roles").then((response) => {
      this.setState({ roles: response.data.roles })
    });
  }

  requiredFields() {
    return this.state.requiredFields && this.buildFields(this.state.requiredFields, true)
  }

  notRequiredFields() {
    return this.state.notRequiredFields && this.buildFields(this.state.notRequiredFields, false)
  }

  buildFields(fields, required) {
    let { errors } = this.props
    return Object.keys(fields).reduce((result, key) => {
      result.push(
        <Field
        key={key} 
        name={key}
        type={this.fieldType(key)}
        id={key}
        label={fields[key]}
        meta={{ error: errors[key], touched: errors[key] }}
        required={required}
        component={renderTextField} />
      )
      return result;
    }, [])
  }

  fieldType(key) {
    return key === "password" ? "password" : "text" && key === "password_confirmation" ? "password" : "text"
  }

  render() {
    const { handleSubmit, pristine, submitting, userData, errors, classes, loading } = this.props
    return (
      <form onSubmit={handleSubmit} >
        {this.requiredFields()}
        {this.notRequiredFields()}
        <Field
          key={"role_permanent_link"} 
          name={"role_permanent_link"}
          label={"Rol"}
          selected={(userData && userData.role_permanent_link) || ""}
          meta={{ error: errors["role"], touched: errors["role"] }}
          required={true}
          component={RoleSelectDropdown}>
            {
              this.state.roles.map((item, key) =>
                <MenuItem key={key} value={item.permanent_link}>
                  <em>{item.name}</em>
                </MenuItem>
              )
            }
          </Field>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          disabled={loading || pristine || submitting || !this.state.roles.length}
        >
          Guardar
          { loading && <CircularProgress size={24} className={classes.buttonProgress}/> }
        </Button>
      </form>
    );
  }
}

const mapStateToProps = (state, props) => (
  {
    initialValues: state.editRecordData,
  }
)

export default compose(
  withStyles(styles),
  connect(mapStateToProps)
)(reduxForm({ form: 'userForm', enableReinitialize: true })(UserForm));
