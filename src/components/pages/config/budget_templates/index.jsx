import React, { useState }          from 'react';
import { withStyles }               from '@material-ui/core/styles';
import { styles }                   from './styles';
import Breadcrumbs                  from '../../../ui/breadcrumbs'
import Paper                        from '@material-ui/core/Paper';
import Table                        from '@material-ui/core/Table';
import TableRow                     from '@material-ui/core/TableRow';
import TableFooter                  from '@material-ui/core/TableFooter';
import TablePagination              from '@material-ui/core/TablePagination';
import TableBodyTemplate            from './index/table_body';
import ControlsBar                  from './index/controls_bar';
import TableHeaders                 from './index/table_headers';

const BREADCRUMBS = [
  { name: "Inicio", path: "/" },
  { name: "Presupuestos", path: null }
]


const ConfigBudgetsTemplatesIndex  = (props)=> {
  const [searchLoading, setSearchLoading] = useState(false);
  const [sortField, setSortField]         = useState("name")
  const [sortDirection, setSortDirection] = useState("desc")
  const [searchField]                     = useState("name_or_string_serial_number_cont")
  const [searchValue, setSearchValue]     = useState("")
  const [timeout, setSetTimeout]          = useState(null)
  const [page, setPage]                   = useState(0)
  const [per, setPer]                     = useState(10)
  const [total_records, setTotalRecords]  = useState(10)
  const [getTemplatesVariables, setGetTemplatesVariables] = useState({})

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

  const assingTotalRecords = (total) => {
    setTotalRecords(total)
  }

  const sort = (params) => {
    setSortDirection(Object.values(params["sort"])[0])
    setSortField(Object.keys(params["sort"])[0])
  }

  return(
    <>
      <Breadcrumbs breadcrumbs={ BREADCRUMBS }/>
      <div className={ classes.root }>
        <ControlsBar
          classes={classes}
          searchLoading={searchLoading}
          onChangeSearch={onChangeSearch.bind(this)}
          getTemplatesVariables={ getTemplatesVariables }
        />
        <div className={ classes.tableWrapper }>
          <Paper>
            <Table className={classes.table}>
              <TableHeaders field={ sortField } direction={ sortDirection } sortHandler={ sort.bind(this) }/>
              <TableBodyTemplate
                page={ page }
                per={ per }
                search={ {} }
                sortField={ sortField }
                sortDirection={ sortDirection }
                assingTotalRecords={ assingTotalRecords }
                searchValue={ searchValue }
                searchField={ searchField }
                classes={ classes }
                setGetTemplatesVariables={ setGetTemplatesVariables }
              />
              <TableFooter>
                <TableRow>
                <TablePagination
                    page={ page }
                    rowsPerPage={ per }
                    rowsPerPageOptions={ [5, 10, 15, 20] }
                    onPageChange={ changePage }
                    onRowsPerPageChange={ changeRowsPerPage }
                    count={ total_records }
                    labelRowsPerPage={ "Filas por página:" }
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </Paper>
        </div>
    </div>
    </>
  )


}

export default withStyles(styles)(ConfigBudgetsTemplatesIndex);
