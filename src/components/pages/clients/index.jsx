import React, { useState, useEffect }      from 'react';
import { withStyles }                      from '@material-ui/core/styles';
import Table                               from '@material-ui/core/Table';
import Paper                               from '@material-ui/core/Paper';
import TableRow                            from '@material-ui/core/TableRow';
import Grid                                from '@material-ui/core/Grid';
import Dialog                              from '@material-ui/core/Dialog';
import DialogTitle                         from '@material-ui/core/DialogTitle';
import DialogContent                       from '@material-ui/core/DialogContent';
import { styles }                          from './styles';
import TableHeaders                        from './table_headers';
import ClientRows                          from './client_rows';
import TableFooter                         from '@material-ui/core/TableFooter';
import TablePagination                     from '@material-ui/core/TablePagination';
import ControlsBar                         from './controls_bar';
import NewClientForm                       from './new';
import Breadcrumbs                         from '../../ui/breadcrumbs';

const BREADCRUMBS = [
  { name: "Inicio", path: "/" },
  { name: "Clientes", path: null }
]

const Clients = (props) => {
  const { classes } = props

  const [searchLoading, setSearchLoading]     = useState(false);
  const [sortField, setSortField]             = useState("first_name");
  const [sortDirection, setSortDirection]     = useState("desc");
  const [searchField]                         = useState("first_name_or_last_name_or_rfc_cont");
  const [searchValue, setSearchValue]         = useState("");
  const [timeout, setSetTimeout]              = useState(null);
  const [page, setPage]                       = useState(0);
  const [per, setPer]                         = useState(5);
  const [total_records, setTotalRecords]      = useState(0);
  const [newClientDialog, setNewClientDialog] = useState(false);

  const changeRowsPerPage = (event) => {
    let per = event.target.value
    setPer(per)
  }

  const changePage = (event, page) => {
    setPage(page)
  }

  const onChangeSearch = (event) => {
    timeout && clearTimeout(timeout)
    setSearchLoading(true)
    let value = event.target.value

    setSetTimeout(setTimeout(() => {
      setSearchValue(value)
      setSearchLoading(false)
    }, 2000))
  }

  const sort = (params) => {
    setSortDirection(Object.values(params["sort"])[0])
    setSortField(Object.keys(params["sort"])[0])
  }

  const newClientDialogSwitch = () => {
    setNewClientDialog(!newClientDialog)
  }

  if (!localStorage.wwToken) {
    useEffect(() => {
      fetch("https://www.universal-tutorial.com/api/getaccesstoken",
        {headers:{
          "Accept": "application/json",
          "api-token": "0If1aY4jUevUbNrnxPYspSVjiD6ik8aNw-LF7QetOdIO0xCTX52--39Zh8iEaAeI1M4",
          "user-email": "roga.zero@gmail.com"
        }}
      )
      .then(response => response.json())
      .then(response => localStorage.setItem('wwToken', response.auth_token))
    }, [localStorage.wwToken])
  }

  return(
    <>
      <Breadcrumbs breadcrumbs={BREADCRUMBS}/>
      <div className={classes.root}>
        <ControlsBar
          classes={classes}
          searchLoading={searchLoading}
          onChangeSearch={onChangeSearch.bind(this)}
          newClientDialogSwitch={newClientDialogSwitch}
        />
        <div className={classes.tableWrapper}>
          <Paper >
            <Table >
              <TableHeaders field={sortField} direction={sortDirection} sortHandler={sort.bind(this) }/>
              <ClientRows
                setTotalRecords={ setTotalRecords }
                page={ page }
                per={ per }
                search={{}}
                sortField={ sortField }
                sortDirection={ sortDirection }
                searchValue={ searchValue }
                searchField={ searchField }
                classes={ classes } />
              <TableFooter>
                <TableRow>
                  <TablePagination
                    page={page}
                    rowsPerPage={per}
                    rowsPerPageOptions={[5, 10, 15, 20]}
                    onPageChange={changePage}
                    onRowsPerPageChange={changeRowsPerPage}
                    count={total_records}
                    labelRowsPerPage={"Filas por página:"}
                  />
                </TableRow>
              </TableFooter>
            </Table>
            <Dialog fullWidth open={newClientDialog} onClose={newClientDialogSwitch}>
              <DialogTitle>
                <Grid container justifyContent="center">
                  Nuevo Cliente
                </Grid>
              </DialogTitle>
              <DialogContent>
                <Grid container justifyContent="center" alignItems='center'>
                  <NewClientForm newClientDialogSwitch={newClientDialogSwitch}/>
                </Grid>
              </DialogContent>
            </Dialog>
          </Paper>
        </div>
      </div>
    </>
  )
}

export default withStyles(styles)(Clients);
