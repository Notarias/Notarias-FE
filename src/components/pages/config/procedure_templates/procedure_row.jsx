import React, { useEffect }           from 'react'
import CircularProgress               from '@material-ui/core/CircularProgress';
import TableRow                       from '@material-ui/core/TableRow';
import TableCell                      from '@material-ui/core/TableCell';
import TableBody                      from '@material-ui/core/TableBody';
import Grid                           from '@material-ui/core/Grid';
import GenericDropdownMenu            from '../../../ui/generic_dropdown_menu';
import CreateIcon                     from '@material-ui/icons/Create';
import MenuItem                     from '@material-ui/core/MenuItem';
import Link                         from '@material-ui/core/Link';
import Typography                   from '@material-ui/core/Typography';
import { useQuery }                   from '@apollo/react-hooks';
import { PROCEDURE_TEMPLATES }        from './queries_and_mutations/queries';

const procedureRow = (props) => {

  const { page, per, sortDirection, sortField, searchField, searchValue, assingTotalRecords, classes } = props
  let variables = {
    page: page + 1,
    per: per,
    searchField: searchField,
    searchValue: searchValue,
    sortDirection: sortDirection,
    sortField: sortField
  }

  const { loading, data, refetch } = useQuery(
    PROCEDURE_TEMPLATES, { vairables: variables }
  );

  let totalCount = data && data.procedureTemplatesCount

  const serial = data && data.procedureTemplates.serialNumber
  const folioNumber = (serial) => {

    return serial && serial.toString().padStart(5, "0")
  }

  useEffect(() => {
    refetch(variables);
    assingTotalRecords(totalCount)
  }, [page, per, searchField, searchValue, sortField, sortDirection, totalCount]);

  console.log(data.procedureTemplates.serialNumber)

  if (loading || !data) {
    return(
      <TableBody>
        <TableRow>
          <TableCell align="center" colSpan={3} className={classes.loadingTableCell}>
            <CircularProgress className={classes.searchLoadingIcon} size={100}/>
          </TableCell>
        </TableRow>
      </TableBody>
    )
  } else {
    return(
      <TableBody>
        {
          data.procedureTemplates.map(procedureTemplate => (
            <TableRow key={ procedureTemplate.id }>
              <TableCell align= "center">{ procedureTemplate.name }</TableCell>
              <TableCell align= "center">{ folioNumber(procedureTemplate.serialNumber) }</TableCell>
              <TableCell align= "center">tramites abiertos</TableCell>
              <TableCell align= "center">costo de presupuesto</TableCell>
              <TableCell align= "center">
                <Grid>
                  <GenericDropdownMenu>
                    <MenuItem key={ procedureTemplate.id + "-edit" }>
                      <Link 
                        href={ "" }
                        color="inherit"
                        underline="none"
                      >
                        <Grid container>
                          <CreateIcon/>
                          <Typography variant="button" display="block" gutterBottom >
                            Editar
                          </Typography>
                        </Grid>
                      </Link>
                    </MenuItem>
                    <MenuItem key={ procedureTemplate.id + "-status" }>
                      <Link 
                        href={ "" }
                        color="inherit"
                        underline="none"
                      >
                        <Grid container>
                          <Typography variant="button" display="block" gutterBottom >
                            Activar/Desactivar
                          </Typography>
                        </Grid>
                      </Link>
                    </MenuItem>
                  </GenericDropdownMenu>
                </Grid>
              </TableCell>
            </TableRow>
          ))
        }
      </TableBody>
    )
  }
};

export default procedureRow;
