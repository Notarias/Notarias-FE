import React, { useState, useEffect } from 'react'
import Grid                           from '@material-ui/core/Grid';
import CircularProgress               from '@material-ui/core/CircularProgress';
import SearchIcon                     from '@material-ui/icons/Search';
import InputBase                      from '@material-ui/core/InputBase';
import Button                         from '@material-ui/core/Button';
import PersonAddIcon                  from '@material-ui/icons/PersonAdd';
import { Link }                       from 'react-router-dom';
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
import Typography                     from '@material-ui/core/Typography';
import { useQuery }                   from '@apollo/react-hooks';
import { LOAD_CLIENTS }               from '../queries_and_mutations/queries';

const ClientSearch = (props) => {
  const { classes, setClientInfo } = props
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
    LOAD_CLIENTS, { vairables: variables, errorPolicy: 'all' }
  );

  useEffect(() => {
    refetch(variables);
  }, [page, per, searchField, searchValue, sortField, sortDirection]);

  useEffect(() => {
    data && setTotalRecords(data.clientsCount)
  }, [data]);

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
  };

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
    <Grid container  direction="row"  justify="flex-end"  alignItems="flex-end" >
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
          data && data.clients.map((client, index ) => {
            
            const handleMenuItemClick = (event) => {
              setSelectedIndex(client.id);
              setClientInfo(client);
            };
            return(
            <TableRow
              index={ client.id }
              key={client.id}
              hover 
              selected={client.id === selectedIndex} 
              onClick={ handleMenuItemClick }
            >
              <TableCell align= "center">{ client.firstName }</TableCell>
              <TableCell align= "center">{ client.lastName }</TableCell>
              <TableCell align= "center">{ client.rfc }</TableCell>
              <TableCell align= "center">{ client.curp }</TableCell>
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
    <Grid container item xs={10} >
     { renderInputSearch() }
      <Table className={classes.ClientSearchTable} size="small">
        <TableHead>
          <TableRow>
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
              onChangePage={changePage}
              onChangeRowsPerPage={changeRowsPerPage}
              count={total_records}
              labelRowsPerPage={"Filas por página:"}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </Grid>
  )
}

export default withStyles(styles)(ClientSearch);
