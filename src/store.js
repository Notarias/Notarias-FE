import { createStore, combineReducers } from 'redux';
import CurrentUserReducer from './Components/Reducers/CurrentUserReducer';
import MessagesReducer    from './Components/Reducers/MessagesReducer';
import LoadingReducer     from './Components/Reducers/LoadingReducer';
import RecordFormReducer  from './Components/Reducers/RecordFormReducer';
import { reducer as formReducer } from 'redux-form';
import compose                    from 'recompose/compose';

const buildStore = (reduxDevtools, compositeReduxDevtools) => {
  if(reduxDevtools) { 
    compositeReduxDevtools = compose(reduxDevtools())
  }
  if(compositeReduxDevtools) {
    return createStore(
      combineReducers({
        currentUser: CurrentUserReducer,
        message: MessagesReducer,
        loading: LoadingReducer,
        form: formReducer,
        editRecordData: RecordFormReducer,
      }),
      {
        message: null,
        loading: false,
        currentUser: localStorage.currentUser ? JSON.parse(localStorage.currentUser) : null
      },
      compositeReduxDevtools
    );
  } else {
    return createStore(
      combineReducers({
        currentUser: CurrentUserReducer,
        message: MessagesReducer,
        loading: LoadingReducer,
        form: formReducer,
        editRecordData: RecordFormReducer,
      }),
      {
        message: null,
        loading: false,
        currentUser: localStorage.currentUser ? JSON.parse(localStorage.currentUser) : null
      }
    );
  }
}

export default buildStore(window.__REDUX_DEVTOOLS_EXTENSION__);