import React, { useState, useRef, createRef }  from 'react';
import { withStyles }                          from '@material-ui/core/styles';
import { styles }                              from './styles';
import Breadcrumbs                             from '../../ui/breadcrumbs'
import SearchInput                             from './index/search_input'
import Paper                                   from '@material-ui/core/Paper';
import Table                                   from '@material-ui/core/Table';
import TableRow                                from '@material-ui/core/TableRow';
import TableFooter                             from '@material-ui/core/TableFooter';
import TablePagination                         from '@material-ui/core/TablePagination';
import TableBody                               from './index/table_body';
import TableHeaders                            from './index/table_headers';
import AdvancedSearchBudget                    from './index/advanced_search_budget'

const BREADCRUMBS = [
  { name: "Inicio", path: "/" },
  { name: "Presupuestos", path: null }
]

const BudgetsIndex = (props) => {

  const { classes } = props
  const [searchLoading, setSearchLoading] = useState(false);
  const [sortField, setSortField]         = useState("serial_number")
  const [sortDirection, setSortDirection] = useState("desc")
  const [timeout, setSetTimeout]          = useState(null)
  const [page, setPage]                   = useState(0)
  const [per, setPer]                     = useState(5)
  const [total_records, setTotalRecords]  = useState(0)
  const [getTemplatesVariables, setGetTemplatesVariables] = useState({})
  const [changeAdvanceSearch, setChangeAdvanceSearch] = React.useState(true)
  const [simpleSearchValue, setSimpleSearchValue] = React.useState(null)
  const [clientNameValue, setClientNameValue] = React.useState(null)
  const [procedureNameValue, setProcedureNameValue] = React.useState(null)
  const [serialNumberValue, setSerialNumberValue] = React.useState(null)
  const [moreThanValue, setMoreThanValue] = React.useState(null)
  const [lessThanValue, setLessThanValue] = React.useState(null)
  const [advanceSearchActived, setAdvanceSearchActived] = React.useState(false)

  const clientNameInputRef = useRef()
  const procedureInputRef = useRef()
  const serialNumberInputRef = useRef()
  const moreThanInputRef = createRef()
  const lessThanInputRef = React.createRef()

  const toEraseValue = () => {
    clientNameInputRef && (clientNameInputRef.current.value = null)
    // procedureInputRef && (procedureInputRef.current.value = null)
    serialNumberInputRef && (serialNumberInputRef.current.value = null)
    moreThanInputRef && (moreThanInputRef.current.value = null)
    lessThanInputRef && (lessThanInputRef.current.value =null)
  }

  const advancedButtonClick = (simpleSearchRef, callback) => {
    return(() => {

      simpleSearchRef.current.value = null
      callback()
      toEraseValue()
    })
  }

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

  const onChangeSearch = (event) => {
    timeout && clearTimeout(timeout)
    setSearchLoading(true)
    let value = event.target.value

    setSetTimeout(setTimeout(() => {
      setSimpleSearchValue(value)
      setSearchLoading(false)
    }, 2000))
  }

  return(
    <>
      <Breadcrumbs breadcrumbs={ BREADCRUMBS }/>
      <div className={ classes.root }>
        <SearchInput
          classes={classes}
          searchLoading={searchLoading}
          changeAdvanceSearch={changeAdvanceSearch}
          setChangeAdvanceSearch={setChangeAdvanceSearch}
          onChangeSearch={onChangeSearch.bind(this)}
          setSimpleSearchValue={setSimpleSearchValue}
          setClientNameValue={setClientNameValue}
          setProcedureNameValue={setProcedureNameValue}
          setSerialNumberValue={setSerialNumberValue}
          setMoreThanValue={setMoreThanValue}
          setLessThanValue={setLessThanValue}
          advancedButtonClick={advancedButtonClick}
          advanceSearchActived={advanceSearchActived}
          setAdvanceSearchActived={setAdvanceSearchActived}
        />
        <AdvancedSearchBudget
          changeAdvanceSearch={changeAdvanceSearch}
          setClientNameValue={setClientNameValue}
          setProcedureNameValue={setProcedureNameValue}
          setSerialNumberValue={setSerialNumberValue}
          setMoreThanValue={setMoreThanValue}
          setLessThanValue={setLessThanValue}
          clientNameInputRef={clientNameInputRef}
          procedureInputRef={procedureInputRef}
          serialNumberInputRef={serialNumberInputRef}
          moreThanInputRef={moreThanInputRef}
          lessThanInputRef={lessThanInputRef}
        />
      <div className={ classes.tableWrapper }>
        <Paper>
        <Table >
          <TableHeaders field={ sortField } direction={ sortDirection } sortHandler={ sort.bind(this) }/>
            <TableBody
              page={ page }
              per={ per }
              sortField={ sortField }
              sortDirection={ sortDirection }
              assingTotalRecords={ assingTotalRecords }
              classes={ classes }
              setGetTemplatesVariables={ setGetTemplatesVariables }
              simpleSearchValue={ simpleSearchValue }
              clientNameValue={clientNameValue}
              procedureNameValue={procedureNameValue}
              serialNumberValue={serialNumberValue}
              moreThanValue={moreThanValue}
              lessThanValue={lessThanValue}
            />
            <TableFooter>
              <TableRow >
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

export default withStyles(styles)(BudgetsIndex);
