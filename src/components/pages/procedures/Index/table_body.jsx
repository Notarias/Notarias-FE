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
    classes,
    page,
    per,
    sortDirection,
    sortField,
    simpleSearchValue,
    assingTotalRecords,
    clientNameValue,
    serialNumberValue,
    writingNumberValue,
    budgetTemplateName,
    procedureTemplateName,
    initDateValue,
    endDateValue,
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
      clientFullName: clientNameValue,
      serialNumber: serialNumberValue,
      writingNumber: writingNumberValue,
      budgetingTemplate: budgetTemplateName,
      proceduresTemplate: procedureTemplateName,
      initDate: initDateValue,
      endDate: endDateValue,
    }
  }
  
  const [array] = useState([1,2,3,4,5]);

  const { loading, data, refetch } = useQuery(
    GET_PROCEDURES, { variables: variables, fetchPolicy: "cache-and-network" }
  );
  
  useEffect(() => {
    assingTotalRecords((data && data.proceduresCount) || 0)
  }, [data && data.proceduresCount]);

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
