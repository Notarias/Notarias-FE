import React, { useState, useEffect }     from 'react';
import Grid                               from '@material-ui/core/Grid';
import FormControl                        from '@material-ui/core/FormControl';
import InputLabel                         from '@material-ui/core/InputLabel';
import Select                             from '@material-ui/core/Select';
import MenuItem                           from '@material-ui/core/MenuItem';
import Avatar                             from '@material-ui/core/Avatar';
import ListItemIcon                       from '@material-ui/core/ListItemIcon';
import ListItemText                       from '@material-ui/core/ListItemText';
import { useQuery }                       from '@apollo/client';
import { USERS_QUICK_LIST }               from '../queries/queries';

const SelectUsers = (props) => {
  const { userInfo, setUserInfo } = props;

  const [userList, setUserList] = useState();

  const { data } = useQuery(
    USERS_QUICK_LIST
  );

  useEffect( () => {
    if(data && data.usersQuickList){
      setUserList(data.usersQuickList);
    }
  }, [data]);

  const selectUserInfo = (event) => {
    setUserInfo(event.target.value);
  }
  return(
    <Grid item container direction='column' xs>
      <Grid item xs>
        <FormControl fullWidth>
          <InputLabel id="user-select">Usuarios</InputLabel>
          <Select
            id="selected"
            fullWidth
            value={userInfo}
            onChange={selectUserInfo}
          >
            {userList && userList.map((user) => (
              <MenuItem id={user.id} key={`appointment-user.id-${user.id}`} value={user}>
                <Grid container direction='row' justifyContent='flex-start' alignItems='center' style={{paddingLeft:'10px'}}>
                  <Grid item>
                    <ListItemIcon>
                      <Avatar alt={user.firstName} src={user.avatarThumbUrl} />
                    </ListItemIcon>
                  </Grid>
                  <Grid item>
                    <ListItemText primary={user.fullName} />
                  </Grid>
                </Grid>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
}

export default SelectUsers;
