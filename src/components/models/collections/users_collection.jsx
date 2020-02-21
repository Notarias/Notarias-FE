import React from 'react';
import API, { cancelSource, cancelToken } from '../../../axios_config';
import { managePaginationAfter, managePaginationBefore } from '../../interfaces/parameter_manager';
import update from 'react-addons-update';
import User from '../objects/user'

export default class UsersCollection {
  constructor(parent) {
    this.pagination = {
      per: 5,
      page: 0,
      total_records: 0
    }
    this.sort = {
      field: "first_name",
      direction: "desc"
    }
    this.search_query = null
    this.searchLoading = false
    this.loading = true
    this.users = []
    this.parent = parent
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

  search(event) {
    this.timeout && clearTimeout(this.timeout)
    let predicate = event.currentTarget.attributes.predicate.value
    let searchText = event.target.value
    const search = { search: { [predicate]: searchText } }
    const callServer = this.load.bind(this)

    new Promise((resolve, reject) => {
      this.searchLoading = true
      this.parent.forceUpdate()
      resolve()
    }).then((val) => {
      this.timeout = setTimeout(() => { callServer(search) }, 2000)
    })
    return searchText
  }

  cancelLoad() {
    cancelSource.cancel()
  }

  updateUserInList(response, user) {
    let index = this.users.findIndex(oldUser => oldUser.id === user.id)
    let updateObj = {}
    updateObj[index] = { $set: new User(response.data.user, this) }
    this.users = update(this.users, updateObj)
    this.parent.forceUpdate()
  }

  buildUsers(users) {
    return(
      users.map((user) => {
        return new User(user, this)
      })
    )
  }

  async load(new_params = {}) {
    let params = this.prepareParams(new_params)
    await API.get(
            '/users',
            { params: params },
            { cancelToken: cancelToken.token }
          ).then(response => {
            let meta = managePaginationAfter(response.data.meta)
            this.pagination = {
              page: meta.page,
              per: meta.per,
              total_records:  meta.total_records
            }
            this.sort = {
              field: Object.keys(params["sort"])[0],
              direction: Object.values(params["sort"])[0]
            }
            this.users = this.buildUsers(response.data.users)
            this.search_query = params.search
            this.loading = false
            this.searchLoading = false
          })
    this.parent.forceUpdate()
    return this.data
  }
}

