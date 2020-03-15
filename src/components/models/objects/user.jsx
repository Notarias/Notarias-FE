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
    return new Promise((resolve, reject) => {
      for (let property of this.properties) {
        this[property] = attributes[property]
      }
      resolve()
    })
  }

  update(params) {
    return new Promise((resolve, reject) => {
      API.patch(`/users/${this.id}`, { user: params })
         .then((response) => {
           this.assignAttributes(response.data.user)
           resolve(response)
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