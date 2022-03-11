import React, { useState, useEffect }           from 'react'
import TableRow                                 from '@material-ui/core/TableRow';
import TableBody                                from '@material-ui/core/TableBody';
import TableCell                                from '@material-ui/core/TableCell';
import Skeleton                                 from '@material-ui/lab/Skeleton';
import { useQuery }                             from '@apollo/client';
import { GET_PROCEDURES }                       from '../queries_and_mutations/queries';
import TableRows                                from './table_rows';
import { Typography }                           from '@material-ui/core';

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
    sortDirection: sortDirection,
    sortField: sortField,
    search: {
      simpleSearch: simpleSearchValue,
      clientFullName: clientFullNameValue,
      serialNumber: serialNumberValue,
      budgetingTemplateName: budgetingTemplateNameValue,
      proceduresTemplateName: proceduresTemplateNameValue,
      createdAt: createdAtValue,
    }
  }
  
  const [array] = useState([1,2,3,4,5]);

  const { loading, data, refetch } = useQuery(
    GET_PROCEDURES, { variables: variables }
  );

  return(
    <TableBody>
      {
        loading || !data ? array.map(
          (index) => {
            return (
              <TableRow key={`proceduresLoading-${index}`}>
                <TableCell align="center" colSpan={12} className={ classes.loadingTableCell }>
                  <Skeleton variant="rect" width="100%" heigth={50}/>
                  <Skeleton variant="rect" width="100%" heigth={50}/>
                </TableCell>
              </TableRow>
            )
          }
        ) : (
          data.procedures.length ? data.procedures.map(
            (procedure) => { 
              return(
                <TableRows
                  procedure={ procedure }
                  key={ procedure.id + "-procedureRow" }
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
}

export default ProceduresTableBody;
