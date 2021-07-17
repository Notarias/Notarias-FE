import React, { useEffect } from 'react'
import { styles }      from '../../styles';
import { withStyles }  from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Fuse                                           from 'fuse.js';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Menu            from '@material-ui/core/Menu';
import MenuItem        from '@material-ui/core/MenuItem';
import InputAdornment                       from '@material-ui/core/InputAdornment';
import Select from '@material-ui/core/Select';

import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';

import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';




function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

function union(a, b) {
  return [...a, ...not(b, a)];
}


// const renderSearchList = (searchList, checked, classes, handleToggle) => {
//   const checkedIds = checked.map((item) =>  item.id )
//     return(
//       <List 
//         component="nav" 
//         aria-label="contacts" 
//         disablePadding={true}
//       >
//       { 
//         searchList.map(
//         (item) => {
//             let obj = item.item || item
//             return(
//             <React.Fragment key={obj.id + "fragment"}>
//                 <ListItem key={obj.id} role={undefined} dense button onClick={handleToggle(obj)}>
//                 <ListItemIcon>
//                     <Checkbox
//                         edge="start"
//                         checked={checkedIds.indexOf(obj.id) !== -1}
//                         tabIndex={-1}
//                         disableRipple
//                         inputProps={{ 'aria-labelledby': obj.id }}
//                     />
//                     </ListItemIcon>
//                     <ListItemText 
//                     id={obj.id} 
//                     primary={` ${ obj.name }`} 
//                     />
//                 </ListItem>
//                 <Divider/>
//             </React.Fragment>
//             )
//         }
//         )
//       }
//       </List>
//     )
//   }

const FieldSearch = (props) => {
  const { classes, templateData } = props

  const [searchList, setSearchList] = React.useState(templateData)
  const [initialList, setInitialList] = React.useState(templateData)
  const [fuzzySearcher, setFuzzySearcher] = React.useState(new Fuse(initialList, { keys: ['name'] }))
  const [initialized, setInitialized] = React.useState()

  const [checked, setChecked] = React.useState([]);
  const [left, setLeft] = React.useState( searchList );
  const [right, setRight] = React.useState([]);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [operator, setOperator] = React.useState('');
  const [percentage, setPercentage] = React.useState('3');

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  // useEffect(() => {
  //   // setToLinkSelectedOption(checked)
  //   if (!initialized && templateData) {
  //     setInitialList(templateData)
  //     setFuzzySearcher(new Fuse(templateData, { keys: ['name'] }))
  //     // setSearchList(templateData)
  //     setInitialized(true)
  //   }
  // }, [checked])

  useEffect(() => {
    setLeft(searchList)
    setFuzzySearcher(new Fuse(templateData, { keys: ['name'] }))
  }, [searchList])

  function changeSearch(event) {
    let result = fuzzySearcher.search(event.target.value)
    console.log(result,"res")
    
    if (event.target.value.length === 0){
      setSearchList(initialList)
    } else {
      setSearchList(result)
    }
  }

  // const handleToggle = (obj) => () => {
  //   const checkedIds = checked.map((item) => item.id)
  //   const currentIndex = checkedIds.indexOf(obj.id);
  //   const newChecked = [...checked];
  //   if (currentIndex === -1) {
  //     newChecked.push(obj);
  //   } else {
  //     newChecked.splice(currentIndex, 1);
  //   }
  //   setChecked(newChecked);
  // };

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

  const handlePercentageChange = (event) => {
    setPercentage(event.target.value)
  }
  // const handleOpenOperatorMenu = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };

  // const handleOperatorMenuClose = () => {
  //   setAnchorEl(null);
  // };

  const numberOfChecked = (items) => intersection(checked, items).length;

  const handleToggleAll = (items) => () => {
    if (numberOfChecked(items) === items.length) {
      setChecked(not(checked, items));
    } else {
      setChecked(union(checked, items));
    }
  };

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const customList = (title, items) => (
    <Card>
      {/* <CardHeader
        avatar={
          <Checkbox
            onClick={handleToggleAll(items)}
            checked={numberOfChecked(items) === items.length && items.length !== 0}
            indeterminate={numberOfChecked(items) !== items.length && numberOfChecked(items) !== 0}
            disabled={items.length === 0}
            inputProps={{ 'aria-label': 'all items selected' }}
          />
        }
        title={title}
        subheader={`${numberOfChecked(items)}/${items.length} selected`}
      /> */}
      <Divider />
      <List dense component="div" role="list">
        {items.map((item) => {
          let value = item.item || item
          const labelId = `transfer-list-all-item-${value}-label`;
          return (
            <ListItem key={value.id} role="undefined" button onClick={handleToggle(value)}>
              <ListItemIcon>
                    {/* <Checkbox
                        edge="start"
                        checked={checkedIds.indexOf(obj.id) !== -1}
                        tabIndex={-1}
                        disableRipple
                        inputProps={{ 'aria-labelledby': obj.id }}
                    /> */}
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


  // console.log(searchList, "dat")
  return(
    <>
      <Grid container >
        <Grid container item xs={6} alignItems="center" justifyContent="center" >
          <TextField
            onChange={ changeSearch }
            size="small"
            id="search_field"
            label="Buscar campo"
            variant="outlined"
            className={classes.textFieldSearch}
          />
        </Grid>
        <Grid container item xs={6} >
          <Grid container item xs={6} alignItems="center" justifyContent="center">
            <FormControl variant="outlined">
              <OutlinedInput
                id="percentage"
                value={Number(percentage)}
                onChange={handlePercentageChange}
                endAdornment={<InputAdornment className={classes.InputAdornmentInPercentage} position="end">%</InputAdornment>}
                size="small"
                type="number"
                className={classes.InputPercentage}
              />
            </FormControl>
          </Grid>
          <Grid container item xs={6} alignItems="center" justifyContent="flex-start">
            <FormControl className={classes.operatorMenu}>
              <InputLabel id="demo-simple-select-label">Operador</InputLabel>
              <Select
                labelId="operator-menu-select-label"
                id="operator-menu"
                value={operator}
                onChange={handleOperatorChange}
              >
                <MenuItem value={"uno"}>uno</MenuItem>
                <MenuItem value={"dos"}>dos</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Grid container item xs={12} direction="row" alignItems="center"  justifyContent="center" >
          <Button
            variant="outlined"
            size="small"
            onClick={handleCheckedRight}
            disabled={leftChecked.length === 0}
            aria-label="move selected right"
          >
            &gt;
          </Button>
          <Button
            variant="outlined"
            size="small"
            onClick={handleCheckedLeft}
            disabled={rightChecked.length === 0}
            aria-label="move selected left"
          >
            &lt;
          </Button>
        </Grid>
        <Divider/>
        <Grid container direction="row" item xs={12} className={classes.gridSearchField}>
              {/* {
                renderSearchList(searchList, checked, classes, handleToggle)
              } */}

          <Grid container item xs={6}  alignItems="center" justifyContent="center" >{customList('Choices', left)}</Grid>
          <Grid container item xs={6}  alignItems="flex-start" justifyContent="center" >{customList('Chosen', right)}</Grid>
        </Grid>
      </Grid>
    </>
  )
}

export default withStyles(styles)(FieldSearch);