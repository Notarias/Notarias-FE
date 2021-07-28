import React from 'react'
import { withStyles }                       from '@material-ui/core/styles';
import { styles }                           from './styles';
import { Grid }             from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import { LOAD_CLIENT_COMMENTS} from '../clients_queries_and_mutations/queries';
import { useQuery }         from '@apollo/react-hooks';

const ClientComments = (props) => {
  const {classes } = props

  // const { loading, error, data} = useQuery(LOAD_CLIENT_COMMENTS, { variables: { "id": match.params.id }})

  // const [client, setClient] = React.useState(dataClient ? dataClient.client : [])


  // useEffect(() => {
  //   dataClient && 
  // }, [dataAttribute])

  return(
    <Paper style={{width:"87%"}}>
      <List>
        <ListItem>
          <Grid container direction="column" style={{marginRight:"10px"}}>
            <ListItemText>Comentarios</ListItemText>
            <TextField
              id="outlined-disabled"
              variant="outlined"
              size="small"
            />
          </Grid>
        </ListItem>
      </List>
    </Paper>
  )
}

export default withStyles(styles)(ClientComments);
