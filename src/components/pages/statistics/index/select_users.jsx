import React, { useState, useEffect }     from 'react';
import Grid                               from '@material-ui/core/Grid';
import FormControl                        from '@material-ui/core/FormControl';
import InputLabel                         from '@material-ui/core/InputLabel';
import Select                             from '@material-ui/core/Select';
import Input                              from '@material-ui/core/Input';
import Chip                               from '@material-ui/core/Chip';
import MenuItem                           from '@material-ui/core/MenuItem';
import Avatar                             from '@material-ui/core/Avatar';
import ListItemIcon                       from '@material-ui/core/ListItemIcon';
import ListItemText                       from '@material-ui/core/ListItemText';
import { useQuery }                       from '@apollo/client';
import { USERS_QUICK_LIST }               from '../queries/queries';

const SelectUsers = (props) => {
  const { userSelectedIds, changeUserSelectedIds } = props;

  const [userList, setUserList] = useState();

  const { data } = useQuery(
    USERS_QUICK_LIST
  );

  useEffect( () => {
    if(data && data.usersQuickList){
      setUserList(data.usersQuickList);
    }
  }, [data]);

  return(
    <Grid item container direction='column' xs>
      <Grid item xs>
        <FormControl fullWidth>
          <InputLabel id="demo-mutiple-chip-label">Usuarios</InputLabel>
          <Select
            multiline
            id="assigneeIds"
            multiple
            fullWidth
            value={userSelectedIds}
            onChange={changeUserSelectedIds}
            input={<Input id="select-multiple-chip" />}
            renderValue={(selected) => (
              <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {selected.map((user) => (
                  <Chip 
                    id={user.id}
                    key={user.id}
                    style={{ margin: 2 }}
                    label={user.fullName}
                    variant="outlined"/>
                ))}
              </div>
            )}
          >
            {userList && userList.map((user) => (
              <MenuItem id={user.id} key={`appointment-user.id-${user.id}`} value={user}>
                <ListItemIcon>
                  <Avatar alt={user.firstName} src={user.avatarThumbUrl} />
                </ListItemIcon>
                <ListItemText primary={`${user.firstName} ${user.lastName}`} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
}

export default SelectUsers;
