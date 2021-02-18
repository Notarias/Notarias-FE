import React, { useEffect }                 from 'react';
import { makeStyles }                       from '@material-ui/core/styles';
import Grid                                 from '@material-ui/core/Grid';
import List                                 from '@material-ui/core/List';
import ListItem                             from '@material-ui/core/ListItem';
import ListItemIcon                         from '@material-ui/core/ListItemIcon';
import ListItemText                         from '@material-ui/core/ListItemText';
import Checkbox                             from '@material-ui/core/Checkbox';
import Button                               from '@material-ui/core/Button';
import Paper                                from '@material-ui/core/Paper';

import { GET_BUDGETING_CATEGORIES }         from '../queries_and_mutations/queries'
import { useQuery }                         from '@apollo/react-hooks';


const useStyles = makeStyles((theme) => ({
  root: {
    margin: 'auto',
  },
  paper: {
    width: 200,
    height: 230,
    overflow: 'auto',
  },
  button: {
    margin: theme.spacing(0.5, 0),
  },
}));

function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

const AddCategoryToField = (props) => {
  const classes = useStyles();
  const [checked, setChecked] = React.useState([]);
  const [left, setLeft] = React.useState([0, 1, 2, 3, 4, 5, 6, 7]);
  const [right, setRight] = React.useState([]);

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  useEffect(() => {
    setCategories(data.budgetingCategories)
  }, [data])


  const[ categories, setCategories] = React.useState(data ? data.budgetingCategories : [])

  const { loading, data } = useQuery(
    GET_BUDGETING_CATEGORIES,
    {}
  );

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

  const handleAllRight = () => {
    setRight(right.concat(left));
    setLeft([]);
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

  const handleAllLeft = () => {
    setLeft(left.concat(right));
    setRight([]);
  };

  const customList = (categories) => (
    <Paper className={classes.paper}>
      <List dense component="div" role="list">
        {categories.map((category) => {
          const value = category.id
          const labelId = `transfer-list-item-${value}-label`;

          console.log("value", value, category)
          return (
            <ListItem key={category.id + "-category"} role="listitem" button onClick={handleToggle(category)}>
              <ListItemIcon>
                <Checkbox
                  checked={checked.indexOf(category) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemIcon>
              <ListItemText id={category.id} primary={` ${category.name}`} />
            </ListItem>
          );
        })}
        <ListItem />
      </List>
    </Paper>
  );

  return (
    <Grid container spacing={2} justify="center" alignItems="center" className={classes.root}>
      <Grid item>{customList(left)}</Grid>
      <Grid item>
        <Grid container direction="column" alignItems="center">
          <Button
            variant="outlined"
            size="small"
            className={classes.button}
            onClick={handleAllRight}
            disabled={left.length === 0}
            aria-label="move all right"
          >
            ≫
          </Button>
          <Button
            variant="outlined"
            size="small"
            className={classes.button}
            onClick={handleCheckedRight}
            disabled={leftChecked.length === 0}
            aria-label="move selected right"
          >
            &gt;
          </Button>
          <Button
            variant="outlined"
            size="small"
            className={classes.button}
            onClick={handleCheckedLeft}
            disabled={rightChecked.length === 0}
            aria-label="move selected left"
          >
            &lt;
          </Button>
          <Button
            variant="outlined"
            size="small"
            className={classes.button}
            onClick={handleAllLeft}
            disabled={right.length === 0}
            aria-label="move all left"
          >
            ≪
          </Button>
        </Grid>
      </Grid>
      <Grid item>{customList(right)}</Grid>
    </Grid>
  );
}

export default  (AddCategoryToField);