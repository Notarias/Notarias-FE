import axios from 'axios';
import store from './store';
import { signOutUser } from './Components/Reducers/CurrentUserReducer';
import { GENERIC_ERROR_MESSAGE,
         SERVER_ERROR_MESSAGE,
         SESSION_TIMEOUT_MESSAGE,
         setMessage } from './Components/Reducers/MessagesReducer';

let API = axios.create({
  baseURL: `https://peaceful-eyrie-59851.herokuapp.com`
});

export const setupAxiosRouter = (history) => {
  API.interceptors.request.use(function(config){
      if (localStorage.jwtToken) {
        config.headers.Authorization = localStorage.jwtToken;
      }
      return config
    },
    error => Promise.reject(error)
  );

  API.interceptors.response.use(function (response) {
      // Do something with response data
      return response;
    }, function (error) {
    // Do something with response error
      if (!error.response) {
        store.dispatch(setMessage({ type: "error", text: GENERIC_ERROR_MESSAGE }))
      } else if(error.response.status === 401) {
        localStorage.clear('jwtToken');
        store.dispatch(signOutUser());
        store.dispatch(setMessage({ type: "error", text: SESSION_TIMEOUT_MESSAGE }))
        history.push('/sign_in');
      } else if (error.response.status === 500) {
        store.dispatch(setMessage({ type: "error", text: SERVER_ERROR_MESSAGE }))
      }
      throw error;
    }
  );
}




export default API;