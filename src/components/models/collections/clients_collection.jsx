import React from 'react';
import API, { cancelSource, cancelToken } from '../../../axios_config';
import { managePaginationAfter, managePaginationBefore } from '../../interfaces/parameter_manager';
import Client       from '../objects/client'

export default class ClientsCollection {
  constructor() {
    this.pagination = {
      per: 5,
      page: 0,
      total_records: 0
    }
    this.search_query = null
    this.clients = []
    this.timeout = 0
  }

  prepareParams({ page, per, sort, search }) {
    let params = {
                   page: page,
                   per: per || this.pagination.per,
                   sort: sort || { [this.sort.field]: this.sort.direction },
                   search: search || this.search_query
                 }
    managePaginationBefore(params)
    return params
  }

  search(search_params) {
    const callServer = this.load.bind(this)
    return new Promise((resolve, reject) => {
      callServer(search_params).then(resolve)
    })
  }

  cancelLoad() {
    cancelSource.cancel()
  }

  buildClients(clients) {
    return(
      clients.map((client) => {
        return new Client(client)
      })
    )
  }

  load(loading, error, data, new_params = {}) {
    let params = this.prepareParams(new_params)
    return new Promise((resolve, reject) => {
      const { loading, error, data } = {}

      if (error.graphQLErrors.length) {
        reject(error)
      } else {
        resolve({ loading, error, data })
      }
    })
    // return new Promise((resolve, reject) => {
    //   API.get(
    //     '/clients',
    //     { params: params },
    //     { cancelToken: cancelToken.token }
    //   ).then(response => {
    //     let meta = managePaginationAfter(response.data.meta)
    //     this.pagination = {
    //       page: meta.page,
    //       per: meta.per,
    //       total_records:  meta.total_records
    //     }
    //     this.sort = {
    //       field: Object.keys(params["sort"])[0],
    //       direction: Object.values(params["sort"])[0]
    //     }
    //     this.clients = this.buildClients(response.data.clients)
    //     this.search_query = params.search
    //     resolve()
    //   })
    // })
  }
}

