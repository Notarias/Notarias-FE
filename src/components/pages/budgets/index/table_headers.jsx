import React      from 'react';
import TableHead  from '@material-ui/core/TableHead';
import TableCell  from '@material-ui/core/TableCell';
import SortHeader from '../../../ui/sort_header';
import TableRow   from '@material-ui/core/TableRow';

export default (props) => {
  const { field, direction, sortHandler } = props
  return(
    <TableHead>
      <TableRow>
        <SortHeader
          text={ "Cliente" }
          field_property={ "name" }
          current_field={ field }
          sort_direction={ direction }
          callback={ sortHandler }
        />
        <SortHeader
          text={ "Tramites" }
          field_property={ "procedure_name" }
          current_field={ field }
          sort_direction={ direction }
          callback={ sortHandler }
        />
        <SortHeader
          text={ "Total" }
          field_property={ "total" }
          current_field={ field }
          sort_direction={ direction }
          callback={ sortHandler }
        />
        <SortHeader
          text={ "Adeudo" }
          field_property={ "totalDebt" }
          current_field={ field }
          sort_direction={ direction }
          callback={ sortHandler }
        />
        <SortHeader
          text={ "Capital" }
          field_property={ "totalPaid" }
          current_field={ field }
          sort_direction={ direction }
          callback={ sortHandler }
        />
        <TableCell align="center">Opciones</TableCell>
      </TableRow>
    </TableHead>
  )
}
