export const sortHandler = (sort_field, current_sort_field, sort_direction, callServerFunction) => {
  if (sort_field === current_sort_field) {
    switch (sort_direction) {
    case "asc":
      sort_direction = "desc"
      break;
    case "desc":
      sort_direction = "asc"
      break;
    default:
    }
  } else {
    sort_direction = "desc"
  }
  return (event) => {
    callServerFunction(
      { sort: { [sort_field]: sort_direction } },
      { sort_direction, sort_field }
    )
  } 
}
