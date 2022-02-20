import React, { useEffect }               from 'react'
import CircularProgress                   from '@material-ui/core/CircularProgress';
import TableRow                           from '@material-ui/core/TableRow';
import TableCell                          from '@material-ui/core/TableCell';
import TableBody                          from '@material-ui/core/TableBody';
import { useQuery }                       from '@apollo/client';
import { GET_BUDGETS }                    from '../queries_and_mutations/queries';
import TemplateRow                        from './template_row';
import { Typography } from '@material-ui/core';


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
    procedureNameValue,
    serialNumberValue,
    moreThanValue,
    lessThanValue,
    setRunAdvancedSearch,
    runAdvancedSearch
  } = props

  const { loading, data, refetch } = useQuery(GET_BUDGETS,
    {
      variables: {
        page: page + 1,
        per: per,
        search: {
          simpleSearch: simpleSearchValue,
          clientName: clientNameValue,
          templateName: procedureNameValue,
          serialNumber: serialNumberValue,
          totalMoreThanEq: moreThanValue,
          totalLessThanEq: lessThanValue,
        },
        sortDirection: sortDirection,
        sortField: sortField,
      },
      fetchPolicy: 'no-cache'
    }
  );

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
        loading || !data ? (
          <TableRow>
            <TableCell align="center" colSpan={7} className={ classes.loadingTableCell }>
              <CircularProgress className={ classes.searchLoadingIcon } size={ 100 }/>
            </TableCell>
          </TableRow>
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
