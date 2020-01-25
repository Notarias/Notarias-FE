import store from '../../store'
import { setMessage as setMessageAction } from '../reducers/messages_reducer';
import { clearMessage as clearMessageAction } from '../reducers/messages_reducer';

export const setMessage = (message) => {
  store.dispatch(setMessageAction(message))
}

export const clearMessage = (breadcrumbsList) => {
  store.dispatch(clearMessageAction())
}
