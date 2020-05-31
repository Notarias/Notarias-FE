import React, { useEffect }         from 'react';
import MenuItem                     from '@material-ui/core/MenuItem';
import VisibilityOutlinedIcon       from '@material-ui/icons/VisibilityOutlined';
import BudgetsIcon                  from './../../../icons/presupuestos.svg';
import AppointmentsIcon             from './../../../icons/calendario.svg';
import ReportsIcon                  from './../../../icons/reportes.svg';
import FormsIcon                    from './../../../icons/tramites.svg';
import GenericDropdownMenu          from '../../ui/generic_dropdown_menu';
import CircularProgress             from '@material-ui/core/CircularProgress';
import TableRow                     from '@material-ui/core/TableRow';
import TableCell                    from '@material-ui/core/TableCell';
import TableBody                    from '@material-ui/core/TableBody';
import { useQuery }                 from '@apollo/react-hooks';
import Link                         from '@material-ui/core/Link';
import EditOutlinedIcon             from '@material-ui/icons/EditOutlined';
import Grid                         from '@material-ui/core/Grid';
import Typography                   from '@material-ui/core/Typography';
import { LOAD_CLIENTS }             from './clients_queries_and_mutations/queries';

export default (props) => {
  const { page, per, sortDirection, sortField, searchField, searchValue, classes } = props
  let variables = {
    page: page + 1,
    per: per,
    searchField: searchField,
    searchValue: searchValue,
    sortDirection: sortDirection,
    sortField: sortField
  }

  const { loading, data, refetch } = useQuery(
    LOAD_CLIENTS, { vairables: variables, errorPolicy: 'all' }
  );

  useEffect(() => {
    refetch(variables);
  }, [page, per, searchField, searchValue, sortField, sortDirection]);

  if (loading || !data) {
    return(
      <TableBody>
        <TableRow>
          <TableCell align="center" colSpan={4} className={classes.loadingTableCell}>
            <CircularProgress className={classes.searchLoadingIcon} size={100}/>
          </TableCell>
        </TableRow>
      </TableBody>
    )
  } else {
    return(
      <TableBody>
        {
          data.clients.map(client => (
            <TableRow key={client.id}>
              <TableCell align= "center">{client.firstName}</TableCell>
              <TableCell align= "center">{client.lastName}</TableCell>
              <TableCell align= "center">{client.rfc}</TableCell>
              <TableCell align= "center">
                <Grid>
                  <GenericDropdownMenu>
                    <MenuItem key={client.id + "-details"}>
                      <Link href={`/clients/${client.id}`} color="inherit" underline="none" style={{ width: "100%", height: "100%" }} >
                        <Grid container>
                          <VisibilityOutlinedIcon/>
                          <Typography style={{ paddingLeft: "11px" }} >
                            Detalles
                          </Typography>
                        </Grid>
                      </Link>
                    </MenuItem>
                    <MenuItem key={client.id + "-budgets"}>
                      <img alt={"presupuestos"} src={BudgetsIcon} style={{ width: "25px", height: "25px"}}/>
                      <span style={{paddingLeft: "10px"}}>
                        Presupuestos
                      </span>
                    </MenuItem>
                    <MenuItem key={client.id + "-agenda"}>
                      <img alt={"Agenda"} src={AppointmentsIcon} style={{ width: "26px", height: "26px"}}/>
                      <span style={{paddingLeft: "10px"}}>
                        Agenda
                      </span>
                    </MenuItem>
                    <MenuItem key={client.id + "-report"}>
                      <img alt={"Reporte"} src={ReportsIcon} style={{ width: "25px", height: "25px"}}/>
                      <span style={{paddingLeft: "10px"}}>
                        Reporte
                      </span>
                    </MenuItem>
                    <MenuItem key={client.id + "-procedures"}>
                      <img alt={"Trámites"} src={FormsIcon} style={{ width: "25px", height: "25px", paddingRight: "3px"}}/>
                      <span style={{paddingLeft: "10px"}}>
                        Trámites
                      </span>
                    </MenuItem>
                    <MenuItem key={client.id + "-edit"}>
                      <Link href={`/clients/${client.id}/edit`} color="inherit" underline="none" style={{ width: "100%", height: "100%" }} >
                        <Grid container>
                          <EditOutlinedIcon/>
                          <Typography style={{ paddingLeft: "11px" }} >
                            Trámites
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
}