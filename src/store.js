import { createStore, combineReducers } from 'redux';
import CurrentUserReducer from './Components/Reducers/CurrentUserReducer';
import MessagesReducer    from './Components/Reducers/MessagesReducer';
import LoadingReducer     from './Components/Reducers/LoadingReducer';
import { reducer as formReducer } from 'redux-form';

const store = createStore(
  combineReducers({
    currentUser: CurrentUserReducer,
    message: MessagesReducer,
    loading: LoadingReducer,
    form: formReducer,
  }),
  {
    message: null,
    loading: false,
    currentUser: localStorage.currentUser ? JSON.parse(localStorage.currentUser) : null
  }
);
export default store;