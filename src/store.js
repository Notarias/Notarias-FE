import { createStore, combineReducers } from 'redux';
import SessionTokenReducer from './Components/Reducers/SessionTokenReducer';
import CurrentUserReducer from './Components/Reducers/CurrentUserReducer';
import { reducer as formReducer } from 'redux-form'

const store = createStore(
  combineReducers({
    sessionToken: SessionTokenReducer,
    currentUser: CurrentUserReducer,
    form: formReducer,
  }),
  {
    sessionToken: localStorage.jwtToken,
    currentUser: localStorage.currentUser ? JSON.parse(localStorage.currentUser) : null
  }
);

export default store;