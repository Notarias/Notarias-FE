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
import { useQuery }                 from '@apollo/client';
import Link                         from '@material-ui/core/Link';
import Grid                         from '@material-ui/core/Grid';
import Typography                   from '@material-ui/core/Typography';
import { LOAD_CLIENTS }             from './clients_queries_and_mutations/queries';
import ClientPreviewDrawer          from './client_preview_drawer';


export default (props) => {
  const { page, per, sortDirection, sortField, searchField, searchValue, classes, setTotalRecords } = props
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

  useEffect(() => {
    data && setTotalRecords(data.clientsCount)
  }, [data]);

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
          data.clients.map(client => (
            <TableRow key={client.id}>
              <TableCell align= "center" colSpan={1}>
                <Grid>
                <ClientPreviewDrawer id={client.id}/>
                </Grid>
              </TableCell>
              <TableCell align= "center">{ client.firstName }</TableCell>
              <TableCell align= "center">{ client.lastName }</TableCell>
              <TableCell align= "center">{ client.rfc }</TableCell>
              <TableCell align= "center">{ client.curp }</TableCell>
              <TableCell align= "center">
                <Grid>
                  <GenericDropdownMenu>
                    <Link 
                      href={ `/clients/${client.id}` }
                      color="inherit"
                      underline="none"
                      className={ classes.linkWidthAndHeigth }
                    >
                      <MenuItem key={ client.id + "-details" }>
                        <Grid container>
                          <VisibilityOutlinedIcon/>
                          <Typography className={ classes.genericPaddingLeft } >
                            Detalles
                          </Typography>
                        </Grid>
                      </MenuItem>
                    </Link>
                    <MenuItem key={client.id + "-budgets"}>
                      <img alt={"presupuestos"} src={BudgetsIcon} className={ classes.imgIconGeneric }/>
                      <span className={ classes.genericPaddingLeft }>
                        Presupuestos
                      </span>
                    </MenuItem>
                    <MenuItem key={client.id + "-agenda"}>
                      <img alt={"Agenda"} src={AppointmentsIcon} className={ classes.imgIconGeneric }/>
                      <span className={ classes.genericPaddingLeft }>
                        Agenda
                      </span>
                    </MenuItem>
                    <MenuItem key={client.id + "-report"}>
                      <img alt={"Reporte"} src={ReportsIcon} className={ classes.imgIconGeneric }/>
                      <span className={ classes.genericPaddingLeft }>
                        Reporte
                      </span>
                    </MenuItem>
                    <MenuItem key={client.id + "-procedures"}>
                      <img alt={"Trámites"} src={FormsIcon} className={ classes.imgIconGeneric }/>
                      <span className={ classes.genericPaddingLeft }>
                      Trámites
                      </span>
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
