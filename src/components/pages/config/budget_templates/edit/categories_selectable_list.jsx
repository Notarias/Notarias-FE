import React, { useEffect }                 from 'react';
import { makeStyles }                       from '@material-ui/core/styles';
import List                                 from '@material-ui/core/List';
import ListItem                             from '@material-ui/core/ListItem';
import ListItemIcon                         from '@material-ui/core/ListItemIcon';
import ListItemText                         from '@material-ui/core/ListItemText';
import Checkbox                             from '@material-ui/core/Checkbox';
import { Divider, TextField }               from '@material-ui/core';
import { GET_BUDGETING_CATEGORIES }         from '../queries_and_mutations/queries'
import { useQuery }                         from '@apollo/react-hooks';
import Fuse                                           from 'fuse.js';
import IconButton                         from '@material-ui/core/IconButton';
import CommentIcon                        from '@material-ui/icons/Comment';
import ListItemSecondaryAction            from '@material-ui/core/ListItemSecondaryAction';



const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

const CategoriesSelectableList = (props) => {
  const { setCategoriesToSave } = props
  const classes = useStyles();
  const [checked, setChecked] = React.useState([]);
  const [categories, setCategories] = React.useState(data ? data.budgetingCategories : []);
  const [searchList, setSearchList] = React.useState([])
  const [initialList, setInitialList] = React.useState([])
  const [fuzzySearcher, setFuzzySearcher] = React.useState(new Fuse(initialList, { keys: ['name'] }))

  function changeSearch(event) {
    let result = fuzzySearcher.search(event.target.value)
    
    if (event.target.value.length === 0){
      setSearchList(initialList)
    } else {
      setSearchList(result)
    }
  }

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
    setCategories(data && data.budgetingCategories)
    setCategoriesToSave(checked)
    if (data &&  data.budgetingCategories) {
      setInitialList( data.budgetingCategories)
      setFuzzySearcher(new Fuse(data.budgetingCategories, { keys: ['name'] }))
      setSearchList(data.budgetingCategories)
    }
  }, [data, checked])

  const { loading, data } = useQuery(
    GET_BUDGETING_CATEGORIES,
    {}
  );

  console.log("cat", checked)
  return (
    <>
      <TextField 
        // onChange={ changeSearch }
        id="outlined-basic"
        label="Buscar"
        variant="outlined"
        className={ classes.textFieldSearchInTable }
      />
      {
        searchList.map((item) => {
          let obj = item.item || item
          return(
            <List 
              component="nav" 
              aria-label="contacts" 
              key={ obj.id + "-list"}
              disablePadding={true}
              className={ classes.selectableListItem }
            >
              {/* <TemplateSelectOption 
                key={ obj.id + "template-option" }
                template={ obj }
                selectItem={ props.setProcedureSelectedOption }
                selectedItem={ props.procedureSelectedOption }
              /> */}
              <Divider/>
            </List>
          )
        })
      }
      {/* <List className={classes.root}>
        {
          categories.map((category) => {
            // const category = categories.find((category) => category.id === value)
            const labelId = `checkbox-list-label-${category.id}`;

            return (
              <>
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
                <Divider/>
              </>
            );
          })
        }
      </List> */}
    </>
  );
}

export default  CategoriesSelectableList;
