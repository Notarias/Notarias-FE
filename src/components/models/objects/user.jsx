import React from 'react';
import API, { cancelSource, cancelToken } from '../../../axios_config'

const PROPERTIES = [
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

export default class User {
  constructor(attributes, parent_list) {
    this.assignAttributes(attributes)
    this.parent_list = parent_list
  }

  assignAttributes(attributes) {
    for (let property of PROPERTIES) {
      this[property] = attributes[property]
    }
  }

  lock() {
    API.patch(`/users/${this.id}/lock`, { cancelToken: cancelToken.token })
      .then((response) => { this.parent_list.updateUserInList(response, this) })
  }

  unlock() {
    API.patch(`/users/${this.id}/unlock`, { cancelToken: cancelToken.token })
      .then((response) => { this.parent_list.updateUserInList(response, this) })
  }
}