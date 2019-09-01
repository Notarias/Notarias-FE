import React from 'react';
import store from './../../store'
import { startLoading, stopLoading } from './../Reducers/LoadingReducer'

export const startLoading = () => {
  store.dispatch(startLoading())
}

export const stopLoading = () => {
  store.dispatch(stopLoading())
}