import React, { useEffect }                from 'react'
import CircularProgress                    from '@material-ui/core/CircularProgress';
import TableRow                            from '@material-ui/core/TableRow';
import TableCell                           from '@material-ui/core/TableCell';
import TableBody                           from '@material-ui/core/TableBody';
import { useQuery }                        from '@apollo/client';
import { GET_BUDGETING_TEMPLATES }         from '../queries_and_mutations/queries';
import TemplateRow                         from './template_row';


export default (props) => {

  const { page, per, sortDirection, sortField, searchField, searchValue, assingTotalRecords, classes, id, setGetTemplatesVariables } = props
  let variables = {
    page: page + 1,
    per: per,
    searchField: searchField,
    searchValue: searchValue,
    sortDirection: sortDirection,
    sortField: sortField,
    id: id
  }

  const { loading, data, refetch } = useQuery(
    GET_BUDGETING_TEMPLATES, { variables: variables }
  );

  let totalCount = data && data.budgetingTemplatesCount

  useEffect(() => {
    refetch(variables);
    setGetTemplatesVariables(variables)
    totalCount && assingTotalRecords(totalCount)
  }, [page, per, searchField, searchValue, sortField, sortDirection, totalCount]);


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
          data.budgetingTemplates.map(budgetingTemplate => (
            <TemplateRow
              data={ budgetingTemplate }
              key={ budgetingTemplate.id + "-BudgetingTemplaterow" }
              classes={ classes }
            />
          ))
        }
      </TableBody>
    )
  }
};
