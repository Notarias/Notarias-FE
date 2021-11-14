import React, { useEffect } from 'react'
import TableCell            from '@material-ui/core/TableCell';
import TableRow             from '@material-ui/core/TableRow';
import gql                  from 'graphql-tag';
import { useQuery }         from '@apollo/react-hooks';
import TableBody            from '@material-ui/core/TableBody';
import CircularProgress     from '@material-ui/core/CircularProgress';
import UserTableRows        from './userTableRows';

const LOAD_USERS = gql`
  query searchClients(
    $page: Int,
    $per: Int,
    $sortField: String,
    $sortDirection: String,
    $searchField: String,
    $searchValue: String
  ) {
  users(
    page: $page,
    per: $per,
    sortField: $sortField,
    sortDirection: $sortDirection,
    searchField: $searchField,
    searchValue: $searchValue
  ) {
    id
    firstName
    lastName
    email
    lockedAt
    roleId
    role {
      name
      permanentLink
      createdAt
      updatedAt
    }
  }
  usersCount
}
`

export default (props) => {
  const { page, per, sortDirection, sortField, searchField, searchValue, classes, setTotalRecords } = props
  let variables = {
    page: page + 1,
    per: per,
    searchField: searchField,
    searchValue: searchValue,
    sortDirection: sortDirection,
    sortField: sortField
  }

  const { loading, data, refetch } = useQuery(
    LOAD_USERS, { vairables: variables, errorPolicy: 'all', fetchPolicy: "no-cache" }
  );
  
  useEffect(() => {
    refetch(variables);
  }, [page, per, searchField, searchValue, sortField, sortDirection]);

  useEffect(() => {
    data && setTotalRecords(data.usersCount)
  }, [data]);

  if (loading || !data) {
    return(
      <TableBody>
        <TableRow>
          <TableCell align="center" colSpan={4} className={classes.loadingTableCell}>
            <CircularProgress className={classes.searchLoadingIcon} size={100}/>
          </TableCell>
        </TableRow>
      </TableBody>
    )
  } else {
    return(
      <TableBody>
        {
          data.users.map(user => (
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
