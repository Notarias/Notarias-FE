import React from 'react'
import { withStyles }                       from '@material-ui/core/styles';
import { styles }                           from './styles';
import { Avatar, Grid }             from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import { LOAD_CLIENT_COMMENTS} from '../clients_queries_and_mutations/queries';
import { useQuery }         from '@apollo/react-hooks';
import ImageIcon from '@material-ui/icons/Image';
import Button from '@material-ui/core/Button';

const ClientComments = (props) => {
  const {classes } = props
  const [textFieldSelected, setTextFieldSelected] = React.useState(false)
  const [commentValue, setCommentValue] = React.useState("")
  const [pristine, setPristine] = React.useState(true)

  // const { loading, error, data} = useQuery(LOAD_CLIENT_COMMENTS, { variables: { "id": match.params.id }})

  // const [client, setClient] = React.useState(dataClient ? dataClient.client : [])


  // useEffect(() => {
  //   dataClient && 
  // }, [dataAttribute])

  
  const changeTextField = () => {
    setTextFieldSelected(true)
  }

  const handleCancel = () => {
    setTextFieldSelected(false)
    setPristine(true)
    setCommentValue("")
  }

  const valueChange = (event) => {
    setCommentValue(event.target.value)
    setPristine(false)
  }

  const renderTextField = () => {
    if(textFieldSelected) {
      return(
        <Grid container item xs={10} direction="row" justifyContent="flex-start" alignItems="flex-start">
          <TextField
            value={commentValue}
            onChange={valueChange}
            autoFocus
            fullWidth
            placeholder="Agregar un comentario"
            variant="outlined"
            multiline
          />
          <Button onClick={ handleCancel }>Cancelar</Button>
          <Button disabled={pristine}>
            Aceptar
          </Button>
        </Grid>
      )
    } else {
      return(
        <Grid container item xs={10} direction="row" justifyContent="flex-start" alignItems="flex-start">
          <TextField
            value={commentValue}
            fullWidth
            size="small"
            onFocus={changeTextField}
            placeholder="Agregar un comentario"
            variant="outlined"
          />
        </Grid>
      )
    }
  }


  return(
    <Paper style={{width:"87%"}}>
      <List>
        <ListItem>
          <Grid  container item xs={12} direction="column">
            <Grid container item direction="row" justifyContent="center" alignItems="flex-start">
              <Avatar style={{width:"30px", height: "30px", margin: "5px 10px 5px 5px"}}>
                <ImageIcon />
              </Avatar>
              {renderTextField()}
            </Grid>
            <Grid container item xs={12} direction="column" style={{marginRight:"10px"}}>
              <ListItemText>Comentarios</ListItemText>
              
            </Grid>
          </Grid>
        </ListItem>
      </List>
    </Paper>
  )
}

export default withStyles(styles)(ClientComments);
