import React      from 'react';
import TableHead  from '@material-ui/core/TableHead';
import TableCell  from '@material-ui/core/TableCell';
import SortHeader from '../../../ui/sort_header';
import TableRow   from '@material-ui/core/TableRow';

const TableHeaders = (props) => {
  const { field, direction, sortHandler } = props
  return(
    <TableHead>
      <TableRow>
        <SortHeader
          text="No. de serie"
          field_property="serial_number"
          current_field={ field }
          sort_direction={ direction }
          callback={ sortHandler }
        />
        <SortHeader
          text="Trámite"
          field_property="procedures_template_name"
          current_field={ field }
          sort_direction={ direction }
          callback={ sortHandler }
        />
        <SortHeader
          text="Presupuesto"
          field_property="budgeting_template_name"
          current_field={ field }
          sort_direction={ direction }
          callback={ sortHandler }
        />
        <SortHeader
          text="Cliente"
          field_property="client_name"
          current_field={ field }
          sort_direction={ direction }
          callback={ sortHandler }
        />
        <SortHeader
          text="Responsable"
          field_property="reporter_avatarThumbUrl"
          current_field={ field }
          sort_direction={ direction }
          callback={ sortHandler }
        />
        <SortHeader
          text="Fecha Inicial"
          field_property="status"
          current_field={ field }
          sort_direction={ direction }
          callback={ sortHandler }
        />
        <SortHeader
          text="Estatus"
          field_property="status"
          current_field={ field }
          sort_direction={ direction }
          callback={ sortHandler }
        />
        <TableCell align="center">Opciones</TableCell>
      </TableRow>
    </TableHead>
  )
}

export default TableHeaders;
