import axios from 'axios';
import store from './store';
import { signOut } from './Components/Reducers/SessionTokenReducer';
import { signOutUser } from './Components/Reducers/CurrentUserReducer'

let API = axios.create({
  baseURL: `https://peaceful-eyrie-59851.herokuapp.com`
});

API.defaults.headers.common['Authorization'] = localStorage.jwtToken

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
    if (error.response.status == 401) {
      localStorage.clear('jwtToken');
      store.dispatch(signOut());
      store.dispatch(signOutUser());
    } else if (error.response.status == 500) {

    }
    throw error;
  }
);


export default API;