import React, { useEffect }                           from 'react';
import { styles }                                     from '../styles';
import { withStyles }                                 from '@material-ui/core/styles';
import Fuse                                           from 'fuse.js';
import Divider                                        from '@material-ui/core/Divider';
import { TextField }                                  from '@material-ui/core';
import List                                           from '@material-ui/core/List';
import ListItem                                       from '@material-ui/core/ListItem';
import ListItemIcon                                   from '@material-ui/core/ListItemIcon';
import ListItemText                                   from '@material-ui/core/ListItemText';
import Checkbox                                       from '@material-ui/core/Checkbox';
import { useQuery }                                   from '@apollo/react-hooks';
import { GET_PROCEDURES_TEMPLATES_QUICK_LIST  }       from '../queries_and_mutations/queries';
import Grid                                           from '@material-ui/core/Grid';


const renderSearchList = (searchList, checked, classes, handleToggle, setProcedureInfo) => {
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
                  <ListItemText 
                    id={obj.id} 
                    primary={` ${ obj.name }`}
                    checked={checkedIds.indexOf(obj.id) !== -1}
                    tabIndex={-1}
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


const ProceduresSearch = (props) => {

  const { classes, setProcedureInfo } = props;
  const [checked, setChecked] = React.useState([]);
  const [searchList, setSearchList] = React.useState([])
  const [initialList, setInitialList] = React.useState([])
  const [fuzzySearcher, setFuzzySearcher] = React.useState(new Fuse(initialList, { keys: ['name'] }))
  const [initialized, setInitialized] = React.useState()
  const [selectedIndex, setSelectedIndex] = React.useState();

  const { loading, data, refetch } = useQuery(
    GET_PROCEDURES_TEMPLATES_QUICK_LIST ,
  );

  function changeSearch(event) {
    let result = fuzzySearcher.search(event.target.value)
    
    if (event.target.value.length === 0){
      setSearchList(initialList)
    } else {
      setSearchList(result)
    }
  }

  const handleToggle = (obj) => () => {
    setProcedureInfo(obj)
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
    // setToLinkSelectedOption(checked)
    if (!initialized && data && data.proceduresTemplatesQuickList) {
      setInitialList(data.proceduresTemplatesQuickList)
      setFuzzySearcher(new Fuse(data.proceduresTemplatesQuickList, { keys: ['name'] }))
      setSearchList(data.proceduresTemplatesQuickList)
      setInitialized(true) 
    }
  }, [data, checked])

  return (
    <Grid container item direction="column" alignItems="center" justify="center">
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
    </Grid>
  );
}

export default withStyles(styles)(ProceduresSearch);
