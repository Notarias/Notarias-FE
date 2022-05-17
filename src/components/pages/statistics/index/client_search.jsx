import React, { useState, useEffect }   from 'react'
import Grid                             from '@material-ui/core/Grid';
import Dialog                           from '@material-ui/core/Dialog';
import FormControl                      from '@material-ui/core/FormControl';
import Input                            from '@material-ui/core/Input';
import InputLabel                       from '@material-ui/core/InputLabel';
import InputAdornment                   from '@material-ui/core/InputAdornment';
import IconButton                       from '@material-ui/core/IconButton';
import ClearIcon                        from '@material-ui/icons/Clear';
import Typography                       from '@material-ui/core/Typography';
import CircularProgress                 from '@material-ui/core/CircularProgress';
import SearchIcon                       from '@material-ui/icons/Search';
import Table                            from '@material-ui/core/Table';
import TableFooter                      from '@material-ui/core/TableFooter';
import TablePagination                  from '@material-ui/core/TablePagination';
import TableBody                        from '@material-ui/core/TableBody';
import TableHead                        from '@material-ui/core/TableHead';
import TableCell                        from '@material-ui/core/TableCell';
import SortHeader                       from '../../../ui/sort_header';
import TableRow                         from '@material-ui/core/TableRow';
import { useQuery }                     from '@apollo/client';
import { LOAD_CLIENTS }                 from '../queries/queries';
import Button                           from '@material-ui/core/Button';
import ArrowDropDownIcon                from '@material-ui/icons/ArrowDropDown';

const ClientSearch = (props) => {
  const { clientInfo, setClientInfo, userInfo } = props;
  const [searchLoading, setSearchLoading] = useState(false);
  const [sortField, setSortField] = useState("first_name");
  const [sortDirection, setSortDirection] = useState("desc");
  const [searchField] = useState("first_name_or_last_name_or_rfc_cont");
  const [searchValue, setSearchValue] = useState("");
  const [timeout, setSetTimeout] = useState(null);
  const [page, setPage] = useState(0);
  const [per] = useState(10);
  const [total_records, setTotalRecords] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState();
  const [selectClientDialog, setSelectClientDialog] = useState(false);

  let variables = {
    page: page + 1,
    per: per,
    searchField: searchField,
    searchValue: searchValue,
    sortDirection: sortDirection,
    sortField: sortField
  }

  const { data, refetch } = useQuery(
    LOAD_CLIENTS, { vairables: variables, errorPolicy: 'all' }
  );

  useEffect(() => {
    data && setTotalRecords(data.clientsCount)
    refetch(variables);
  }, [data, page, per, searchField, searchValue, sortField, sortDirection]);

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

  const openClientList = () => {
    setSelectClientDialog(!selectClientDialog);
  }

  const cancelSelect = () => {
    setClientInfo("");
    setSelectClientDialog(!selectClientDialog);
  }

  const cancelClientSelect = () =>{
    setClientInfo("");
  }

  const renderClientControl = () => {
    return(
      <>
      { !!clientInfo ?
        <FormControl variant="outlined" fullWidth>
          <InputLabel htmlFor={clientInfo.id}>Cliente</InputLabel>
          <Input
            value={`${clientInfo.firstName} ${clientInfo.lastName}`}
            disabled
            size="small"
            variant="outlined"
            fullWidth
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  onClick={cancelClientSelect}
                  edge="end"
                >
                  <ClearIcon fontSize="small"/>
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
      :
        <Button
          size="medium"
          fullWidth
          variant="outlined"
          onClick={openClientList}
          endIcon={<ArrowDropDownIcon />}
          disabled={!!userInfo}
        >
          Cliente
        </Button>
      }
      </>
    )
  }

  const renderInputSearch = () => {
    return(
      <Grid item container justifyContent="center" alignItems='center' style={{paddingTop: '20px', paddingBottom: '10px'}}>
        <Grid item container xs={6} justifyContent='flex-start' alignItems='center' style={{paddingLeft: '40px'}}>
          <Grid item>
            <Typography variant='h6'>
              Clientes
            </Typography>
          </Grid>
        </Grid>
        <Grid item container xs={6} spacing={1} justifyContent='flex-end' alignItems='flex-end' style={{paddingRight: '40px'}}>
          <Grid item>
            { 
              searchLoading ?
              <CircularProgress size={25} /> :
              <SearchIcon /> 
            }
          </Grid>
          <Grid item>
            <Input 
              id="clientSearch"
              placeholder="Buscar…"
              onChange={onChangeSearch}
            />
          </Grid>
        </Grid>
      </Grid>
    )
  }

  const RenderClientsTable = (props) => {

    const { clientInfo, setClientInfo } = props
    
    return(
      <TableBody>
        {
          data && data.clients.map((client, index ) => {

            const handleMenuItemClick = (event) => {
              setSelectedIndex(client.id);
              setClientInfo(client);
            };
            
            return(
            <TableRow
              index={client.id}
              key={client.id}
              hover 
              selected={clientInfo ? client.id === clientInfo.id : client.id === selectedIndex} 
              onClick={handleMenuItemClick}
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

  let sortHandler = sort.bind(this)

  return(
    <>
      { renderClientControl() }
      <Dialog open={selectClientDialog} onClose={openClientList} maxWidth={false}>
        <Grid container item xs justifyContent='center'>
          <Grid item xs={11}>
            { renderInputSearch() }
          </Grid>
          <Grid item xs={11}>
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
              <RenderClientsTable clientInfo={clientInfo} setClientInfo={setClientInfo}/>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    page={page}
                    rowsPerPage={per}
                    onPageChange={changePage}
                    count={total_records}
                    labelRowsPerPage="Filas por página:"
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </Grid>
          <Grid container item xs={11} justifyContent='flex-end' style={{padding:'20px'}}>
            <Grid item xs={2} style={{paddingRight:'10px'}}>
              <Button fullWidth onClick={cancelSelect} variant='outlined' color="secondary">
                Cancelar
              </Button>
            </Grid>
            <Grid item xs={2} style={{paddingLeft:'10px'}}>
              <Button fullWidth onClick={openClientList} variant='outlined' color="primary">
                Aceptar
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Dialog>
    </>
  )
}

export default ClientSearch;
