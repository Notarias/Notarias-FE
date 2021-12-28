import React, { useState } from 'react';
import { withStyles }       from '@material-ui/core/styles';
import { styles }                   from './../styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import 'react-calendar/dist/Calendar.css';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Avatar from '@material-ui/core/Avatar';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import PlaceIcon from '@material-ui/icons/Place';
import DialogActions from '@material-ui/core/DialogActions';
import { useMutation }                    from '@apollo/client';
import { GET_CURRENT_USER }                  from '../queries_and_mutations/queries';
import { CREATE_APPOINTENTS } from '../queries_and_mutations/queries';

const NewDialog = (props) => {

  const { classes, openNewDialog, handleCloseNewDialog } = props
  const [errors, setErrors] = useState({})
  const [pristine, setPristine] = useState(true);

  const [createAppointmenMutation, {loading}] =
  useMutation(
    CREATE_APPOINTENTS,
    {
      onError(error) {
        let errorsHash = {}
        error.graphQLErrors.map((error) => {
          errorsHash[error.extensions.attribute] = error.message
        }) 
        setErrors(errorsHash)
        setPristine(true)
      },
      onCompleted(cacheData) {
        
      }
    }
  )

  const iniDateChange = (event) => {
    console.log(event.target.value)
    setInitDate(event.target.value)
  }

  const endDateChange = (event) => {
    console.log(event.target.value)
    setEndDate(event.target.value)
  }

  const placeChange = (event) => {
    console.log(event.target.value)
    setPlace(event.target.value)
  }

  const extraDataChange = (event) => {
    console.log(event.target.value)
    setExtraData(event.target.value)
  }

  const onChange = (date) => {
    // setDate(date)
    console.log("data")
  }

  const [creatorId, setCreatorId] = useState("");
  const [assignedId, setAssignedId] = useState("");
  const [initDate, setInitDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [place, setPlace] = useState("");
  const [extraData, setExtraData] = useState("");

  const handeSave = () => {
    createAppointmenMutation( {
      variables: {
        creatorId: creatorId,
        assignedId: assignedId,
        initDate: initDate,
        endDate: endDate,
        place: place,
        extraData: extraData
      }
    })
  }

  return(
    <Grid>
      <Dialog open={openNewDialog} aria-labelledby="simple-dialog-title" >
        <Paper className={classes.widthDialog}>
            <DialogTitle id="alert-dialog-title">
              <Grid container>
                  <Grid item xs={6} >
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                  </Grid>
                  <Grid item xs={6}>
                    <Typography className={classes.centerText}>
                      Abogado 1
                    </Typography>
                  </Grid>
              </Grid>
            </DialogTitle>
          <Grid container className={classes.marginTopStartAndEnd}>
            <Grid item xs={5} className={classes.centerText}>
              <Typography>
                Inicio
              </Typography>
            </Grid>
            <Grid item xs={7}>
              <TextField
                id="datetime-local"
                label="Next appointment"
                type="datetime-local"
                defaultValue="2017-05-24T10:30"
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={iniDateChange}
                value= {initDate}
              />
            </Grid>
          </Grid>
          <Grid container className={classes.marginTopStartAndEnd}>
            <Grid item xs={5} className={classes.centerText}>
              <Typography>
                Fin
              </Typography>
            </Grid>
            <Grid item xs={7}>
              <TextField
                id="datetime-local"
                label="Next appointment"
                type="datetime-local"
                defaultValue="2017-05-24T10:30"
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={endDateChange}
                value= {endDate}
              />
            </Grid>
          </Grid>
          <Grid container className={classes.marginTopStartAndEnd}>
            <Grid item xs={10}>
              <TextField
                label="Lugar"
                id="outlined-size-small"
                variant="outlined"
                size="small"
                fullWidth
                onChange={placeChange}
                value= {place}
              />
            </Grid>
            <Grid item xs={2} container justifyContent="center">
              <PlaceIcon/>
            </Grid>
          </Grid>
          <Grid className={classes.marginTopStartAndEnd}>
            <TextField
              id="outlined-multiline-static"
              label="Información adicional"
              multiline
              rows={4}
              variant="outlined"
              fullWidth
              onChange={extraDataChange}
              value={extraData}
            />
          </Grid>
        </Paper>
        <DialogActions>
          <Button onClick={handleCloseNewDialog} color="primary">
            Cancelar
          </Button>
          <Button color="primary" onClick={handeSave} autoFocus>
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  )
}
export default withStyles(styles)(NewDialog);