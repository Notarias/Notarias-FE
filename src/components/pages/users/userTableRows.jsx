import React, { useEffect }                from 'react'
import TableCell            from '@material-ui/core/TableCell';
import TableRow             from '@material-ui/core/TableRow';
import MenuItem             from '@material-ui/core/MenuItem';
import { useQuery }         from '@apollo/client';
import { useMutation }      from '@apollo/client';
import { UPDATE_USER }      from './queries_and_mutations/queries';
import { styles }           from './styles';
import { withStyles }       from '@material-ui/core/styles';
import { Link }             from 'react-router-dom';
import { GET_CURRENT_USER } from './queries_and_mutations/queries'
import GenericDropdownMenu  from '../../ui/generic_dropdown_menu';
import CreateIcon                     from '@material-ui/icons/Create';
import Grid                           from '@material-ui/core/Grid';
import ListItemIcon                   from '@material-ui/core/ListItemIcon';
import ListItemText                   from '@material-ui/core/ListItemText';
import LockOpenTwoToneIcon from '@material-ui/icons/LockOpenTwoTone';
import LockTwoToneIcon from '@material-ui/icons/LockTwoTone';

const  UserTableRows = (props) => {
  const {classes, user } = props
  const [locked, setLocked] = React.useState(props.user.lockedAt)

  const { data } = useQuery(GET_CURRENT_USER);

  const [updateUserMutation] =
  useMutation(
    UPDATE_USER,
    {
      onCompleted(cacheData) {
        setLocked(cacheData.updateUser.user.lockedAt)
      },
    }
  )

  const unLockUserMutation = (event) => {
    updateUserMutation({
      variables: { id: user.id, locked: false }
    })
  }

  const lockUserMutation = (event) => {
    updateUserMutation({
      variables: { id: user.id, locked: true }
    })
  }

  useEffect (() => {
    setLocked(locked)
  },[data]);


  const renderStatusUser = () => {
    if (locked ){
    return(
      <Grid container onClick={unLockUserMutation}>
        <ListItemIcon >
          <LockOpenTwoToneIcon/>
        </ListItemIcon>
        <ListItemText primary="Desbloquear" />
      </Grid>
    )} else {
      return(
        <Grid container onClick={lockUserMutation} disabled>
          <ListItemIcon  >
            <LockTwoToneIcon/>
          </ListItemIcon>
          <ListItemText primary="Bloquear" />
        </Grid>
      )
    }
  }


  return( 
    <TableRow key={user.id} className={ locked && classes.lockedUserRow }>
      <TableCell align="center">{user.firstName}</TableCell>
      <TableCell align="center">{user.lastName}</TableCell>
      <TableCell align="center">{user.email}</TableCell>
      <TableCell align="center">
        <Grid>
          <GenericDropdownMenu>
            <MenuItem key={user.id + "editar"}>
              <Link
                  to={`/users/${ user.id }/edit`}
                  color="inherit"
                  underline="none"
                  className={ classes.linkDefault }
                >
                <Grid container>
                  <ListItemIcon>
                    <CreateIcon className={ classes.defaultIcon }/>
                  </ListItemIcon>
                  <ListItemText primary="Editar" />
                </Grid>
              </Link>
            </MenuItem>
            <MenuItem key={user.id + "status"} disabled={data && data.currentUser.id === user.id}>
              {renderStatusUser()}
            </MenuItem>
          </GenericDropdownMenu>
        </Grid>
      </TableCell>
    </TableRow>
  )

}

export default withStyles(styles)(UserTableRows);
