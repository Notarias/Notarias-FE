import React from 'react';
import API, { cancelToken } from '../../../axios_config';

export default class User {
  constructor(attributes) {
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
    return new Promise((resolve, reject) => {
        API.get(`/users/${this.id}`)
           .then((response) => {
             this.assignAttributes(response.data.user)
             resolve(this)
           }).catch((error) => {
             reject(error)
           })
      })
  }

  assignAttributes(attributes) {
    for (let property of this.properties) {
      this[property] = attributes[property]
    }
  }

  update(params) {
    return new Promise((resolve, reject) => {
      API.patch(`/users/${this.id}`, { user: params })
         .then((data) => {
           resolve(data)
         }).catch((error) => {
           reject(error)
         });
      })
  }

  lock() {
    return new Promise((resolve, reject) => {
      API.patch(`/users/${this.id}/lock`, { cancelToken: cancelToken.token })
         .then((response) => {
           this.assignAttributes(response.data.user)
           resolve(this)
         })
      })
  }

  unlock() {
    return new Promise((resolve, reject) => {
      API.patch(`/users/${this.id}/unlock`, { cancelToken: cancelToken.token })
         .then((response) => {
           this.assignAttributes(response.data.user)
           resolve(this)
         })
      })
  }
}