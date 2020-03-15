import React from 'react';
import API, { cancelToken } from '../../../axios_config';

export default class Client {
  constructor(attributes) {
    this.attributes = {}
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

  assignAttributes(attributes = {}) {
    return new Promise((resolve, reject) => {
      for (let property of Object.keys(attributes)) {
        this.attributes[property] = attributes[property]
      }
      resolve()
    })
  }

  save() {
    return new Promise((resolve, reject) => {
      API.post('/clients', { client: this.attributes })
      .then(() => {
        resolve()
      }).catch((error) => {
        reject(error)
      })
    })
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
