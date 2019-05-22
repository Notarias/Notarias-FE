export const FORM_LOAD_RECORD_DATA = 'form/LOAD_USER_DATA';

export function loadRecordData(payload) {
  return { type: FORM_LOAD_RECORD_DATA, payload };
}

export default function RecordFormReducer(state = {}, action) {
  switch(action.type) {
    case FORM_LOAD_RECORD_DATA:
      return action.payload
    default:
      return state
  }
}