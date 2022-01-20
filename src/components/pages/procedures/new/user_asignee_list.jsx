import React, { useEffect, useState } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Divider from '@material-ui/core/Divider';
import Fuse from 'fuse.js';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import { useQuery } from '@apollo/client';
import { USERS_QUICK_LIST } from '../queries_and_mutations/queries';

const UserAsigneeList = (props) => {

  const { asignee, setAsignee } = props;

  const [userList, setUserList] = useState();
  const [searchList, setSearchList] = useState();

  const { data } = useQuery(
    USERS_QUICK_LIST,
    { fetchPolicy: 'no-cache', }
  );

  let fuzzySearch = new Fuse(userList, { keys: ['firstName', 'lastName'] });

  useEffect( () => {
    if(data && data.usersQuickList){
      setUserList(data.usersQuickList);
      setSearchList(data.usersQuickList);
    }
  }, [data]);

  const searchUser = (event) => {
    let searchResult = fuzzySearch.search(event.target.value);
    if (event.target.value.length === 0) {
      setSearchList(userList);
    } else {
      setSearchList(searchResult);
    }
  }

  const selectItem = (event, item) => {
    setAsignee({
      id: item.id,
      fullName: `${item.firstName} ${item.lastName}`,
      avatarThumbUrl: item.avatarThumbUrl
    });
  }

  const usersRows = (searchList) => {
    return(
      searchList.map((item) => {
        item = item.item ? item.item : item
        return(
          <>
            <ListItem
              key={item.id}
              button
              dense={true}
              selected={asignee.id === item.id}
              onClick={(event) => selectItem(event, item)}
              >
              <ListItemAvatar>
                <Avatar alt={item.firstName} src={item.avatarThumbUrl}/>
              </ListItemAvatar>
              <ListItemText id={item.id} primary={`${item.firstName} ${item.lastName}`}/>
            </ListItem>
            <Divider/>
          </>
        );
      })
    );
  };

  return (
    <>
      <TextField
        id="outlined-basic"
        label="Buscar Tramite"
        onChange={searchUser}
        variant="outlined"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          )
        }}
      />
      <Card variant="outlined" style={{ overflowY: "scroll" }}>
        <CardContent>
          <List>
            {searchList && usersRows(searchList)}
          </List>
        </CardContent>
      </Card>
    </>
  );
};

export default UserAsigneeList;
