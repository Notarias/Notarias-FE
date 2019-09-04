import store from './../../store'
import { startLoading, stopLoading } from './../Reducers/LoadingReducer'

export const startLoadingBar = () => {
  store.dispatch(startLoading())
}

export const stopLoadingBar = () => {
  store.dispatch(stopLoading())
}