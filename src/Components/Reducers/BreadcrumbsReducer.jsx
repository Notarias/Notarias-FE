const SET_BREADCRUMBS_LIST = 'SET_BREADCRUMBS_LIST';
const GO_TO_BREADCRUMB = 'GO_TO_BREADCRUMB';

export function setBreadcrumbsList(breadcrumbsList) {
  return { type: SET_BREADCRUMBS_LIST, breadcrumbsList };
}

// Loads the list of breadcrumbs from first to last
// Asumes that it will return all starting from index 0 
// until it finds one that matches
// it will return the full list if it doesn't find any
const loadCurrentBreadcrumb = (breadcrumbsList, toBreadcrumb) => {
  let currentBreadcrumb = []
  for(let step of breadcrumbsList) {
    if (step.name !== toBreadcrumb) { currentBreadcrumb.push(step) };
  }
  return(currentBreadcrumb);
}

export default function CurrentUserReducer(state = {}, action) {
  switch(action.type) {
    case SET_BREADCRUMBS_LIST:
      return action.breadcrumbsList
    default:
      return []
  }
}