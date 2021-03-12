import React, { useEffect }                              from 'react';
import { styles }                                     from '../styles';
import { withStyles }                                 from '@material-ui/core/styles';
import Fuse                                           from 'fuse.js';
import Divider                                        from '@material-ui/core/Divider';
import { TextField }                                  from '@material-ui/core';
import List                                 from '@material-ui/core/List';
import ListItem                             from '@material-ui/core/ListItem';
import ListItemIcon                         from '@material-ui/core/ListItemIcon';
import ListItemText                         from '@material-ui/core/ListItemText';
import Checkbox                             from '@material-ui/core/Checkbox';


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
                    <ListItemText 
                    id={obj.id} 
                    primary={` ${ obj.name }`} 
                    />
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


const ListToLinkOfProcedures = (props) => {

  const {classes, data} = props;
  const setToLinkSelectedOption = props.setToLinkSelectedOption;
  const toLinkSelectedOption = props.toLinkSelectedOption;
  const [checked, setChecked] = React.useState(toLinkSelectedOption);
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

  useEffect(() => {
    setToLinkSelectedOption(checked)
    if (!initialized && data && data.proceduresTemplatesQuickList) {
      setInitialList(data.proceduresTemplatesQuickList)
      setFuzzySearcher(new Fuse(data.proceduresTemplatesQuickList, { keys: ['name'] }))
      setSearchList(data.proceduresTemplatesQuickList)
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

export default withStyles(styles)(ListToLinkOfProcedures);
