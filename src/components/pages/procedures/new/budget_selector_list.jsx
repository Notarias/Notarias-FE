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
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Fuse from 'fuse.js';
import { useQuery } from '@apollo/client';
import { BUDGETING_TEMPLATE_BY_PROCEDURE_ID } from '../queries_and_mutations/queries';

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

const BudgetsRows = (props) => {

  const { searchList, selectedProcedure, selectedBudget, setData, selectItem } = props

  const { data } = useQuery(
    BUDGETING_TEMPLATE_BY_PROCEDURE_ID, {
      variables: { "proceduresTemplateId": selectedProcedure.id },
      fetchPolicy: 'no-cache'
    }
  );

  useEffect(() => {
    setData(data)
  }, [data])

  return(
    searchList.map((item) => {
      item = item.item ? item.item : item
      return(
        <React.Fragment key={`procedures-budgetSelectorList-${item.id}`}>
          <ListItem
            button
            dense={true}
            selected={selectedBudget.id === item.id}
            onClick={(event) => selectItem(event, item.id, item.name)}
            >
            <ListItemText 
              id={item.id} 
              primary={item.name}
            />
          </ListItem>
          <Divider/>
        </React.Fragment>
      );
    })
  );
};

const BudgetSelectorList = (props) => {

  const { selectedProcedure, selectedBudget, setSelectedBudget } = props;

  const [budgetList, setBudgetList] = useState();
  const [searchList, setSearchList] = useState();
  const [data, setData] = useState();

  const classes = useStyles();
  
  let fuzzySearch = new Fuse(budgetList, { keys: ['name'] });

  useEffect( () => {
    if(data && data.budgetingTemplatesByProcedureId){
      setBudgetList(data.budgetingTemplatesByProcedureId);
      setSearchList(data.budgetingTemplatesByProcedureId);
    }
  }, [data]);

  const searchBudget = (event) => {
    let searchResult = fuzzySearch.search(event.target.value);
    if (event.target.value.length === 0) {
      setSearchList(budgetList);
    } else {
      setSearchList(searchResult);
    }
  }

  const selectItem = (event, index, data) => {
    setSelectedBudget({id: index, name: data});
  }

  

  return (
    <>
      <Typography className={classes.title} color="textSecondary" gutterBottom>
        Selecciona un Presupuesto
      </Typography>
      <TextField
        id="outlined-basic"
        label="Buscar Presupuesto"
        onChange={searchBudget}
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
            {
              searchList &&
              selectedProcedure &&
                <BudgetsRows
                  searchList={searchList}
                  selectedProcedure={selectedProcedure}
                  selectedBudget={selectedBudget}
                  setData={setData}
                  selectItem={selectItem} />
            }
          </List>
        </CardContent>
      </Card>
    </>
  );
};

export default BudgetSelectorList;
