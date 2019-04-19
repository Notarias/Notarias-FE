import axios from 'axios';
import store from './store';
import signOut from './Components/Reducers/SessionReducer';

let API = axios.create({
  baseURL: `http://localhost:3000`,
  headers: { 'Authorization': localStorage.jwtToken }
});

API.interceptors.response.use(function (response) {
    // Do something with response data
    return response;
  }, function (error) {
  // Do something with response error
    if (error.response.status === 401) {
      localStorage.clear('jwtToken');
      store.dispatch(signOut());
    }
    throw error;
  }
);


export default API;