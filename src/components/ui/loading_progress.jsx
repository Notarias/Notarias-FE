import React, { useEffect }               from 'react'
import CircularProgress                   from '@material-ui/core/CircularProgress';
import TableRow                           from '@material-ui/core/TableRow';
import TableCell                          from '@material-ui/core/TableCell';

const LoadingProgress = (props) => {

  const { classes } = props;

  return(
    <TableRow key={  "-row" }>
      <TableCell align="center" colSpan={6} className={ classes.loadingTableCell }>
        <CircularProgress className={ classes.searchLoadingIcon } size={ 100 }/>
      </TableCell>
    </TableRow>
  )

}

export default LoadingProgress
