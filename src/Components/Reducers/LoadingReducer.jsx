const START_LOADING = 'START_LOADING';
const STOP_LOADING  = 'STOP_LOADING';

export function startLoading() {
  return { type: START_LOADING };
}

export function stopLoading() {
  return { type: STOP_LOADING };
}

export default function LoadingReducer(state = {}, action) {
  switch(action.type) {
    case START_LOADING:
      return true
    case STOP_LOADING:
      return false
    default:
      return state
  }
}