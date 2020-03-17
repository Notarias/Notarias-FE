import React, { useEffect } from 'react';
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
import { gql }                      from 'apollo-boost';
import { useQuery }                 from '@apollo/react-hooks';

const LOAD_CLIENTS = gql`
  query searchClients($page: Int, $per: Int, $sortField: String, $sortDirection: String) {
    clients(page: $page, per: $per, sortField: $sortField, sortDirection: $sortDirection) {
      id
      firstName
      lastName
      rfc
    }
  }
`
export default (props) => {
  const { page, per, sortDirection, sortField, search, classes } = props
  let variables = {
    page: page + 1,
    per: per,
    search: search,
    sortDirection: sortDirection,
    sortField: sortField
  }

  const { loading, error, data, refetch } = useQuery(
    LOAD_CLIENTS, { vairables: variables, errorPolicy: 'all' }
  );

  useEffect(() => {
    refetch(variables);
  }, [page, per, search, sortField, sortDirection]);

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
                <div>
                  <GenericDropdownMenu>
                    <MenuItem key={client.id + "-details"}>
                      <VisibilityOutlinedIcon/>
                      <span style={{ paddingLeft: "10px" }}>
                        Detalles
                      </span>
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
                  </GenericDropdownMenu>
                </div>
              </TableCell>
            </TableRow>
          ))
        }
      </TableBody>
    )
  }
}