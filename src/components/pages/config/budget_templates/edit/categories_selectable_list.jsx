import React, { useEffect }                 from 'react';
import { withStyles }                       from '@material-ui/core/styles';
import { styles }                           from '../styles';
import List                                 from '@material-ui/core/List';
import ListItem                             from '@material-ui/core/ListItem';
import ListItemIcon                         from '@material-ui/core/ListItemIcon';
import ListItemText                         from '@material-ui/core/ListItemText';
import Checkbox                             from '@material-ui/core/Checkbox';
import { Divider, TextField }               from '@material-ui/core';
import { GET_BUDGETING_CATEGORIES }         from '../queries_and_mutations/queries'
import { useQuery }                         from '@apollo/react-hooks';
import Fuse                                 from 'fuse.js';


const renderSearchList = (searchList, checked, classes, handleToggle) => {
  const checkedIds = checked.map((item) =>  item.id )
  return(
    <List 
      component="nav" 
      aria-label="contacts" 
      disablePadding={true}
    >
      { 
        searchList.map(
          (item) => {
            let obj = item.item || item
            return(
              <React.Fragment key={obj.id + "fragment"}>
                <ListItem key={obj.id} role={undefined} dense button onClick={handleToggle(obj)}>
                  <ListItemIcon>
                      <Checkbox
                        edge="start"
                        checked={checkedIds.indexOf(obj.id) !== -1}
                        tabIndex={-1}
                        disableRipple
                        inputProps={{ 'aria-labelledby': obj.id }}
                      />
                    </ListItemIcon>
                    <ListItemText id={obj.id} primary={` ${ obj.name }`} />
                  </ListItem>
                  <Divider/>
              </React.Fragment>
            )
          }
        )
      }
    </List>
  )
}

const CategoriesSelectableList = (props) => {
  const { setCategoriesToSave, categoriesToSave, classes } = props;
  const [categories, setCategories] = React.useState(data ? data.budgetingCategories : []);
  const [checked, setChecked] = React.useState(categoriesToSave);
  const [searchList, setSearchList] = React.useState([])
  const [initialList, setInitialList] = React.useState([])
  const [fuzzySearcher, setFuzzySearcher] = React.useState(new Fuse(initialList, { keys: ['name'] }))
  const [initialized, setInitialized] = React.useState()

  function changeSearch(event) {
    let result = fuzzySearcher.search(event.target.value)
    if (event.target.value.length === 0){
      setSearchList(initialList)
    } else {
      setSearchList(result)
    }
  }

  const handleToggle = (obj) => () => {
    const checkedIds = checked.map((item) => item.id)
    const currentIndex = checkedIds.indexOf(obj.id);
    const newChecked = [...checked];
    if (currentIndex === -1) {
      newChecked.push(obj);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };

  const { loading, data } = useQuery(
    GET_BUDGETING_CATEGORIES,
    {}
  );

  useEffect(() => {
    setCategories(data && data.budgetingCategories)
    setCategoriesToSave(checked)
    if (!initialized && data && data.budgetingCategories) {
      setInitialList(data.budgetingCategories)
      setFuzzySearcher(new Fuse(data.budgetingCategories, { keys: ['name'] }))
      setSearchList(data.budgetingCategories)
      setInitialized(true) 
    }
  }, [data, checked])

  return (
    <>
    <div>
      <TextField 
          onChange={ changeSearch }
          id="outlined-basic"
          label="Buscar"
          variant="outlined"
          className={ classes.textFieldSearchInTable }
        />
    </div>
      <div className={ classes.selectableListItem }> 
        {
          renderSearchList(searchList, checked, classes, handleToggle)
        }
      </div>
    </>
  );
}

export default withStyles(styles) (CategoriesSelectableList);
