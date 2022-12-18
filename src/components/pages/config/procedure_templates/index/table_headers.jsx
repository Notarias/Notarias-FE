import React      from 'react';
import TableHead  from '@material-ui/core/TableHead';
import TableCell  from '@material-ui/core/TableCell';
import SortHeader from '../../../../ui/sort_header';
import TableRow   from '@material-ui/core/TableRow';

export default (props) => {
  const { field, direction, sortHandler } = props
  return(
    <TableHead>
      <TableRow>
        <SortHeader
          text={ "Nombre del Presupuesto" }
          field_property={ "name" }
          current_field={ field }
          sort_direction={ direction }
          callback={ sortHandler }
        />
        <SortHeader
          text={ "Número de serie" }
          field_property={ "serial_number" }
          current_field={ field }
          sort_direction={ direction }
          callback={ sortHandler }
        />
        <SortHeader
          text={ "Estado" }
          field_property={ "status" }
          current_field={ field }
          sort_direction={ direction }
          callback={ sortHandler }
        />
        <SortHeader
          text={"Presupuestos"}
          current_field={ field }
          sort_direction={ direction }
          callback={ sortHandler }
        />
        <SortHeader
          text={ "Trámites" }
          current_field={ field }
          sort_direction={ direction }
          callback={ sortHandler }
        />
        <SortHeader
          text={ "Versión" }
          field_property={ "version" }
          current_field={ field }
          sort_direction={ direction }
          callback={ sortHandler }
        />
        <TableCell align="center">Opciones</TableCell>
      </TableRow>
    </TableHead>
  )
}
