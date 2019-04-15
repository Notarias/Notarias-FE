import axios from 'axios';
const SIGNIN = 'SIGNIN';
const SIGNOUT = 'SIGNOUT';

export function signIn(sessionToken) {
  return { type: SIGNIN, sessionToken };
}

export default function SessionReducer(state = null, action) {
  switch(action.type) {
    case SIGNIN:
      return action.sessionToken
    case SIGNOUT:
      return state
    default:
      return state
  }
}