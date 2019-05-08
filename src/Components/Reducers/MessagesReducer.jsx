export const SET_MESSAGES = 'SET_MESSAGES';
export const CLEAR_MESSAGES = 'CLEAR_MESSAGES';
export const GENERIC_ERROR = 'GENERIC_ERROR';
export const GENERIC_ERROR_MESSAGE = "Algo ha sucedido, intenta de nuevo o contacta a tu administrador";
export const SERVER_ERROR_MESSAGE = "Ha sucedido un error con el servidor, intente de nuevo o contacte a su administrador";
export const SESSION_TIMEOUT_MESSAGE = "La sesión ha terminado por inactividad, vuelva a iniciar sesión."
export function setMessage(message) {
  return { type: SET_MESSAGES, message };
}

export function clearMessage() {
  return { type: CLEAR_MESSAGES };
}

export default function MessagesReducer(state = {}, action) {
  switch(action.type) {
    case SET_MESSAGES:
      return action.message
    case CLEAR_MESSAGES:
      return null
    default:
      return state
  }
}