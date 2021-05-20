import React, { useEffect }           from 'react'
import CircularProgress               from '@material-ui/core/CircularProgress';
import TableRow                       from '@material-ui/core/TableRow';
import TableCell                      from '@material-ui/core/TableCell';
import TableBody                      from '@material-ui/core/TableBody';
import { useQuery }                   from '@apollo/react-hooks';
import { GET_BUDGETS }                from '../queries_and_mutations/queries';
import TemplateRow                    from './template_row';


const TableBodyTemplate = (props) => {

  const { page, per, sortDirection, sortField, search, assingTotalRecords, classes, setGetTemplatesVariables } = props
  let variables = {
    page: page + 1,
    per: per,
    search: search,
    sortDirection: sortDirection,
    sortField: sortField,
  }

  const { loading, data, refetch } = useQuery(
    GET_BUDGETS, { variables: variables, fetchPolicy: "no-cache" }
  );

  let totalCount = data && data.budgetsCount

  useEffect(() => {
    refetch(variables);
    setGetTemplatesVariables(variables)
    totalCount && assingTotalRecords(totalCount)
  }, [page, per, search, sortField, sortDirection, totalCount]);


  if (loading || !data) {
    return(
      <TableBody>
        <TableRow>
          <TableCell align="center" colSpan={6} className={ classes.loadingTableCell }>
            <CircularProgress className={ classes.searchLoadingIcon } size={ 100 }/>
          </TableCell>
        </TableRow>
      </TableBody>
    )
  } else {
    return(
      <TableBody>
        {
          data.budgets.map(
            (budget) => {
              return(
                <TemplateRow
                  budget={ budget }
                  key={ budget.id + "-BudgetRow" }
                  classes={ classes }
                />
              )
            }
          )
        }
      </TableBody>
    )
  }
};

export default TableBodyTemplate;
