import React, { useState }                from 'react';
import { withStyles }                     from '@material-ui/core/styles';
import { styles }                         from './styles';
import Breadcrumbs                        from '../../ui/breadcrumbs'
import SearchInput                        from './index/search_input'
import Grid                               from '@material-ui/core/Grid';
import Paper                              from '@material-ui/core/Paper';
import Table                              from '@material-ui/core/Table';
import TableRow                           from '@material-ui/core/TableRow';
import TableFooter                        from '@material-ui/core/TableFooter';
import TablePagination                    from '@material-ui/core/TablePagination';
import TableBodyTemplate                  from './index/table_body_template';
import TableHeaders                       from './index/table_headers';

const BREADCRUMBS = [
  { name: "Inicio", path: "/" },
  { name: "Presupuestos", path: null }
]

const BudgetsIndex = (props) => {

    let BUDGET_SEARCH_INPUT = {
      clientName: null,
      templateName: null,
      serialNumber: null,
      totalMoreThanEq: null,
      totalLessThanEq: null,
    }

  const [searchLoading, setSearchLoading] = useState(false);
  const [sortField, setSortField]         = useState("serial_number")
  const [sortDirection, setSortDirection] = useState("desc")
  const [search, setSearch]                     = useState(BUDGET_SEARCH_INPUT)
  const [searchValue, setSearchValue]     = useState("")
  const [timeout, setSetTimeout]          = useState(null)
  const [page, setPage]                   = useState(0)
  const [per, setPer]                     = useState(5)
  const [total_records, setTotalRecords]  = useState(10)
  const [getTemplatesVariables, setGetTemplatesVariables] = useState({})
  const { classes } = props

  const sort = (params) => {
    setSortDirection(Object.values(params["sort"])[0])
    setSortField(Object.keys(params["sort"])[0])
  }

  const changePage = (event, page) => {
    setPage(page)
  }

  const changeRowsPerPage = (event) => {
    let per = event.target.value
    setPer(per)
  }

  const assingTotalRecords = (total) => {
    setTotalRecords(total)
  }


  return(
    <>
      <Breadcrumbs breadcrumbs={ BREADCRUMBS }/>
      <div className={ classes.root }>
        <SearchInput
          classes={classes}
          searchLoading={searchLoading}
        />
      </div>
      <div className={ classes.tableWrapper }>
        <Paper>
        <Table >
          <TableHeaders field={ sortField } direction={ sortDirection } sortHandler={ sort.bind(this) }/>
            <TableBodyTemplate
              page={ page }
              per={ per }
              // search={ {} }
              sortField={ sortField }
              sortDirection={ sortDirection }
              assingTotalRecords={ assingTotalRecords }
              search={ search }
              // searchValue={ searchValue }
              classes={ classes }
              setGetTemplatesVariables={ setGetTemplatesVariables }
            />
            <TableFooter>
              <TableRow>
              <TablePagination
                  page={ page }
                  rowsPerPage={ per }
                  rowsPerPageOptions={ [5, 10, 15, 20] }
                  onChangePage={ changePage }
                  onChangeRowsPerPage={ changeRowsPerPage }
                  count={ total_records }
                  labelRowsPerPage={ "Filas por página:" }
                />
              </TableRow>
            </TableFooter>
          </Table>
        </Paper>
      </div>
    </>
  )
}

export default withStyles(styles)(BudgetsIndex);
