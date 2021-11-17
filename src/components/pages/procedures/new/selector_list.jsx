import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
//import Fuse from 'fuse.js';

import { useQuery } from '@apollo/client';
import { GET_PROCEDURES_TEMPLATES_QUICK_LIST  } from '../queries_and_mutations/queries';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    minHeight: 445,
    maxHeight: 446,
  },
  bullet: {
    display: 'inline-block',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const SelectorList = (props) => {

  const { selectedProcedure, setSelectedProcedure } = props;

  const [procedureList, setProcedureList] = useState();

  const classes = useStyles();
  
  const { loading, data, refetch } = useQuery(
    GET_PROCEDURES_TEMPLATES_QUICK_LIST
  );

  useEffect( () => {
    if(data && data.proceduresTemplatesQuickList){
      setProcedureList(data.proceduresTemplatesQuickList)
    }
  }, [data])
  console.log(procedureList)
  return (
    <Card className={classes.root} variant="outlined" style={{ overflowY: "scroll" }}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          Selecciona un trámite
        </Typography>
        <List>
          <ListItem button>
            ITEM  
          </ListItem>
          <Divider/>
        </List>
        <List>
          <ListItem button>
            ITEM  
          </ListItem>
          <Divider/>
        </List>
        <List>
          <ListItem button>
            ITEM  
          </ListItem>
          <Divider/>
        </List>
        <List>
          <ListItem button>
            ITEM  
          </ListItem>
          <Divider/>
        </List>
        <List>
          <ListItem button>
            ITEM  
          </ListItem>
          <Divider/>
        </List>
        <List>
          <ListItem button>
            ITEM  
          </ListItem>
          <Divider/>
        </List>
        <List>
          <ListItem button>
            ITEM  
          </ListItem>
          <Divider/>
        </List>
        <List>
          <ListItem button>
            ITEM  
          </ListItem>
          <Divider/>
        </List>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
};

export default SelectorList;
