import React, { useEffect } from 'react'
import TableCell            from '@material-ui/core/TableCell';
import TableRow             from '@material-ui/core/TableRow';
import { useQuery }         from '@apollo/client';
import { LOAD_USERS }       from './queries_and_mutations/queries';
import TableBody            from '@material-ui/core/TableBody';
import CircularProgress     from '@material-ui/core/CircularProgress';
import UserTableRows        from './user_table_rows';

export default (props) => {
  const { page, per, sortDirection, sortField, searchField, searchValue, setTotalRecords, users, setUsers } = props
  let variables = {
    page: page + 1,
    per: per,
    searchField: searchField,
    searchValue: searchValue,
    sortDirection: sortDirection,
    sortField: sortField
  }                                                                       

  const { loading, data, refetch } = useQuery(
    LOAD_USERS, { vairables: variables, fetchPolicy: "cache-and-network" }
  );

  useEffect(() => {
    refetch(variables);
    data && setUsers(data.users)
    data && setTotalRecords(data.usersCount)
  }, [data, page, per, searchField, searchValue, sortField, sortDirection]);

  if (loading || !data) {
    return(
      <TableBody>
        <TableRow>
          <TableCell align="center" colSpan={4}>
            <CircularProgress size={100}/>
          </TableCell>
        </TableRow>
      </TableBody>
    )
  } else {
    return(
      <TableBody>
        {
          users.map(user => (
            <UserTableRows 
              user={user}
              key={ user.id + "-userRow" }
              page={page}
              per={per}
              searchField={searchField}
              sortDirection={sortDirection}
              sortField={sortField}
            />
          ))
        }
      </TableBody>
    )
  }
}
