import API, { cancelSource, cancelToken } from '../../../axios_config';
import { managePaginationAfter, managePaginationBefore } from '../../interfaces/parameter_manager';
import User from '../objects/user'

export default class UsersCollection {
  constructor() {
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
    this.users = []
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

  buildUsers(users) {
    return(
      users.map((user) => {
        return new User(user)
      })
    )
  }

  load(new_params = {}) {
    let params = this.prepareParams(new_params)
    return new Promise((resolve, reject) => {
      API.get(
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
        resolve()
      })
    })
  }
}

