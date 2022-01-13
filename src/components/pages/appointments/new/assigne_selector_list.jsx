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
import { USERS_QUICK_LIST } from './../queries_and_mutations/queries';
import { Grid } from '@material-ui/core';

const AssigneSelectorList = (props) => {
  const { selecteds, setSelecteds } = props;

  const [userList, setUserList] = useState();

  const { loading, data, refetch } = useQuery(
    USERS_QUICK_LIST
  );

  useEffect( () => {
    if(data && data.usersQuickList){
      setUserList(data.usersQuickList);
    }
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
    setSelecteds(event.target.value);
  };

  return(
    <Grid item xs={12}>
      <FormControl fullWidth>
        <InputLabel id="demo-mutiple-chip-label">Invitados</InputLabel>
        <Select
          multiline
          id="assigneeIds"
          multiple
          fullWidth
          value={selecteds}
          onChange={handleChange}
          input={<Input id="select-multiple-chip" />}
          renderValue={(selected) => (
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
              {selected.map((user) => (
                <Chip 
                  id={user.id}
                  key={user.id}
                  style={{ margin: 2 }}
                  label={`${user.firstName} ${user.lastName}`}
                  variant="outlined"/>
              ))}
            </div>
          )}
        >
          {userList && userList.map((user) => (
            <MenuItem id={user.id} key={user.id} value={user}>
              <Avatar className={classes.small}>{user.avatarThumbUrl}</Avatar>
              <Typography variant="inherit" style={{ marginLeft: '10px' }}>{`${user.firstName} ${user.lastName}`}</Typography>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Grid>
  );
}

export default AssigneSelectorList;
