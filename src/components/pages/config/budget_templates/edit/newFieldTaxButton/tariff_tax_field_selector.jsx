import React, { useEffect, useState }         from 'react'
import { styles }                             from '../../styles';
import { withStyles }                         from '@material-ui/core/styles';
import Fuse                                   from 'fuse.js';
import TextField                              from '@material-ui/core/TextField';
import Grid                                   from '@material-ui/core/Grid';
import List                                   from '@material-ui/core/List';
import Card                                   from '@material-ui/core/Card';
import ListItem                               from '@material-ui/core/ListItem';
import ListItemText                           from '@material-ui/core/ListItemText';
import ListItemIcon                           from '@material-ui/core/ListItemIcon';
import Checkbox                               from '@material-ui/core/Checkbox';
import Divider                                from '@material-ui/core/Divider';

const TariffTaxFieldSelector = (props) => {
  const {
    classes,
    templateData,
    setTaxedFieldsIds,
    setPristine,
  } = props

  const [fieldsList]        = useState(templateData);
  const [searchList, setSearchList]        = useState(templateData);
  const [fuzzySearcher, setFuzzySearcher]  = useState(new Fuse(templateData, { keys: ['name'] }));
  const [checked, setChecked]              = useState([]);

  useEffect(() => {
    setFuzzySearcher(new Fuse(fieldsList, { keys: ['name'] }))
  }, [fieldsList])

  useEffect(() => {
    setTaxedFieldsIds(
      checked.map((check) => {
        return(
          check.id
        )
      })
    )
  }, [checked])

  useEffect(() => {
    if(checked.length > 0){
      setPristine(false)
    } else {
      setPristine(true)
    }
  }, [checked])

  function changeSearch(event) {
    let result = fuzzySearcher.search(event.target.value)
    if (event.target.value.length === 0){
      setSearchList(fieldsList)
    } else {
      setSearchList(result)
    }
  }

  const selectField = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [];
  
    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };

  const taxesTariffList = (title, items) => (
    <Card style={{width:'90%'}}>
      <Grid container item xs justifyContent='center'>
        <Divider/>
        <List dense component="div" role="list" className={classes.listComponent}>
          {items.map((item) => {
            let value = item.item || item
            return (
              <ListItem key={value.id} button onClick={selectField(value)}>
                <ListItemIcon>
                  <Checkbox
                    checked={checked.indexOf(value) !== -1}
                    tabIndex={-1}
                    disableRipple
                  />
                </ListItemIcon>
                <ListItemText id={value.id} primary={value.name} />
              </ListItem>
            );
          })}
          <ListItem />
        </List>
      </Grid>
    </Card>
  );

  return(
    <>
      <Grid container direction="row" item xs={12} alignItems="center" justifyContent="center">
        <Grid container item xs={5}>
          <TextField
            onChange={ changeSearch }
            size="small"
            id="search_field"
            label="Buscar campo"
            variant="outlined"
            className={classes.textFieldSearch}
          />
        </Grid>

        <Divider/>
        <Grid container item xs={12} direction="row" alignItems="center"  justifyContent="center" className={classes.gridSearchField}>
          {taxesTariffList('Choices', searchList)}
        </Grid>
      </Grid>
    </>
  )
}

export default withStyles(styles)(TariffTaxFieldSelector);
