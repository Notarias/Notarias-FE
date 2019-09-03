import React from 'react';

export const setParamsInterface = (new_params, deliverable_params) => {
  Object.keys(new_params).map((key) => {
    deliverable_params[key] = new_params[key]
  })
  return deliverable_params
}

export const managePaginationBefore = (deliverable_params) => {
  if (typeof(deliverable_params["page"]) !== "undefined") {
    deliverable_params["page"] = parseInt(deliverable_params["page"]) + 1 // pagination up because rails is index 1 based
  }
  return deliverable_params
}

export const managePaginationAfter = (meta_params) => {
  if (typeof(meta_params["page"]) !== "undefined") {
    meta_params["page"] = parseInt(meta_params["page"]) - 1 // pagination down because rails is index 1 based
    meta_params["per"] = parseInt(meta_params["per"])
    meta_params["pages"] = parseInt(meta_params["pages"])
    meta_params["total_records"] = parseInt(meta_params["total_records"])
  }
  return meta_params
}

export const sortHandler = (sort_field, current_sort_field, sort_direction, callServerFunction) => {
  if (sort_field === current_sort_field) {
    switch (sort_direction) {
    case "asc":
      sort_direction = "desc"
      break;
    case "desc":
      sort_direction = "asc"
      break;
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