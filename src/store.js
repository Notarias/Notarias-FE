import { createStore, combineReducers } from 'redux';
import SessionReducer from './Components/Reducers/SessionReducer';
import { reducer as formReducer } from 'redux-form'

const store = createStore(combineReducers({
  sessionToken: SessionReducer,
  form: formReducer,
}));

export default store;