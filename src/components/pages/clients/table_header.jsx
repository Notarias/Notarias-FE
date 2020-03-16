import React      from 'react';
import TableHead  from '@material-ui/core/TableHead';
import TableCell  from '@material-ui/core/TableCell';
import SortHeader from '../../ui/sort_header';
import TableRow   from '@material-ui/core/TableRow';

export default (props) => {
  const { field, direction, sortHandler } = props
  return(
    <TableHead>
      <TableRow>
        <SortHeader
          text={"Nombre"}
          field_property={"first_name"}
          current_field={field}
          sort_direction={direction}
          callback={sortHandler}
        />
        <SortHeader
          text={"Apellido"}
          field_property={"last_name"}
          current_field={field}
          sort_direction={direction}
          callback={sortHandler}
        />
        <SortHeader
          text={"RFC"}
          field_property={"email"}
          current_field={field}
          sort_direction={direction}
          callback={sortHandler}
        />
        <TableCell align="center">Opciones</TableCell>
      </TableRow>
    </TableHead>
  )
}