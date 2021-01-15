import React, { useEffect }           from 'react'
import CircularProgress               from '@material-ui/core/CircularProgress';
import TableRow                       from '@material-ui/core/TableRow';
import TableCell                      from '@material-ui/core/TableCell';
import TableBody                      from '@material-ui/core/TableBody';
import { useQuery }                   from '@apollo/react-hooks';
import { PROCEDURE_TEMPLATES }        from '../queries_and_mutations/queries';
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
    PROCEDURE_TEMPLATES, { variables: variables, fetchPolicy: "no-cache" }
  );

  let totalCount = data && data.proceduresTemplatesCount


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
          data.proceduresTemplates.map(proceduresTemplate => (
            <TemplateRow
              data={ proceduresTemplate }
              key={ proceduresTemplate.id + "-Templaterow" }
              classes={ classes }
            />
          ))
        }
      </TableBody>
    )
  }
};

export default TableBodyTemplate;
