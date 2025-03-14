import React           from 'react';
import TableCell       from '@material-ui/core/TableCell';
import TableSortLabel  from '@material-ui/core/TableSortLabel';
import { sortHandler } from './sort_handler';

export default (props) => {
  let { text, field_property, current_field, sort_direction, callback } = props

  return(
    <TableCell align="center">
      <TableSortLabel
        active={current_field === field_property}
        direction={sort_direction}
        onClick={sortHandler(field_property, current_field, sort_direction, callback)}
      >
        {text}
      </TableSortLabel>
    </TableCell>
  )
}