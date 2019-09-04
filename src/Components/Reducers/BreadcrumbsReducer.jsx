const SET_BREADCRUMBS_LIST = 'SET_BREADCRUMBS_LIST';

export const setBreadcrumbsList = (breadcrumbsList) => {
  return { type: SET_BREADCRUMBS_LIST, breadcrumbsList };
}

export default function CurrentUserReducer(state = {}, action) {
  switch(action.type) {
    case SET_BREADCRUMBS_LIST:
      return action.breadcrumbsList
    default:
      return state
  }
}