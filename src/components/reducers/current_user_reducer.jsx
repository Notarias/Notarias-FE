const SIGNINUSER = 'SIGNINUSER';
const SIGNOUTUSER = 'SIGNOUTUSER';

export function signInUser(userProperties) {
  return { type: SIGNINUSER, userProperties };
}

export function signOutUser() {
  return { type: SIGNOUTUSER };
}

export default function CurrentUserReducer(state = {}, action) {
  switch(action.type) {
    case SIGNINUSER:
      return action.userProperties
    case SIGNOUTUSER:
      return null
    default:
      return state
  }
}