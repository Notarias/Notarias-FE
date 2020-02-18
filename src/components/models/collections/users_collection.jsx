import React, { useState } from 'react';
import API, { cancelSource, cancelToken } from '../../../axios_config';
import { setParamsInterface }                            from '../../interfaces/parameter_manager';
import { managePaginationAfter, managePaginationBefore } from '../../interfaces/parameter_manager';

export default class UsersCollection {
  constructor(parentDataObserver) {
    this.data = {
      per: 5
    }
    this.searchLoading = false
    this.loading = true
    this.users = []
    this.sort_field = "first_name"
    this.sort_direction = "desc"
    this.parentDataObserver = parentDataObserver
    this.timeout = 0
  }

  prepareParams(new_params) {
    let deliverable_params = Object.assign({}, this.data)
    setParamsInterface(new_params, deliverable_params)
    managePaginationBefore(deliverable_params)
    return deliverable_params
  }

  search(event, templateComponent) {
    this.timeout && clearTimeout(this.timeout)

    let searchText = event.target.value
    const search = { search: { "all_fields.cont": searchText } }
    const callServer = this.load.bind(this)

    new Promise((resolve, reject) => {
      this.searchLoading = true
      templateComponent.forceUpdate()
      resolve()
    }).then((val) => {
      this.timeout = setTimeout(() => { callServer(search) }, 2000)
    })
    return searchText
  }

  async load(new_params = {}, extra_data = {}) {
    let params = this.prepareParams(new_params)
    await API.get(
            '/users',
            { params: params },
            { cancelToken: cancelToken.token }
          ).then(response => {
            let meta = managePaginationAfter(response.data.meta)
            this.data = {
              page: meta.page,
              per: meta.per,
              sort: params.sort,
              search: params.search
            }
            this.total_records = meta.total_records
            this.loading = false
            this.sort_direction = extra_data.sort_direction
            this.sort_field = extra_data.sort_field
            this.users = response.data.users
            this.searchLoading = false
          })
    this.parentDataObserver(this)
    return this.data
  }
}

