import React, { useState, useEffect }           from 'react'
import Skeleton                                 from '@material-ui/lab/Skeleton';
import TableRow                                 from '@material-ui/core/TableRow';
import TableCell                                from '@material-ui/core/TableCell';
import TableBody                                from '@material-ui/core/TableBody';
import { useQuery }                             from '@apollo/client';
import { GET_BUDGETS }                          from '../queries_and_mutations/queries';
import TemplateRow                              from './template_row';
import { Typography }                           from '@material-ui/core';


export default (props) => {
  const { 
    page,
    per,
    sortDirection,
    sortField,
    simpleSearchValue,
    assingTotalRecords,
    classes,
    clientNameValue,
    serialNumberValue,
    moreThanValue,
    lessThanValue,
    setRunAdvancedSearch,
    runAdvancedSearch
  } = props

  let variables = {
    page: page + 1,
    per: per,
    sortDirection: sortDirection,
    sortField: sortField,
    search: {
      simpleSearch: simpleSearchValue,
      clientName: clientNameValue,
      serialNumber: serialNumberValue,
      totalMoreThanEq: moreThanValue,
      totalLessThanEq: lessThanValue,
    }
  };

  const { loading, data, refetch } = useQuery(
    GET_BUDGETS, { variables: variables, fetchPolicy: "cache-and-network" }
  );

  const [array] = useState([1,2,3,4,5]);

  useEffect(() => {
    assingTotalRecords((data && data.budgetsCount) || 0)
  }, [loading]);

  useEffect(() => {
    if(!loading && runAdvancedSearch) {
      setRunAdvancedSearch(false)
    }
  }, [loading])

  useEffect(() => {
    if (runAdvancedSearch) {
      refetch()
    }
  }, [runAdvancedSearch])

  return(
    <TableBody>
      {
        loading || !data ? array.map(
          (index) => {
            return (
              <TableRow key={`budgetsLoading-${index}`}>
                <TableCell align="center" colSpan={12} className={ classes.loadingTableCell }>
                  <Skeleton variant="rect" width="100%" heigth={50}/>
                  <Skeleton variant="rect" width="100%" heigth={50}/>
                </TableCell>
              </TableRow>
            )
          }
        ) : (
          data.budgets.length ? data.budgets.map(
            (budget) => {
              return(
                <TemplateRow
                  budget={ budget }
                  key={ budget.id + "-BudgetRow" }
                  classes={ classes }
                />
              )
            }
          ) : (
            <TableRow>
              <TableCell align="center" colSpan={7} className={ classes.loadingTableCell }>
                <Typography variant='h5' align='center'>Sin Resultados</Typography>
              </TableCell>
            </TableRow>
          )
        )
      }
    </TableBody>
  )
};
