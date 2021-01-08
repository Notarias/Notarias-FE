import React, { useState }          from 'react';
import { withStyles }               from '@material-ui/core/styles';
import { styles }                   from './styles';
import Breadcrumbs                  from '../../../ui/breadcrumbs'
import Paper                        from '@material-ui/core/Paper';
import Table                        from '@material-ui/core/Table';
import TableRow                     from '@material-ui/core/TableRow';
import TableFooter                  from '@material-ui/core/TableFooter';
import TablePagination              from '@material-ui/core/TablePagination';
import TableBodyTemplate            from './index/table_body_template';
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
  const [per, setPer]                     = useState(5)
  const [total_records, setTotalRecords]  = useState(5)

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

  return(
    <>
      <Breadcrumbs breadcrumbs={ BREADCRUMBS }/>
      <div className={ classes.root }>
        <ControlsBar
        />
        <div className={ classes.tableWrapper }>
          <Paper>
            <Table >
              <TableHeaders/>
              <TableBodyTemplate
                // page={ page }
                // per={ per }
                // search={ {} }
                // sortField={ sortField }
                // sortDirection={ sortDirection }
                // assingTotalRecords={ assingTotalRecords }
                // searchValue={ searchValue }
                // searchField={ searchField }
                classes={ classes } 
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
    </div>
    </>
  )


}

export default withStyles(styles)(ConfigBudgetsTemplatesIndex);
