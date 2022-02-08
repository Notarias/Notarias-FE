import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { styles } from './../styles';
import Grid from '@material-ui/core/Grid';
import 'react-calendar/dist/Calendar.css';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import PlaceIcon from '@material-ui/icons/Place';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Divider from '@material-ui/core/Divider';
import InputAdornment from '@material-ui/core/InputAdornment';
import AssigneSelectorList from './assigne_selector_list';
import EventNoteIcon from '@material-ui/icons/EventNote';
import { useMutation } from '@apollo/client';
import { GET_APPOINTMENTS } from './../queries_and_mutations/queries';
import { CREATE_APPOINTMENT } from './../queries_and_mutations/queries';

const getCurrentDate = (value, separator='/') => {
  let newDate = new Date(value)
  let date = newDate.getDate();
  let month = newDate.getMonth() + 1;
  let year = newDate.getFullYear();
  let hours = newDate.getHours();
  let minutes = newDate.getMinutes();

  return (
    `${date < 10 ? `0${date}` : `${date}`}${separator}${month < 10 ? `0${month}` : `${month}`}${separator}${year} -
     ${hours < 10 ? `0${hours}` : `${hours}`}:${minutes < 10 ? `0${minutes}` : `${minutes}`}`
  )
}

const formatDate = (value, separator='-') => {
  let newDate = new Date(value)
  let date = newDate.getDate();
  let month = newDate.getMonth() + 1;
  let year = newDate.getFullYear();

  return (
    `${year}${separator}${month < 10 ? `0${month}` : `${month}`}${separator}${date < 10 ? `0${date}` : `${date}`}`)
}

const formatTime = (value, separator='-') => {
  let newDate = new Date(value)
  let hours = newDate.getHours();
  let minutes = newDate.getMinutes();

  return (`${hours < 10 ? `0${hours}` : `${hours}`}:${minutes < 10 ? `0${minutes}` : `${minutes}`}`)
}

const NewAppointmentDialog = (props) => {

  const { classes, closeNewDialog, variables } = props
  //const [errors, setErrors] = useState();
  //const [pristine, setPristine] = useState(true);
  const [initDate, setInitDate] = useState(new Date());
  const [initTime, setInitTime] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [place, setPlace] = useState("");
  const [extraData, setExtraData] = useState("");
  const [selecteds, setSelecteds] = useState([]);
  const [currentDate] = useState(getCurrentDate(new Date()))

  const [createAppointment] =
  useMutation(
    CREATE_APPOINTMENT,
    {
      /* onError(error) {
        let errorsHash = {}
        error.graphQLErrors.map((error) => {
          errorsHash[error.extensions.attribute] = error.message
        }) 
        setErrors(errorsHash)
        setPristine(true)
      }, */
      onCompleted(cacheData) {
        closeNewDialog();
      },
      refetchQueries: [
        {
          query: GET_APPOINTMENTS,
          variables: variables
        },
      ],
      awaitRefetchQueries: true
    }
  )

  const saveAppointment = () => {
    let array = [];

    selecteds.map((user) => {
      return(array.push(user))
    })

    createAppointment( {
      variables: {
        assignedIds: array,
        initDate: initDate,
        endDate: endDate,
        place: place,
        extraData: extraData
      }
    })
  }

  const initDateChange = (event) => {
    setInitDate(new Date(event.target.value))
  }

  const initTimeChange = (event) => {
    setInitTime(new Date(event.target.value))
  }

  const endDateChange = (event) => {
    setEndDate(new Date(event.target.value))
  }

  const endTimeChange = (event) => {
    setEndTime(new Date(event.target.value))
  }

  const placeChange = (event) => {
    setPlace(event.target.value)
  }

  const extraDataChange = (event) => {
    setExtraData(event.target.value)
  }

  return(
    <Card>
      <Grid container item justifyContent='center'>
        <Grid item xs={10}>
          <CardHeader
            avatar={
              <Avatar variant="rounded" aria-label="recipe" style={{ backgroundColor: 'blue' }}>
                <EventNoteIcon/>
              </Avatar>
            }
            title="Nuevo Evento"
            subheader={currentDate}
          />
        </Grid>
      </Grid>
      <Divider/>
      <CardContent>
        <Grid container item justifyContent='center'>
          <Grid container item direction="columns" xs={10}>
            <Grid item container xs={12} justifyContent="space-between">
              <Grid item xs={7}>
                <TextField
                  id="date-start"
                  label="Inicio de la Cita"
                  type="date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  format="MM/dd/yyyy"
                  onChange={initDateChange}
                  value={formatDate(initDate)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  id="time-start"
                  label="Hora de la Cita"
                  type="time"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  format="HH:MM"
                  onChange={initTimeChange}
                  value={formatTime(initTime)}
                  fullWidth
                />
              </Grid>
            </Grid>
            <Grid item container xs={12} justifyContent="space-between">
              <Grid item xs={7}>
                <TextField
                  id="date-end"
                  label="Termino de la Cita"
                  type="date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  format="MM/dd/yyyy"
                  onChange={endDateChange}
                  value={formatDate(endDate)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  id="time-end"
                  label="Hora de la Cita"
                  type="time"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  format="HH:MM"
                  onChange={endTimeChange}
                  value={formatTime(endTime)}
                  fullWidth
                />
              </Grid>
            </Grid>
            <Grid container item xs={12} className={classes.marginTopStartAndEnd}>
              <AssigneSelectorList selecteds={selecteds} setSelecteds={setSelecteds}/>
            </Grid>
            <Grid item xs={12} className={classes.marginTopStartAndEnd}>
              <TextField
                label="Lugar"
                id="outlined-size-small"
                variant="outlined"
                size="small"
                onChange={placeChange}
                value= {place}
                fullWidth
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <PlaceIcon color="disabled"/>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} className={classes.marginTopStartAndEnd}>
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
          </Grid>
        </Grid>
      </CardContent>
      <Divider/>
      <CardActions disableSpacing>
        <Grid container justifyContent='center'>
          <Grid container item xs={10} justifyContent='flex-end'>
            <Grid item>
              <Button color="secondary" variant="outlined" onClick={closeNewDialog} style={{ margin: 5 }}>
                Cancelar
              </Button>
            </Grid>
            <Grid item>
              <Button color="primary" variant="outlined" onClick={saveAppointment} style={{ margin: 5 }}>
                Guardar
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  )
}
export default withStyles(styles)(NewAppointmentDialog);
