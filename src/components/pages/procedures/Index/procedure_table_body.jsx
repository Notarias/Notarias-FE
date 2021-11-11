import React, { useEffect }               from 'react'
import CircularProgress                   from '@material-ui/core/CircularProgress';
import TableRow                           from '@material-ui/core/TableRow';
import TableCell                          from '@material-ui/core/TableCell';
import TableBody                          from '@material-ui/core/TableBody';
import { useQuery }                       from '@apollo/react-hooks';
import { GET_PROCEDURES }                 from '../queries_and_mutations/queries';
import TemplateRow                        from './template_row';

const ProceduresTableBody = (props) => {

  const { 
    page,
    per,
    sortDirection,
    sortField,
    assingTotalRecords,
    simpleSearchValue,
    serialNumberValue,
    clientFullNameValue,
    budgetingTemplateNameValue,
    proceduresTemplateNameValue,
    reporterAvatarThumbUrl,
    createdAtValue,
    templatesVariables,
    setTemplatesVariables,
    classes
  } = props

  let variables = {
    page: page + 1,
    per: per,
    search: {
      simpleSearch: simpleSearchValue,
      serialNumber: serialNumberValue,
      clientFullName: clientFullNameValue,
      budgetingTemplateName: budgetingTemplateNameValue,
      proceduresTemplateName: proceduresTemplateNameValue,
      createdAt: createdAtValue
    },
    sortDirection: sortDirection,
    sortField: sortField
  }

  const { loading, data, refetch } = useQuery(
    GET_PROCEDURES, { variables: variables, fetchPolicy: "no-cache" }
  );

  let totalCount = data && data.proceduresCount

  useEffect(() => {
    refetch(variables);
    setTemplatesVariables(variables)
    totalCount && assingTotalRecords(totalCount)
  }, [page, per, simpleSearchValue, serialNumberValue, clientFullNameValue, budgetingTemplateNameValue,
    proceduresTemplateNameValue, createdAtValue, sortField, sortDirection, totalCount ]);

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
          data.procedures.map(
            (procedure) => {
              return(
                <TemplateRow
                  procedure={ procedure }
                  key={ procedure.id + "-procedureRow" }
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

export default ProceduresTableBody;
