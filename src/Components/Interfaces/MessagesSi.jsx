import store from './../../store'
import { setMessage as setMessageAction } from './../Reducers/MessagesReducer';
import { clearMessage as clearMessageAction } from './../Reducers/MessagesReducer';

export const setMessage = (message) => {
  store.dispatch(setMessageAction(message))
}

export const clearMessage = (breadcrumbsList) => {
  store.dispatch(clearMessageAction())
}
