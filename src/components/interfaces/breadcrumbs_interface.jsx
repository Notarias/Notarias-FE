import store from '../../store'
import { setBreadcrumbsList as setBreadcrumbsAction } from '../reducers/breadcrumbs_reducer'

export const setBreadcrumbsList = (breadcrumbsList) => {
  store.dispatch(setBreadcrumbsAction(breadcrumbsList))
}
