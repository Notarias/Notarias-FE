import React, { useState, useEffect } from 'react'
import Grid                           from '@material-ui/core/Grid';
import CircularProgress               from '@material-ui/core/CircularProgress';
import SearchIcon                     from '@material-ui/icons/Search';
import InputBase                      from '@material-ui/core/InputBase';
import { styles }                     from '../styles';
import { withStyles }                 from '@material-ui/core/styles';
import Table                          from '@material-ui/core/Table';
import TableFooter                    from '@material-ui/core/TableFooter';
import TablePagination                from '@material-ui/core/TablePagination';
import TableBody                      from '@material-ui/core/TableBody';
import TableHead                      from '@material-ui/core/TableHead';
import TableCell                      from '@material-ui/core/TableCell';
import SortHeader                     from '../../../ui/sort_header';
import TableRow                       from '@material-ui/core/TableRow';
import { useQuery }                   from '@apollo/react-hooks';
import { LOAD_CAUSANTS }               from '../queries_and_mutations/queries';

const CausantSearch = (props) => {
  const { classes, setCausantInfo } = props
  const [searchLoading, setSearchLoading] = useState(false);
  const [sortField, setSortField]         = useState("first_name")
  const [sortDirection, setSortDirection] = useState("desc")
  const [searchField]                     = useState("first_name_or_last_name_or_rfc_cont")
  const [searchValue, setSearchValue]     = useState("")
  const [timeout, setSetTimeout]          = useState(null)
  const [page, setPage]                   = useState(0)
  const [per, setPer]                     = useState(5)
  const [total_records, setTotalRecords]  = useState(0)
  const [selectedIndex, setSelectedIndex] = React.useState();

  let variables = {
    page: page + 1,
    per: per,
    searchField: searchField,
    searchValue: searchValue,
    sortDirection: sortDirection,
    sortField: sortField
  }

  const { loading, data, refetch } = useQuery(
    LOAD_CAUSANTS, { vairables: variables, errorPolicy: 'all', fetchPolicy: "no-cache" }
  );

  useEffect(() => {
    refetch(variables);
  }, [page, per, searchField, searchValue, sortField, sortDirection]);

  useEffect(() => {
    data && setTotalRecords(data.causantsCount)
  }, [data]);

  // const handleMenuItemClick = (event, index) => {
  //   setSelectedIndex(index);
  // };

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

  const renderInputSearch = ( props) => {
    return(
    <Grid container  direction="row"  justifyContent="flex-end"  alignItems="flex-end" >
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
    )
  }

  const RenderClientsTable = (props) => {
    return(
      <TableBody className={classes.ClientSearchTable}>
        {
          data && data.causants.map((causant, index ) => {
            
            const handleMenuItemClick = (event) => {
              setSelectedIndex(causant.id);
              setCausantInfo(causant);
            };
            return(
            <TableRow
              index={ causant.id }
              key={causant.id}
              hover 
              selected={causant.id === selectedIndex} 
              onClick={ handleMenuItemClick }
              
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

  let field = sortField
  let direction = sortDirection
  let sortHandler = sort.bind(this)

  return(
    <Grid container item xs={10}>
     { renderInputSearch() }
      <Table className={classes.ClientSearchTable} >
        <TableHead >
          <TableRow >
          <SortHeader
              text={"Nombre"}
              field_property={"first_name"}
              current_field={field}
              sort_direction={direction}
              callback={sortHandler}
            />
            <SortHeader
              text={"Apellido"}
              field_property={"last_name"}
              current_field={field}
              sort_direction={direction}
              callback={sortHandler}
            />
            <SortHeader
              text={"RFC"}
              field_property={"rfc"}
              current_field={field}
              sort_direction={direction}
              callback={sortHandler}
            />
            <SortHeader
              text={"CURP"}
              field_property={"curp"}
              current_field={field}
              sort_direction={direction}
              callback={sortHandler}
            />
          </TableRow>
        </TableHead>
        <RenderClientsTable/>
        <TableFooter>
          <TableRow>
            <TablePagination
              page={page}
              rowsPerPage={per}
              rowsPerPageOptions={[5]}
              onPageChange={changePage}
              onRowsPerPageChange={changeRowsPerPage}
              count={total_records}
              labelRowsPerPage={"Filas por página:"}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </Grid>
  )
}

export default withStyles(styles)(CausantSearch);
