import axios from 'axios';
import store from './store';
import { signOutUser } from './components/reducers/current_user_reducer';
import { GENERIC_ERROR_MESSAGE,
         SERVER_ERROR_MESSAGE,
         SESSION_TIMEOUT_MESSAGE,
        } from './components/reducers/messages_reducer';
import { setMessage } from './components/interfaces/messages_interface';


let API = axios.create({
  baseURL: `https://peaceful-eyrie-59851.herokuapp.com`
});

export const cancelToken = axios.CancelToken;
export const cancelSource = cancelToken.source();

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
        setMessage({ type: "error", text: GENERIC_ERROR_MESSAGE })
      } else if(error.response.status === 401) {
        localStorage.clear('jwtToken');
        store.dispatch(signOutUser());
        setMessage({ type: "error", text: SESSION_TIMEOUT_MESSAGE })
        history.location = '/sign_in';
      } else if (error.response.status === 500) {
        setMessage({ type: "error", text: SERVER_ERROR_MESSAGE })
      } else if (error.response.status === 403) {
        setMessage({ type: "error", text: SERVER_ERROR_MESSAGE })
      }
      throw error;
    }
  );
}
export default API;