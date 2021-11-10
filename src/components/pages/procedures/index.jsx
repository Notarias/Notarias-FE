import React, { useState, useRef, createRef } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { styles } from './styles';
import Breadcrumbs from '../../ui/breadcrumbs'
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableHeaders from './Index/table_headers'; 
import ProceduresTableBody from './Index/procedure_table_body';
import SearchInput from './Index/search_input'
import AdvancedSearchProcedure from './Index/advanced_search_procedure';

const BREADCRUMBS = [
  { name: "Inicio", path: "/" },
  { name: "Tramites", path: null }
]

const ProceduresIndex = (props) => {

  const { classes } = props
  const [searchLoading, setSearchLoading] = useState(false);
  const [changeAdvanceSearch, setChangeAdvanceSearch] = React.useState(true);
  const [advanceSearchActived, setAdvanceSearchActived] = React.useState(false);
  const [page, setPage] = useState(0);
  const [per, setPer] = useState(5);
  const [timeout, setSetTimeout] = useState(null);
  const [sortField, setSortField] = useState("serial_number");
  const [sortDirection, setSortDirection] = useState("desc");
  const [simpleSearchValue, setSimpleSearchValue] = useState(null);
  const [serialNumberValue, setSerialNumberValue] = useState(null);
  const [clientFullName, setClientFullName] = useState(null);
  const [causantFullName, setCausantFullName] = useState(null);
  const [budgetingTemplateName, setBudgetingTemplateName] = useState(null);
  const [proceduresTemplateName, setProceduresTemplateName] = useState(null);
  const [asigneeAvatarThumbUrl, setAsigneeAvatarThumbUrl] = useState(null);
  const [reporterAvatarThumbUrl, setReporterAvatarThumbUrl] = useState(null);
  const [createdAt, setCreatedAt] = useState(null);
  const [updatedAt, setUpdatedAt] = useState(null);
  const [templatesVariables, setTemplatesVariables] = useState(null);
  const [total_records, setTotalRecords]  = useState(0);

  const clientNameInputRef = useRef();
  const causantNameInputRef = useRef();
  const serialNumberInputRef = useRef();
  const budgetTempalteInputRef = useRef();
  const procedureTemplateInputRef = useRef();
  const createdAtInputRef = useRef();

  const toEraseValue = () => {
    clientFullName && (clientFullName.current.value = null)
    proceduresTemplateName && (proceduresTemplateName.current.value = null)
    serialNumberValue && (serialNumberValue.current.value = null)
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
      <div>
        <h1>Tramites / Procedures</h1>
      </div>
      <div className={ classes.root }>
      <SearchInput
          classes={classes}
          searchLoading={searchLoading}
          changeAdvanceSearch={changeAdvanceSearch}
          setChangeAdvanceSearch={setChangeAdvanceSearch}
          onChangeSearch={onChangeSearch.bind(this)}
          setSimpleSearchValue={setSimpleSearchValue}
          setSerialNumberValue={setSerialNumberValue}
          setClientFullName={setClientFullName}
          setCausantFullName={setCausantFullName}
          setBudgetingTemplateName={setBudgetingTemplateName}
          setProceduresTemplateName={setProceduresTemplateName}
          setCreatedAt={setCreatedAt}
          advancedButtonClick={advancedButtonClick}
          advanceSearchActived={advanceSearchActived}
          setAdvanceSearchActived={setAdvanceSearchActived}
        />
        <AdvancedSearchProcedure
          classes={classes}
          changeAdvanceSearch={changeAdvanceSearch}
          setClientNameValue={setClientNameValue}
          setCausantNameValue={setCausantNameValue}
          setSerialNumberValue={setSerialNumberValue}
          setBudgetTemplateNameValue={setBudgetTemplateNameValue}
          setProcedureTemplateNameValue={setProcedureTemplateNameValue}
          setCreatedAtValue={setCreatedAtValue}
          clientNameInputRef={clientNameInputRef}
          causantNameInputRef={causantNameInputRef}
          serialNumberInputRef={serialNumberInputRef}
          budgetTempalteInputRef={budgetTempalteInputRef}
          procedureTemplateInputRef={procedureTemplateInputRef}
          createdAtInputRef={createdAtInputRef}
        />
        <div className={ classes.tableWrapper }>
          <Paper>
            <Table>
              <TableHeaders field={ sortField } direction={ sortDirection } sortHandler={ sort.bind(this) }/>
              <ProceduresTableBody
              page={page}
              per={per}
              sortField={sortField}
              sortDirection={sortDirection}
              simpleSearchValue={simpleSearchValue}
              serialNumberValue={serialNumberValue}
              clientFullName ={clientFullName}
              causantFullName={causantFullName}
              budgetingTemplateName={budgetingTemplateName}
              proceduresTemplateName ={proceduresTemplateName}
              asigneeAvatarThumbUrl={asigneeAvatarThumbUrl}
              reporterAvatarThumbUrl ={reporterAvatarThumbUrl}
              createdAt={createdAt}
              updatedAt={updatedAt}
              templatesVariables={templatesVariables}
              setTemplatesVariables={setTemplatesVariables}
              classes={classes}
              />
            </Table>
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
          </Paper>
        </div>
      </div>
    </>
  )
}

export default withStyles(styles)(ProceduresIndex);
