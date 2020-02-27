import React from 'react';
import API, { cancelToken } from '../../../axios_config';

export default class Client {
  constructor(attributes) {
    this.properties = [
      "id",
      "first_name",
      "last_name",
      "email",
      "created_at",
      "updated_at",
      "address",
      "phone",
      "rfc"
    ]
    this.assignAttributes(attributes)
  }

  load() {
    return new Promise((resolve, reject) => {
        API.get(`/clients/${this.id}`)
           .then((response) => {
             this.assignAttributes(response.data.client)
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
      API.patch(`/clients/${this.id}`, { client: params })
         .then((data) => {
           resolve(data)
         }).catch((error) => {
           reject(error)
         });
      })
  }
}