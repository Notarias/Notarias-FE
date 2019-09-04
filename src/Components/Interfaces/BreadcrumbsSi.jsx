import store from './../../store'
import { setBreadcrumbsList as setBreadcrumbsAction } from './../Reducers/BreadcrumbsReducer'

export const setBreadcrumbsList = (breadcrumbsList) => {
  store.dispatch(setBreadcrumbsAction(breadcrumbsList))
}
