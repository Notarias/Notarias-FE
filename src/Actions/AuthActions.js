import axios from 'axios';

export function signIn(data) {
  return dispatch => {
    return axios.post('/authenticate', data)
      .then(
        res => {
          const token = res.data.token
          localStorage.setItem('jwtToken', token)
        }
      )
  }
}