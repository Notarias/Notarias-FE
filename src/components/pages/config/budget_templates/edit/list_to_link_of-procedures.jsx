import React                                          from 'react';
import { makeStyles }                                 from '@material-ui/core/styles';
import { styles }                                     from '../styles';
import { withStyles }                                 from '@material-ui/core/styles';
import List                                           from '@material-ui/core/List';
import ListItem                                       from '@material-ui/core/ListItem';
import ListItemText                                   from '@material-ui/core/ListItemText';
import { useQuery }                                   from '@apollo/react-hooks';
import { GET_BUDGETING_TEMPLATES_QUICK_LIST }         from '../queries_and_mutations/queries'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    overflow: 'auto',
    maxHeight: 300,
  },
  listSection: {
    backgroundColor: 'inherit',
  },
  ul: {
    backgroundColor: 'inherit',
    padding: 0,
  },
}));

const ListToLinkOfProcedures = (props) => {

  const classes = useStyles();
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  const { loading, data, refetch } = useQuery(
    GET_BUDGETING_TEMPLATES_QUICK_LIST,
  );


  return (
    <List className={classes.root}>
      {data.proceduresTemplatesQuickList.map(
        (item) => {
          return(
            <ListItem 
              button
              key={ item.id + "-itemId"}
              divider
              selected={selectedIndex === item.id}
              onClick={(event) => handleListItemClick(event, item.id)}
            >
              <ListItemText primary={`${item.name} ${item.id}`} />
            </ListItem>
          )
        }
      )
      }
    </List>
  );
}

export default withStyles(styles)(ListToLinkOfProcedures);
