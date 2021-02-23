import React, { useEffect }               from 'react';
import { makeStyles }                     from '@material-ui/core/styles';
import List                               from '@material-ui/core/List';
import ListItem                           from '@material-ui/core/ListItem';
import ListItemIcon                       from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction            from '@material-ui/core/ListItemSecondaryAction';
import ListItemText                       from '@material-ui/core/ListItemText';
import Checkbox                           from '@material-ui/core/Checkbox';
import IconButton                         from '@material-ui/core/IconButton';
import CommentIcon                        from '@material-ui/icons/Comment';

import { GET_BUDGETING_CATEGORIES }         from '../queries_and_mutations/queries'
import { useQuery }                         from '@apollo/react-hooks';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

const CategoriesSelectableList = (props) => {
  // const { classes} = props
  const classes = useStyles();
  const [checked, setChecked] = React.useState([0]);
  const [categories, setCategories] = React.useState(data ? data.budgetingCategories : []);


  const handleToggle = (category) => () => {
    const currentIndex = checked.indexOf(category);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(category);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  useEffect(() => {
    setCategories(data.budgetingCategories)
  }, [data])

  const { loading, data } = useQuery(
    GET_BUDGETING_CATEGORIES,
    {}
  );

  console.log("cat", checked)
  return (
    <List className={classes.root}>
      {
        categories.map((category) => {
          // const category = categories.find((category) => category.id === value)
          const labelId = `checkbox-list-label-${category.id}`;

          return (
            <ListItem key={labelId} role={undefined} dense button onClick={handleToggle(category)}>
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={checked.indexOf(category) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={` ${ category.name }`} />
            </ListItem>
          );
        })
      }
    </List>
  );
}

export default  CategoriesSelectableList;
