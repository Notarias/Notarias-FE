import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { styles } from '../styles';
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
import { GET_APPOINTMENTS } from '../queries_and_mutations/queries';
import { UPDATE_APPOINTMENT } from '../queries_and_mutations/queries';

/* const buildDate = (value, separator='/') => {
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
} */

const buildDate = (value, separator='-') => {
  let newDate = new Date(value)
  let date = newDate.getDate();
  let month = newDate.getMonth() + 1;
  let year = newDate.getFullYear();
  let hours = newDate.getHours();
  let minutes = newDate.getMinutes();

  return (
    `${year}${separator}${month < 10 ? `0${month}` : `${month}`}${separator}${date < 10 ? `0${date}` : `${date}`}T${hours < 10 ? `0${hours}` : `${hours}`}:${minutes < 10 ? `0${minutes}` : `${minutes}`}`
  )
}

const EditAppointmentDialog = (props) => {
  const { classes, closeEditDialog, appointment, variables } = props
  const [initDate, setInitDate] = useState(new Date(appointment.initDate));
  const [endDate, setEndDate] = useState(new Date(appointment.endDate));
  const [place, setPlace] = useState(appointment.place);
  const [extraData, setExtraData] = useState(appointment.extraData);
  const [selecteds] = useState(appointment.users);

  const [selectedIds, setSelectedIds] = useState(
    selecteds && selecteds.map((user) => {
      return(user.id)
    })
  );

  const [updateAppointment] =
  useMutation(
    UPDATE_APPOINTMENT,
    {
      onCompleted(cacheData) {
        closeEditDialog();
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
    updateAppointment( {
      variables: {
        id: appointment.id,
        assignedIds: selectedIds,
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

  const endDateChange = (event) => {
    setEndDate(new Date(event.target.value))
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
            title="Editar Evento"
            subheader={buildDate(appointment.initDate)}
          />
        </Grid>
      </Grid>
      <Divider/>
      <CardContent>
        <Grid container item justifyContent='center'>
          <Grid container item xs={10}>
            <Grid item xs={12} className={classes.marginTopStartAndEnd}>
              <TextField
                id="datetime-local"
                label="Inicio de la Cita"
                type="datetime-local"
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={initDateChange}
                value= {buildDate(initDate)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} className={classes.marginTopStartAndEnd}>
              <TextField
                id="datetime-local"
                label="Termino de la Cita"
                type="datetime-local"
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={endDateChange}
                value= {buildDate(endDate)}
                fullWidth
              />
            </Grid>
            <Grid container item xs={12} className={classes.marginTopStartAndEnd}>
              <AssigneSelectorList selectedIds={selectedIds} setSelectedIds={setSelectedIds} appointment={appointment} selecteds={selecteds}/>
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
      <CardActions>
        <Grid container justifyContent='center'>
          <Grid container item xs={10} justifyContent='flex-end'>
            <Grid item>
              <Button color="secondary" variant="outlined" onClick={closeEditDialog} style={{ margin: 5 }}>
                Cancelar
              </Button>
            </Grid>
            <Grid item>
              <Button color="primary" variant="outlined" onClick={saveAppointment} style={{ margin: 5 }}>
                Actualizar
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  )
}
export default withStyles(styles)(EditAppointmentDialog);
