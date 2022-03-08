import React, { useState, useRef }  from 'react';
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
  const [sortField, setSortField]         = useState("serial_number");
  const [sortDirection, setSortDirection] = useState("desc");
  const [timeout, setSetTimeout]          = useState(null);
  const [page, setPage]                   = useState(0);
  const [per, setPer]                     = useState(5);
  const [totalRecords, setTotalRecords]  = useState(0);
  const [getTemplatesVariables, setGetTemplatesVariables] = useState({});
  const [simpleSearchValue, setSimpleSearchValue] = useState(null);
  const [clientNameValue, setClientNameValue] = useState(null);
  const [procedureNameValue, setProcedureNameValue] = useState(null);
  const [serialNumberValue, setSerialNumberValue] = useState(null);
  const [moreThanValue, setMoreThanValue] = useState(null);
  const [lessThanValue, setLessThanValue] = useState(null);
  const [runAdvancedSearch, setRunAdvancedSearch] = useState(false);
  const [openAdvancedSearch, setOpenAdvancedSearch] = useState(false);

  const clientNameInputRef = useRef();
  const procedureInputRef = useRef();
  const serialNumberInputRef = useRef();
  const moreThanInputRef = useRef();
  const lessThanInputRef = useRef();

  const clearAdvancedSearchRefsValues = () => {
    clientNameInputRef && clientNameInputRef.current && (clientNameInputRef.current.value = null)
    // procedureInputRef && (procedureInputRef.current.value = null)
    serialNumberInputRef && serialNumberInputRef.current && (serialNumberInputRef.current.value = null)
    moreThanInputRef && moreThanInputRef.current && (moreThanInputRef.current.value = null)
    lessThanInputRef && lessThanInputRef.current && (lessThanInputRef.current.value = null)
  }

  const clearAdvancedSearchValues = () => {
    setClientNameValue(null)
    setProcedureNameValue(null)
    setSerialNumberValue(null)
    setMoreThanValue(null)
    setLessThanValue(null)
  }

  const switchAdvancedSearchClick = (simpleSearchRef, callback) => {
    return(() => {
      simpleSearchRef.current.value = null
      callback()
      setSimpleSearchValue(null)
      clearAdvancedSearchValues()
      clearAdvancedSearchRefsValues()
      setOpenAdvancedSearch(!openAdvancedSearch)
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
      clearAdvancedSearchValues()
      clearAdvancedSearchRefsValues()
    }, 2000))
  }

  return(
    <>
      <Breadcrumbs breadcrumbs={ BREADCRUMBS }/>
      <div style={{ paddingTop: "20px", paddingRight: "20px" }}>
        <SearchInput
          classes={classes}
          searchLoading={searchLoading}
          onChangeSearch={onChangeSearch.bind(this)}
          switchAdvancedSearchClick={switchAdvancedSearchClick}
          setRunAdvancedSearch={setRunAdvancedSearch}
          openAdvancedSearch={openAdvancedSearch}
        />
        {
          openAdvancedSearch && <AdvancedSearchBudget
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
            timeout={timeout}
            setSetTimeout={setSetTimeout}
            runAdvancedSearch={runAdvancedSearch}
            setRunAdvancedSearch={setRunAdvancedSearch}
          />
        }
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
              getTemplatesVariables={getTemplatesVariables}
              simpleSearchValue={ simpleSearchValue }
              clientNameValue={clientNameValue}
              procedureNameValue={procedureNameValue}
              serialNumberValue={serialNumberValue}
              moreThanValue={moreThanValue}
              lessThanValue={lessThanValue}
              setRunAdvancedSearch={setRunAdvancedSearch}
              runAdvancedSearch={runAdvancedSearch}
            />
            <TableFooter>
              <TableRow >
              <TablePagination
                  page={ page }
                  rowsPerPage={ per }
                  rowsPerPageOptions={ [5, 10, 15, 20] }
                  onPageChange={ changePage }
                  onRowsPerPageChange={ changeRowsPerPage }
                  count={ totalRecords }
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
