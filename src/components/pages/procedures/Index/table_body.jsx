import React, { useEffect }               from 'react'
import TableBody                          from '@material-ui/core/TableBody';
import { useQuery }                       from '@apollo/client';
import { GET_PROCEDURES }                 from '../queries_and_mutations/queries';
import TableRows                        from './table_rows';
import LoadingProgress                    from '../../../ui/loading_progress';

const ProceduresTableBody = (props) => {

  const { 
    page,
    per,
    sortDirection,
    sortField,
    assingTotalRecords,
    simpleSearchValue,
    clientFullNameValue,
    serialNumberValue,
    budgetingTemplateNameValue,
    proceduresTemplateNameValue,
    createdAtValue,
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
      createdAt: createdAtValue,
    },
    sortDirection: sortDirection,
    sortField: sortField
  }

  const { loading, data, refetch } = useQuery(
    GET_PROCEDURES, { variables: variables }
  );

  let totalCount = data && data.proceduresCount;

  const proceduresRows = (params) => {
    return(
      params.procedures.map((procedure) => { 
        return(
          <TableRows
            procedure={ procedure }
            key={ procedure.id + "-procedureRow" }
            classes={ classes }
          />
        )
      })
    )
  }
  
  useEffect(() => {
    refetch(variables);
    setTemplatesVariables(variables)
    totalCount && assingTotalRecords(totalCount)
  }, [page, per, simpleSearchValue, serialNumberValue, clientFullNameValue, budgetingTemplateNameValue,
    proceduresTemplateNameValue, createdAtValue, sortField, sortDirection, totalCount ]);

  return(
    <TableBody>
      { loading || !data ? <LoadingProgress classes={ classes }/> : proceduresRows(data) }
    </TableBody>
  )
}

export default ProceduresTableBody;
