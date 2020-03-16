import React, { useState }          from 'react';
import { withStyles }               from '@material-ui/core/styles';
import Table                        from '@material-ui/core/Table';
import Paper                        from '@material-ui/core/Paper';
import TableRow                     from '@material-ui/core/TableRow';
import TableCell                    from '@material-ui/core/TableCell';
import TableBody                    from '@material-ui/core/TableBody';
import { setBreadcrumbsList }       from '../../interfaces/breadcrumbs_interface';
import { styles }                   from './styles';
import TableHeader                  from './table_header';
import ClientRows                   from './client_rows';
import TableFooter          from '@material-ui/core/TableFooter';
import TablePagination      from '@material-ui/core/TablePagination';
import ClientsCollection    from '../../models/collections/clients_collection'
import ControlsBar          from './controls_bar';

const BREADCRUMBS = [
  { name: "Inicio", path: "/" },
  { name: "Clientes", path: null }
]

setBreadcrumbsList(BREADCRUMBS)

const Clients = (props) => {
  const [searchLoading, setSearchLoading] = useState(false);
  const [sortField, setSortField]         = useState("first_name")
  const [sortDirection, setSortDirection] = useState("desc")
  const [page, setPage]                   = useState(0)
  const [per, setPer]                     = useState(5)
  const [total_records, setTotalRecords]  = useState(10)

  const { classes } = props

  const submitData = (params) => {
    this.setState({ loading: true })
    this.state.clientsCollection.load(params).then(() => {
      this.setState({ loading: false })
    })
  }

  const cancelCall = () => {
    this.state.clientsCollection.cancelLoad()
  }

  const changeRowsPerPage = (event) => {
    let per = event.target.value
    setPer(per)
  }

  const changePage = (event, page) => {
    setPage(page)
  }

  const onChangeSearch = (event) => {
    this.state.timeout && clearTimeout(this.state.timeout)
    let predicate = event.currentTarget.attributes.predicate.value
    let searchText = event.target.value
    const search_params = { search: { [predicate]: searchText } }
    const view = this

    let timeout = setTimeout(() => {
      view.state.clientsCollection
        .search(search_params)
        .finally((val) => {
          view.setState({ searchLoading: false })
        })
    }, 2000)

  }

  const sort = (params) => {
    submitData(params)
  }

  return(
    <div className={classes.root}>
      <ControlsBar
        classes={classes}
        searchLoading={searchLoading}
        onChangeSearch={onChangeSearch.bind(this)}/>
      <div className={classes.tableWrapper}>
        <Paper >
          <Table className={classes.table}>
            <TableHeader field={sortField} direction={sortDirection} sortHandler={sort.bind(this) }/>
            <TableBody>
              <ClientRows 
                page={page}
                per={per}
                search={{}}
                sort={sort}
                setTotalRecords={setTotalRecords}
                classes={classes} />
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  page={page}
                  rowsPerPage={per}
                  rowsPerPageOptions={[5, 10, 15, 20]}
                  onChangePage={changePage}
                  onChangeRowsPerPage={changeRowsPerPage}
                  count={total_records}
                  labelRowsPerPage={"Filas por página:"}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </Paper>
      </div>
    </div>
  )

}

export default withStyles(styles)(Clients);
