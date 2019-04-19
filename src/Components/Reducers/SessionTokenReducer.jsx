const SIGNIN = 'SIGNIN';
const SIGNOUT = 'SIGNOUT';

export function signIn(sessionToken) {
  return { type: SIGNIN, sessionToken }
}

export function signOut() {
  return { type: SIGNOUT }
}

export default function SessionTokenReducer(state = "", action) {
  switch(action.type) {
    case SIGNIN:
      return action.sessionToken
    case SIGNOUT:
      return state
    default:
      return state
  }
}