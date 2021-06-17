import React, { useState } from 'react';
import { withStyles }       from '@material-ui/core/styles';
import Table                from '@material-ui/core/Table';
import TableFooter          from '@material-ui/core/TableFooter';
import TableHeaders                  from './table_headers';
import TableRow             from '@material-ui/core/TableRow';
import Paper                from '@material-ui/core/Paper';
import { styles }           from './styles';
import TablePagination      from '@material-ui/core/TablePagination';
import UserRows            from './users_rows';
import ControlsBar          from './controls_bar';
import { setBreadcrumbsList }                            from '../../interfaces/breadcrumbs_interface';

const BREADCRUMBS = [
  { name: "Inicio", path: "/" },
  { name: "Usuarios", path: null }
]

setBreadcrumbsList(BREADCRUMBS)

const Users = (props) => {
  const [searchLoading, setSearchLoading] = useState(false);
  const [sortField, setSortField]         = useState("first_name")
  const [sortDirection, setSortDirection] = useState("desc")
  const [searchField]                     = useState("first_name_or_last_name_or_email_cont")
  const [searchValue, setSearchValue]     = useState("")
  const [timeout, setSetTimeout]          = useState(null)
  const [page, setPage]                   = useState(0)
  const [per, setPer]                     = useState(5)
  const [total_records, setTotalRecords]  = useState(0)

  const { classes } = props

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

  const sort  = (params) => {
    setSortDirection(Object.values(params["sort"])[0])
    setSortField(Object.keys(params["sort"])[0])
  }

  return(
    <div className={classes.root}>
      <ControlsBar
        classes={classes}
        searchLoading={searchLoading}
        onChangeSearch={onChangeSearch.bind(this)}/>
      <div className={classes.tableWrapper}>
        <Paper >
          <Table className={classes.table}>
            <TableHeaders field={sortField} direction={sortDirection} sortHandler={sort.bind(this) }/>
            <UserRows
              page={ page }
              per={ per }
              search={{}}
              sortField={ sortField }
              sortDirection={ sortDirection }
              setTotalRecords={ setTotalRecords }
              searchValue={ searchValue }
              searchField={ searchField }
              classes={ classes } />
            <TableFooter>
              <TableRow>
                <TablePagination
                  page={page}
                  rowsPerPage={per}
                  rowsPerPageOptions={[5, 10, 15, 20]}
                  onChangePage={changePage}
                  onChangeRowsPerPage={changeRowsPerPage}
                  count={total_records}
                  labelRowsPerPage={"Filas por página:"}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </Paper>
      </div>
    </div>
  )
}

export default withStyles(styles)(Users);
