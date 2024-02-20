import React, { useEffect, useState }         from 'react'
import { styles }                             from '../../styles';
import Fuse                                   from 'fuse.js';
import { withStyles }                         from '@material-ui/core/styles';
import TextField                              from '@material-ui/core/TextField';
import Grid                                   from '@material-ui/core/Grid';
import List                                   from '@material-ui/core/List';
import Card                                   from '@material-ui/core/Card';
import ListItem                               from '@material-ui/core/ListItem';
import ListItemText                           from '@material-ui/core/ListItemText';
import ListItemIcon                           from '@material-ui/core/ListItemIcon';
import Checkbox                               from '@material-ui/core/Checkbox';
import Button                                 from '@material-ui/core/Button';
import Divider                                from '@material-ui/core/Divider';
import ArrowBackIosIcon                       from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon                    from '@material-ui/icons/ArrowForwardIos';

function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

const TaxFieldsSelector = (props) => {
  const {
    classes,
    templateData,
    setTaxedFieldsIds,
    setPristine,
  } = props

  const [searchList, setSearchList]        = useState(templateData);
  const [fuzzySearcher, setFuzzySearcher]  = useState(new Fuse(templateData, { keys: ['name'] }));
  
  const [checked, setChecked]              = useState([]);
  const [left, setLeft]                    = useState(templateData);
  const [right, setRight]                  = useState([]);


  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  useEffect(() => {
    if(right.length > 0){
      setPristine(false)
    } else {
      setPristine(true)
    }
  }, [right])

  useEffect(() => {
    setFuzzySearcher(new Fuse(left, { keys: ['name'] }))
  }, [left])

  useEffect(() => {
    setTaxedFieldsIds(
      right.map((field) => {
        return(
          field.id
        )
      })
    )
  }, [right])

  function changeSearch(event) {
    let result = fuzzySearcher.search(event.target.value)
    if (event.target.value.length === 0){
      setSearchList(left)
    } else {
      setSearchList(result)
    }
  }

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
    
    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };

  const handleCheckedRight = () => {
    const leftValues = not(left, leftChecked)
    setRight(right.concat(leftChecked));
    setLeft(leftValues);
    setChecked(not(checked, leftChecked));
    setSearchList(leftValues)
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setSearchList(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const customList = (title, items) => (
    <Card>
      <Divider />
      <List dense component="div" role="list" className={classes.listComponent}>
        {items.map((item) => {
          let value = item.item || item
          return (
            <ListItem key={value.id} button onClick={handleToggle(value)}>
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

        <Grid container item xs={12} direction="row" alignItems="center"  justifyContent="center" className={classes.changeButtonGrid}>
          <Grid container item xs={6} alignItems="center" justifyContent="center">
            <Button
              variant="outlined"
              size="small"
              onClick={handleCheckedRight}
              disabled={leftChecked.length === 0}
              aria-label="move selected right"
            >
              <ArrowForwardIosIcon/>
            </Button>
          </Grid>
          <Grid container item xs={6} alignItems="center" justifyContent="center">
            <Button
              variant="outlined"
              size="small"
              onClick={handleCheckedLeft}
              disabled={rightChecked.length === 0}
              aria-label="move selected left"
            >
              <ArrowBackIosIcon/>
            </Button>
          </Grid>
        </Grid>
        <Divider/>
        <Grid 
          container 
          item 
          xs={6}  
          alignItems="center" 
          justifyContent="center"
          className={classes.gridSearchField}
          >
          {customList('Choices', searchList)}
        </Grid>
        <Grid
          container
          item
          xs={6}
          alignItems="flex-start"
          justifyContent="center"
          className={classes.gridSearchField}
          >
          {customList('Chosen', right)}
        </Grid>
      </Grid>
    </>
  )
}

export default withStyles(styles)(TaxFieldsSelector);
