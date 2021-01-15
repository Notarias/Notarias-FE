import React                          from 'react'
import CircularProgress               from '@material-ui/core/CircularProgress';
import TableRow                       from '@material-ui/core/TableRow';
import TableCell                      from '@material-ui/core/TableCell';
import TableBody                      from '@material-ui/core/TableBody';
import { useQuery }                   from '@apollo/react-hooks';
import { GET_BUDGETING_TEMPLATES }    from '../queries_and_mutations/queries';
import TemplateRow                    from './template_row';


const TableBodyTemplate = (props) => {

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
    GET_BUDGETING_TEMPLATES, { variables: variables, fetchPolicy: "no-cache" }
  );

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

export default TableBodyTemplate;
