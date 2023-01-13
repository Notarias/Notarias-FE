import React, { useState, useEffect } from 'react'
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import { styles } from '../styles';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import SortHeader from '../../../ui/sort_header';
import TableRow from '@material-ui/core/TableRow';
import { useQuery } from '@apollo/client';
import { LOAD_CAUSANTS } from '../queries_and_mutations/queries';
import Button from '@material-ui/core/Button';
import PersonAddIcon from '@material-ui/icons/PersonAdd';

const CausantSearch = (props) => {
  const { classes, causantInfo, setCausantInfo, setNewClientForm } = props
  const [searchLoading, setSearchLoading] = useState(false);
  const [sortField, setSortField] = useState("first_name");
  const [sortDirection, setSortDirection] = useState("desc");
  const [searchField] = useState("first_name_or_last_name_or_rfc_cont");
  const [searchValue, setSearchValue] = useState("");
  const [timeout, setSetTimeout] = useState(null);
  const [page, setPage] = useState(0);
  const [per, setPer] = useState(5);
  const [total_records, setTotalRecords] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState();

  let variables = {
    page: page + 1,
    per: per,
    searchField: searchField,
    searchValue: searchValue,
    sortDirection: sortDirection,
    sortField: sortField
  }

  const { data, refetch } = useQuery(
    LOAD_CAUSANTS, { vairables: variables, errorPolicy: 'all' }
  );

  useEffect(() => {
    data && setTotalRecords(data.causantsCount)
    refetch(variables)
  }, [data, page, per, searchField, searchValue, sortField, sortDirection]);

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

  const openCreateClienteForm = () => {
    setNewClientForm(true);
  }

  const renderInputSearch = () => {
    return(
      <Grid container  direction="row" spacing={3} justifyContent="flex-end">
        <Grid item>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              { 
                searchLoading ?
                <CircularProgress className={classes.searchLoadingIcon} size={25} /> :
                <SearchIcon /> 
              }
            </div>
            <InputBase
              placeholder="Buscar…"
              onChange={onChangeSearch}
              classes={{
                root: classes.searchInputRoot,
                input: classes.searchInputInput,
              }}
            />
          </div>
        </Grid>
        <Grid item>
          <Button
            onClick={openCreateClienteForm}
            variant="contained"
            color="primary"
            size="small"
            startIcon={<PersonAddIcon/>}
          >
            Crear
          </Button>
        </Grid>
      </Grid>
    )
  }

  const RenderClientsTable = (props) => {

    const { causantInfo, setCausantInfo } = props

    return(
      <TableBody>
        {
          data && data.causants.map((causant, index ) => {
            const handleMenuItemClick = (event) => {
              setSelectedIndex(causant.id);
              setCausantInfo(causant);
            };
            return(
            <TableRow
              index={causant.id}
              key={`RenderClientsTable-${causant.id}`}
              hover 
              selected={causantInfo ? causant.id === causantInfo.id : causant.id === selectedIndex} 
              onClick={handleMenuItemClick}
            >
              <TableCell align= "center" className={classes.tableRowMax}>{ causant.firstName }</TableCell>
              <TableCell align= "center" className={classes.tableRowMax}>{ causant.lastName }</TableCell>
              <TableCell align= "center">{ causant.rfc }</TableCell>
              <TableCell align= "center">{ causant.curp }</TableCell>
            </TableRow>
          )})
        }
      </TableBody>
    )
  }

  let sortHandler = sort.bind(this)

  return(
    <Grid container item xs={10}>
      { renderInputSearch() }
      <Table>
        <TableHead >
          <TableRow >
          <SortHeader
              text="Nombre"
              field_property="first_name"
              current_field={sortField}
              sort_direction={sortDirection}
              callback={sortHandler}
            />
            <SortHeader
              text="Apellido"
              field_property="last_name"
              current_field={sortField}
              sort_direction={sortDirection}
              callback={sortHandler}
            />
            <SortHeader
              text="RFC"
              field_property="rfc"
              current_field={sortField}
              sort_direction={sortDirection}
              callback={sortHandler}
            />
            <SortHeader
              text="CURP"
              field_property="curp"
              current_field={sortField}
              sort_direction={sortDirection}
              callback={sortHandler}
            />
          </TableRow>
        </TableHead>
        <RenderClientsTable causantInfo={causantInfo} setCausantInfo={setCausantInfo} />
        <TableFooter>
          <TableRow>
            <TablePagination
              page={page}
              rowsPerPage={per}
              rowsPerPageOptions={[5]}
              onPageChange={changePage}
              onRowsPerPageChange={changeRowsPerPage}
              count={total_records}
              labelRowsPerPage="Filas por página:"
            />
          </TableRow>
        </TableFooter>
      </Table>
    </Grid>
  )
}

export default withStyles(styles)(CausantSearch);
