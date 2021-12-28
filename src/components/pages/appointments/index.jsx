import React, { useState } from 'react';
import { withStyles }       from '@material-ui/core/styles';
import { styles }                   from './styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import NewDialog from './newDialog/index';
import EventList from './eventList/index';
import { useQuery }                   from '@apollo/client';
import { GET_CURRENT_USER }           from '../users/queries_and_mutations/queries';

const AppointmentsIndex = (props) => {
  const { classes } = props

  const [sortField, setSortField]         = useState("first_name")
  const [sortDirection, setSortDirection] = useState("desc")
  const [searchField]                     = useState("first_name_or_last_name_or_email_cont")
  const [searchValue, setSearchValue]     = useState("")
  const [page, setPage]                   = useState(1)
  const [per, setPer]                     = useState(100)

  let variables = {
    page: page,
    per: per,
    searchField: searchField,
    searchValue: searchValue,
    sortDirection: sortDirection,
    sortField: sortField
  }

  const { loading, data, refetch } = useQuery(
    GET_CURRENT_USER, { variables: variables }
  );

  const [dataS] = useState(
    [
      { id: 1, attorney: 'abogado 1',  ini_date: new Date().toLocaleDateString(), fin_date: new Date().toLocaleDateString(), place: 'oficina 1' },
      { id: 2, attorney: 'abogado 2',  ini_date: new Date().toLocaleDateString(), fin_date: new Date().toLocaleDateString(), place: 'oficina 2' },
      { id: 3, attorney: 'abogado 3',  ini_date: new Date().toLocaleDateString(), fin_date: new Date().toLocaleDateString(), place: 'oficina 3' },
      { id: 4, attorney: 'abogado 4',  ini_date: new Date().toLocaleDateString(), fin_date: new Date().toLocaleDateString(), place: 'oficina 4' },
      { id: 5, attorney: 'abogado 5',  ini_date: new Date().toLocaleDateString(), fin_date: new Date().toLocaleDateString(), place: 'oficina 5' },
      { id: 6, attorney: 'abogado 6',  ini_date: new Date().toLocaleDateString(), fin_date: new Date().toLocaleDateString(), place: 'oficina 6' },
      { id: 7, attorney: 'abogado 7',  ini_date: new Date().toLocaleDateString(), fin_date: new Date().toLocaleDateString(), place: 'oficina 7' },
    ]
  )

  console.log(data)

  const [date, setDate] = useState(new Date());
  const [openNewDialog, setOpenNewDialog] = useState(false);

  const handleClickOpenNewDialog = () => {
    setOpenNewDialog(true);
  };

  const handleCloseNewDialog = (value) => {
    setOpenNewDialog(false);
  };

  return(
    <Grid>
      <h1>Appointments</h1>
      <Grid container spacing={3}>
        <Grid item xs={4}></Grid>
        <Grid item xs={8} container justifyContent="flex-start">
          <Typography variant="h4" component="h2" >Fecha</Typography>
        </Grid>
      </Grid>
      <Grid container spacing={3} >
        <Grid item xs={4}>
          <Paper className={classes.marginLeftCalendarPaper} >
            <Typography variant="h4" component="h2">Calendar</Typography>
            <Grid container justifyContent="center" >
              <Calendar
                value={date}
              />
            </Grid>
            <NewDialog handleCloseNewDialog={handleCloseNewDialog} openNewDialog={openNewDialog}/>
            <Grid className={classes.calendarNew}>
              <Grid container justifyContent="flex-end">
                <Button variant="contained" color="primary" onClick={handleClickOpenNewDialog}>
                  New Event
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={8}>
          <Grid className={classes.windowScrollEventList}>
            {
              dataS.map( eventDay  => {
                return <EventList eventDay={eventDay} key={eventDay.id}/>
              })
            }
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
export default withStyles(styles)(AppointmentsIndex);