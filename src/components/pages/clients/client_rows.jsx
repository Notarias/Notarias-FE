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
import { gql }                      from 'apollo-boost';
import { useQuery }                 from '@apollo/react-hooks';

const LOAD_CLIENTS = gql`
  query searchClients($page: Int, $per: Int) {
    clients(page: $page, per: $per) {
      firstName
      lastName
    }
  }
`
export default (props) => {
  const { page, per, sort, search, classes } = props
  let variables = {
    page: page + 1,
    per: per,
    search: search,
    sort: sort
  }

  const { loading, error, data, refetch } = useQuery(
    LOAD_CLIENTS, { vairables: variables, errorPolicy: 'all' }
  );

  useEffect(() => {
    refetch(variables);
  }, [page, per, search, sort]);

  return(
    (loading && !data ? <TableRow>
                <TableCell align="center" colSpan={4} className={classes.loadingTableCell}>
                  <CircularProgress className={classes.searchLoadingIcon} size={100}/>
                </TableCell>
              </TableRow> :
                data.clients.map(client => (
                  <TableRow  key={client.id}>
                    <TableCell align= "center">{client.firstName}</TableCell>
                    <TableCell align= "center">{client.lastName}</TableCell>
                    <TableCell align= "center">{client.rfc}</TableCell>
                    <TableCell align= "center">
                      <div>
                        <GenericDropdownMenu>
                          <MenuItem>
                            <VisibilityOutlinedIcon/>
                            <span style={{ paddingLeft: "10px" }}>
                              Detalles
                            </span>
                          </MenuItem>
                          <MenuItem>
                            <img alt={"presupuestos"} src={BudgetsIcon} style={{ width: "25px", height: "25px"}}/>
                            <span style={{paddingLeft: "10px"}}>
                              Presupuestos
                            </span>
                          </MenuItem>
                          <MenuItem>
                            <img alt={"Agenda"} src={AppointmentsIcon} style={{ width: "26px", height: "26px"}}/>
                            <span style={{paddingLeft: "10px"}}>
                              Agenda
                            </span>
                          </MenuItem>
                          <MenuItem>
                            <img alt={"Reporte"} src={ReportsIcon} style={{ width: "25px", height: "25px"}}/>
                            <span style={{paddingLeft: "10px"}}>
                              Reporte
                            </span>
                          </MenuItem>
                          <MenuItem>
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
    )
  )
}