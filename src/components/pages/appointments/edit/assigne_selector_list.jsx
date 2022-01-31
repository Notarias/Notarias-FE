import React, { useState, useEffect } from 'react';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import Chip from '@material-ui/core/Chip';
import MenuItem from '@material-ui/core/MenuItem';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useQuery } from '@apollo/client';
import { USERS_QUICK_LIST } from '../queries_and_mutations/queries';
import { Grid } from '@material-ui/core';

const AssigneSelectorList = (props) => {
  const { selectedIds, setSelectedIds, appointment } = props;
  
  const [userList, setUserList] = useState();
  const [userListIds, setUserListIds] = useState();
  
  const { data } = useQuery(
    USERS_QUICK_LIST
  );

  useEffect( () => {
    if(data && data.usersQuickList){
      setUserList(data.usersQuickList);
      setUserListIds(data.usersQuickList.map((user) => {
        return(user.id);
      }));
    };
  }, [data]);

  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    small: {
      width: theme.spacing(3),
      height: theme.spacing(3),
    },
  }));


  const classes = useStyles();

  const handleChange = (event) => {
    setSelectedIds(event.target.value)
  };

  const printSelectedsNames = (id) => {
    return(
      userList && userList.map((user) => {
        if(user.id == id) {
          return(
            `${user.firstName} ${user.lastName}`
          )
        }
        return('')
      })
    )
  }

  const printUserList = (id) => {
    return(
      userList && userList.map((user) => {
        if(user.id == id){
          return(
            <React.Fragment key={`appointment-${appointment.id}-avatar-${user.id}`}>
              <Avatar className={classes.small}>{user.avatarThumbUrl}</Avatar>
              <Typography variant="inherit" style={{ marginLeft: '10px' }}>{`${user.firstName} ${user.lastName}`}</Typography>
            </React.Fragment>
          )
        }
      })
    )
  }
  
  return(
    <Grid item xs={12}>
      <FormControl fullWidth>
        <InputLabel id="demo-mutiple-chip-label">Invitados</InputLabel>
        <Select
          multiline
          labelId="demo-mutiple-chip-label"
          id="demo-mutiple-chip"
          multiple
          fullWidth
          value={selectedIds}
          onChange={handleChange}
          input={<Input id="select-multiple-chip" />}
          renderValue={(selected) => (
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
              {selected.map((id) => (
                <Chip 
                  id={id} 
                  key={id}
                  style={{ margin: 2 }}
                  label={printSelectedsNames(id)}
                  variant="outlined"/>
              ))}
            </div>
          )}
        >
          {userListIds && userListIds.map((id) => (
            <MenuItem id={id} key={`edit-appointment-${appointment.id}-dialog-user-${id}`} value={id}>
              {printUserList(id)}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Grid>
  );
}

export default AssigneSelectorList;
