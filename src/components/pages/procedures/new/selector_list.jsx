import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import Fuse from 'fuse.js';

import { useQuery } from '@apollo/client';
import { GET_PROCEDURES_TEMPLATES_QUICK_LIST  } from '../queries_and_mutations/queries';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(1),
    minWidth: 275,
    minHeight: 350,
    maxHeight: 350,
  },
  bullet: {
    display: 'inline-block',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  }
}));

const SelectorList = (props) => {

  const { selectedProcedure, setSelectedProcedure } = props;

  const [procedureList, setProcedureList] = useState();
  const [searchList, setSearchList] = useState();

  const classes = useStyles();
  
  const { loading, data, refetch } = useQuery(
    GET_PROCEDURES_TEMPLATES_QUICK_LIST,
    { fetchPolicy: 'no-cache', }
  );

  let fuzzySearch = new Fuse(procedureList, { keys: ['name'] })

  useEffect( () => {
    if(data && data.proceduresTemplatesQuickList){
      setProcedureList(data.proceduresTemplatesQuickList);
      setSearchList(data.proceduresTemplatesQuickList);
    }
  }, [data]);

  const searchProcedure = (event) => {
    let searchResult = fuzzySearch.search(event.target.value);
    if (event.target.value.length === 0) {
      setSearchList(procedureList);
    } else {
      setSearchList(searchResult);
    }
  }

  const proceduresRows = (searchList) => {
    return(
      searchList.map((item) => {
        item = item.item ? item.item : item
        return(
          <>
            <ListItem key={item.id} button>
              {item.name}
            </ListItem>
            <Divider/>
          </>
        );
      })
    );
  };

  return (
    <>
      <Typography className={classes.title} color="textSecondary" gutterBottom>
        Selecciona un trámite
      </Typography>
      <TextField
        id="outlined-basic"
        label="Buscar Tramite"
        onChange={searchProcedure}
        variant="outlined"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          )
        }}
      />
      <Card className={classes.root} variant="outlined" style={{ overflowY: "scroll" }}>
        <CardContent>
          <List>
            {searchList && proceduresRows(searchList)}
          </List>
        </CardContent>
      </Card>
    </>
  );
};

export default SelectorList;
