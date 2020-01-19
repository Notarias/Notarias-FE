import { createStore, combineReducers } from 'redux';
import CurrentUserReducer from './Components/Reducers/CurrentUserReducer';
import MessagesReducer    from './Components/Reducers/MessagesReducer';
import BreadcrumbsReducer from './Components/Reducers/BreadcrumbsReducer';
import { reducer as formReducer } from 'redux-form';
import compose                    from 'recompose/compose';

const REDUCERS_LIST = {
  currentUser: CurrentUserReducer,
  message: MessagesReducer,
  form: formReducer,
  breadcrumbs: BreadcrumbsReducer
}

const DEFAULT_STORE_VALUES = {
  message: null,
  currentUser: localStorage.currentUser ? JSON.parse(localStorage.currentUser) : null
}

const buildStore = (reduxDevtools, compositeReduxDevtools) => {
  if(reduxDevtools) { 
    compositeReduxDevtools = compose(reduxDevtools())
  }
  if(compositeReduxDevtools) {
    return createStore(
      combineReducers(REDUCERS_LIST),
      DEFAULT_STORE_VALUES,
      compositeReduxDevtools
    );
  } else {
    return createStore(
      combineReducers(REDUCERS_LIST),
      DEFAULT_STORE_VALUES
    );
  }
}

export default buildStore(window.__REDUX_DEVTOOLS_EXTENSION__);