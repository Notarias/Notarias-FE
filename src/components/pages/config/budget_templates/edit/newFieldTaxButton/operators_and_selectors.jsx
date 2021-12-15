import React, { useEffect, useState } from 'react'
import { styles }           from '../../styles';
import { withStyles }       from '@material-ui/core/styles';
import TextField            from '@material-ui/core/TextField';
import Fuse                 from 'fuse.js';
import Grid                 from '@material-ui/core/Grid';
import List                 from '@material-ui/core/List';
import Card                 from '@material-ui/core/Card';
import ListItem             from '@material-ui/core/ListItem';
import ListItemText         from '@material-ui/core/ListItemText';
import ListItemIcon         from '@material-ui/core/ListItemIcon';
import Checkbox             from '@material-ui/core/Checkbox';
import Button               from '@material-ui/core/Button';
import Divider              from '@material-ui/core/Divider';
import MenuItem             from '@material-ui/core/MenuItem';
import InputAdornment       from '@material-ui/core/InputAdornment';
import Select               from '@material-ui/core/Select';
import OutlinedInput        from '@material-ui/core/OutlinedInput';
import InputLabel           from '@material-ui/core/InputLabel';
import FormControl          from '@material-ui/core/FormControl';
import ArrowBackIosIcon     from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon  from '@material-ui/icons/ArrowForwardIos';

function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

function union(a, b) {
  return [...a, ...not(b, a)];
}

const FieldSearch = (props) => {
  const {
    classes,
    templateData,
    setTaxedFieldsIds,
    setDefaultValue,
    defaultValue,
    setOperator,
    setTaxableSelector,
    setPristine,
    operator,
    taxableSelector
  } = props

  const [searchList, setSearchList]       = useState(templateData)
  const [initialList, setInitialList]     = useState(templateData)
  const [fuzzySearcher, setFuzzySearcher] = useState(new Fuse(initialList, { keys: ['name'] }))

  const [checked, setChecked]             = useState([]);
  const [left, setLeft]                   = useState( templateData );
  const [right, setRight]                 = useState([]);
  const [anchorEl, setAnchorEl]           = useState(null);

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

  const handleOperatorChange = (event) => {
    setOperator(event.target.value);
  };

  const handleTaxableSelectorChange = (event) => {
    setTaxableSelector(event.target.value);
  }

  const handlePercentageChange = (event) => {
    setDefaultValue(Number(event.target.value))
  }

  const numberOfChecked = (items) => intersection(checked, items).length;


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
            <ListItem key={value.id} role="undefined" button onClick={handleToggle(value)}>
              <ListItemIcon>
                <Checkbox
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': value.id }}
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
      <Grid container >
        <Grid style={{ 'marginBottom': '12px' }} container item xs={12} alignItems="center" justifyContent="flex-start">
          <Grid container item xs={2} alignItems="flex-start" justifyContent="center">
            <FormControl variant="outlined">
              <OutlinedInput
                id="percentage"
                value={Number(defaultValue)}
                onChange={handlePercentageChange}
                endAdornment={<InputAdornment className={classes.InputAdornmentInPercentage} position="end">%</InputAdornment>}
                size="small"
                type="number"
                className={classes.InputPercentage}
              />
            </FormControl>
          </Grid>
          <Grid container item xs={5} alignItems="center" justifyContent="flex-end">
            <FormControl variant="outlined" className={classes.operatorMenu}>
              <Select
                style={{ height: "40px"}}
                id="demo-simple-select-outlined"
                value={operator}
                onChange={handleOperatorChange}
                displayEmpty
                size="small"
              >
                <MenuItem value="">
                  <em>Operador</em>
                </MenuItem>
                <MenuItem value="percentile">Porcentual</MenuItem>
                <MenuItem value="flat">Plano</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid container item xs={5} alignItems="center" justifyContent="flex-end">
              <FormControl variant="outlined" className={classes.operatorMenu}>
                <Select
                  style={{ height: "40px"}}
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={taxableSelector}
                  onChange={handleTaxableSelectorChange}
                  displayEmpty
                  size="small"
                >
                   <MenuItem value="">
                    <em>Selector</em>
                  </MenuItem>
                  <MenuItem value={"highest"}>Más Alto</MenuItem>
                  <MenuItem value={"apply_all"}>Todos</MenuItem>
                </Select>
              </FormControl>
            </Grid>
        </Grid>
        
        <Grid container item xs={5} alignItems="center" justifyContent="flex-start">
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
        <Grid container direction="row" item xs={12}>
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
      </Grid>
    </>
  )
}

export default withStyles(styles)(FieldSearch);
