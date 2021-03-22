import React, { useEffect }           from 'react'
import CircularProgress               from '@material-ui/core/CircularProgress';
import TableRow                       from '@material-ui/core/TableRow';
import TableCell                      from '@material-ui/core/TableCell';
import TableBody                      from '@material-ui/core/TableBody';
import { useQuery }                   from '@apollo/react-hooks';
import { GET_BUDGETS }                from '../queries_and_mutations/queries';
import TemplateRow                    from './template_row';


const TableBodyTemplate = (props) => {

  const { page, per, sortDirection, sortField, search, searchValue, assingTotalRecords, classes, id, setGetTemplatesVariables } = props
  let variables = {
    page: page + 1,
    per: per,
    search: search,
    sortDirection: sortDirection,
    sortField: sortField,
  }

  //setear la busqueda en event target para enviar el valor y si no, enviar null
  const { loading, data, refetch } = useQuery(
    GET_BUDGETS, { variables: variables, fetchPolicy: "no-cache" }
  );

  let totalCount = 5

  useEffect(() => {
    refetch(variables);
    setGetTemplatesVariables(variables)
    totalCount && assingTotalRecords(totalCount)
  }, [page, per, search, sortField, sortDirection, totalCount]);

  console.log("budg", data)

  const arrDemo = [{
    0: {id: 1},
    1: {id: 2},
    2: {id: 3},
    3: {id: 4},
    4: {id: 5}
  }]

  if (!true) {
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
        {/* {
          data.budgets.map(budget => (
            <TemplateRow
              data={ budget }
              key={ budget.id + "-Budgetrow" }
              classes={ classes }
            />
          ))
        } */}
        {
          arrDemo.map(
            ( item ) => {
              return (
                <TemplateRow
                  key={ item.id + "row" }
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
