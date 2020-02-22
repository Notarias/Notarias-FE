import React from 'react';
import API, { cancelSource, cancelToken } from '../../../axios_config';
import { GENERIC_FORM_ERROR } from '../../reducers/messages_reducer';
import { setMessage }         from '../../interfaces/messages_interface';
import { useHistory } from "react-router-dom";

export default class User {
  constructor(attributes, parent) {
    this.parent = parent
    this.properties = [
      "id",
      "first_name",
      "last_name",
      "email",
      "created_at",
      "updated_at",
      "role_permanent_link",
      "avatars",
      "locked_at",
      "role"
    ]
    this.assignAttributes(attributes)
  }

  load() {
    API.get(`/users/${this.id}`)
       .then((response) => {
         this.parent.setState({ loading: false })
         this.assignAttributes(response.data.user)
         this.parent.setState({ user: this })
       })
  }

  assignAttributes(attributes) {
    for (let property of this.properties) {
      this[property] = attributes[property]
    }
  }

  async update(params) {
    await API.patch(`/users/${this.id}`,{ user: params })
            .then((data) => {
              setMessage({ type: "success", text: "Usuario actualizado, redirigiendo..." })
              this.parent.setState({ loading: false })
              setTimeout(() => { this.parent.props.history.push('/users') }, 2000)
            }).catch((error) => {
              if (error.response && error.response.status === 422 ) {
                this.parent.setState({
                  errorMessage: GENERIC_FORM_ERROR,
                  errors: error.response.data.pointers,
                  loading: false
                })
              }
            });
  }

  lock() {
    API.patch(`/users/${this.id}/lock`, { cancelToken: cancelToken.token })
      .then((response) => { this.parent.updateUserInList(response, this) })
  }

  unlock() {
    API.patch(`/users/${this.id}/unlock`, { cancelToken: cancelToken.token })
      .then((response) => { this.parent.updateUserInList(response, this) })
  }
}