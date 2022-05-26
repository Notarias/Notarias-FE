import React, { useState, useRef } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { styles } from './styles';
import Breadcrumbs from '../../ui/breadcrumbs'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableHeaders from './Index/table_headers'; 
import ProceduresTableBody from './Index/table_body';
import SearchInput from './Index/search_input'
import AdvancedSearchProcedure from './Index/advanced_search_procedure';

const BREADCRUMBS = [
  { name: "Inicio", path: "/" },
  { name: "Trámites", path: null }
]

const ProceduresIndex = (props) => {

  const { classes } = props
  const [searchLoading, setSearchLoading]           = useState(false);
  const [sortField, setSortField]                   = useState("serial_number");
  const [sortDirection, setSortDirection]           = useState("desc");
  const [timeout, setSetTimeout]                    = useState(null);
  const [page, setPage]                             = useState(0);
  const [per, setPer]                               = useState(5);
  const [totalRecords, setTotalRecords]             = useState(0);
  const [simpleSearchValue, setSimpleSearchValue]   = useState(null);

  const [clientNameValue, setClientNameValue]               = useState(null);
  const [serialNumberValue, setSerialNumberValue]           = useState(null);
  const [writingNumberValue, setWritingNumberValue]         = useState(null);
  const [budgetTemplateName, setBudgetTemplateName]         = useState(null);
  const [procedureTemplateName, setProcedureTemplateName] = useState(null);
  const [initDateValue, setInitDateValue]                   = useState(null);
  const [endDateValue, setEndDateValue]                     = useState(null);

  const [runAdvancedSearch, setRunAdvancedSearch]     = useState(false);
  const [openAdvancedSearch, setOpenAdvancedSearch]   = useState(false);

  const clientNameInputRef        = useRef();
  const serialNumberInputRef      = useRef();
  const writingNumberRef          = useRef();
  const budgetTempalteInputRef    = useRef();
  const procedureTemplateInputRef = useRef();
  const initDateValueRef          = useRef();
  const endDateValueRef           = useRef();

  const clearAdvancedSearchRefsValues = () => {
    clientNameInputRef && clientNameInputRef.current && (clientNameInputRef.current.value = null);
    serialNumberInputRef && serialNumberInputRef.current && (serialNumberInputRef.current.value = null);
    writingNumberRef && writingNumberRef.current && (writingNumberRef.current.value = null);
    budgetTempalteInputRef && budgetTempalteInputRef.current && (budgetTempalteInputRef.current.value = null);
    procedureTemplateInputRef && procedureTemplateInputRef.current && (procedureTemplateInputRef.current.value = null);
    initDateValueRef && initDateValueRef.current && (initDateValueRef.current.value = null);
    endDateValueRef && endDateValueRef.current && (endDateValueRef.current.value = null);
  }

  const clearAdvancedSearchValues = () => {
    setClientNameValue(null);
    setSerialNumberValue(null);
    setWritingNumberValue(null);
    setBudgetTemplateName(null);
    setProcedureTemplateName(null);
    setInitDateValue(null);
    setEndDateValue(null);
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
      <Grid container direction='row' className={ classes.root }>
        <SearchInput
          classes={classes}
          searchLoading={searchLoading}
          onChangeSearch={onChangeSearch.bind(this)}
          switchAdvancedSearchClick={switchAdvancedSearchClick}
          setRunAdvancedSearch={setRunAdvancedSearch}
          openAdvancedSearch={openAdvancedSearch}
        />
        {
          openAdvancedSearch && <AdvancedSearchProcedure
            setClientNameValue={setClientNameValue}
            setSerialNumberValue={setSerialNumberValue}
            setWritingNumberValue={setWritingNumberValue}
            setBudgetTemplateName={setBudgetTemplateName}
            setProcedureTemplateName={setProcedureTemplateName}
            setInitDateValue={setInitDateValue}
            setEndDateValue={setEndDateValue}
            clientNameInputRef={clientNameInputRef}
            serialNumberInputRef={serialNumberInputRef}
            writingNumberRef={writingNumberRef}
            budgetTempalteInputRef={budgetTempalteInputRef}
            procedureTemplateInputRef={procedureTemplateInputRef}
            initDateValueRef={initDateValueRef}
            endDateValueRef={endDateValueRef}
            runAdvancedSearch={runAdvancedSearch}
            setRunAdvancedSearch={setRunAdvancedSearch}
          />
        }
        <div className={ classes.tableWrapper }>
          <Paper>
            <Table>
              <TableHeaders 
                field={ sortField }
                direction={ sortDirection }
                sortHandler={ sort.bind(this) }
              />
              <ProceduresTableBody
                classes={classes}
                page={page}
                per={per}
                sortDirection={sortDirection}
                sortField={sortField}
                simpleSearchValue={simpleSearchValue}
                assingTotalRecords={assingTotalRecords}
                clientNameValue={clientNameValue}
                serialNumberValue={serialNumberValue}
                writingNumberValue={writingNumberValue}
                budgetTemplateName={budgetTemplateName}
                procedureTemplateName={procedureTemplateName}
                initDateValue={initDateValue}
                endDateValue={endDateValue}
                setRunAdvancedSearch={setRunAdvancedSearch}
                runAdvancedSearch={runAdvancedSearch}
              />
              <TableFooter>
                <TableRow>
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
      </Grid>
    </>
  )
}

export default withStyles(styles)(ProceduresIndex);
