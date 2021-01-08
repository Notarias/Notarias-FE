import React, { useEffect }           from 'react'
import CircularProgress               from '@material-ui/core/CircularProgress';
import TableRow                       from '@material-ui/core/TableRow';
import TableCell                      from '@material-ui/core/TableCell';
import TableBody                      from '@material-ui/core/TableBody';
// import TemplateRow                    from './template_row';


const TableBodyTemplate = (props) => {

  const { page, per, sortDirection, sortField, searchField, searchValue, assingTotalRecords, classes, id } = props
//   let variables = {
//     page: page + 1,
//     per: per,
//     searchField: searchField,
//     searchValue: searchValue,
//     sortDirection: sortDirection,
//     sortField: sortField,
//     id: id
//   }


  return(
    <TableBody>
      <TableRow>
          <TableCell align="center" colSpan={3} className={ classes.loadingTableCell }>
          <CircularProgress className={ classes.searchLoadingIcon } size={ 100 }/>
          </TableCell>
      </TableRow>
    </TableBody>
  )
};

export default TableBodyTemplate;
