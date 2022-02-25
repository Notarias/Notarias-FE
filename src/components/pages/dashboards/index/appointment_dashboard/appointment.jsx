import React, { useEffect, useState }   from 'react'
import Grid                             from '@material-ui/core/Grid';
import Paper                            from '@material-ui/core/Paper';
import Typography                       from '@material-ui/core/Typography';
import Avatar                           from '@material-ui/core/Avatar';
import AvatarGroup                      from '@material-ui/lab/AvatarGroup';
import Box                              from '@material-ui/core/Box';
import Menu                             from '@material-ui/core/Menu';
import MenuItem                         from '@material-ui/core/MenuItem';
import Button                           from '@material-ui/core/Button';
import Divider                          from '@material-ui/core/Divider';
import ListItemIcon                     from '@material-ui/core/ListItemIcon';
import ListItemText                     from '@material-ui/core/ListItemText';
import { useQuery }                     from '@apollo/client';
import { GET_USER }                     from '../../index_queries_and_mutations/queries'

const Appointment = (props) => {
  const { appointment } = props
  
  const [creator, setCreator] = useState();
  const [anchorEl, setAnchorEl] = useState();
  const [assigneList, setAssigneList] = useState(false);

  const { data } = useQuery(GET_USER, { variables: { "id": appointment.creatorId }})

  useEffect( () =>{
    setCreator(data && data.user)
  }, [data])

  const buildDate = (value, separator='/') => {
    let newDate = new Date(value)
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
    let hours = newDate.getHours();
    let minutes = newDate.getMinutes();
  
    return (
      `${date < 10 ? `0${date}` : `${date}`}${separator}${month < 10 ? `0${month}` : `${month}`}${separator}${year} - ${hours < 10 ? `0${hours}` : `${hours}`}:${minutes < 10 ? `0${minutes}` : `${minutes}`}`
    )
  }

  const openAssigneList = (event) => {
    setAnchorEl(event.currentTarget);
    setAssigneList(true);
  };

  const closeAssigneList = () => {
    setAssigneList(false);
    setAnchorEl(null);
  };

  return(
    <Paper style={{ padding: "10px" }}>
      <Grid item container justifyContent="flex-start">
        <Grid item container xs={8} justifyContent='flex-start' alignItems='center'>
          <Grid item style={{marginLeft: "20px"}}>
            <Typography variant='h6'>
              {`Fecha de Creacion: ${buildDate(appointment.createdAt)}`}
            </Typography>
          </Grid>
        </Grid>
        <Grid item container xs spacing={1} justifyContent='flex-end' alignItems='center' style={{ marginRight: "20px" }}>
          <Grid item>
            <Typography variant='subtitle2' color="secondary">
              No. {appointment.id.toString().padStart(10, "0")}
            </Typography>
          </Grid>
        </Grid>
        <Grid item container style={{ paddingBottom: "10px", paddingTop: "10px" }}>
          <Grid item container alignItems="center" xs justifyContent="center">
            <Grid item>
              <Typography color="primary">
                <strong>Fecha Inicial:</strong>
              </Typography>
              <Typography color="primary">
                {buildDate(appointment.initDate)}
              </Typography>
            </Grid>
          </Grid>
          <Divider orientation="vertical" flexItem/>
          <Grid item container alignItems="center" xs justifyContent="center">
            <Grid item>
              <Typography>
                <strong>Fecha de Termino:</strong>
              </Typography>
              <Typography>
                {buildDate(appointment.endDate)}
              </Typography>
            </Grid>
          </Grid>
          <Divider orientation="vertical" flexItem/>
          <Grid item container alignItems="center" xs justifyContent="center">
            <Grid item>
              <Box color="success.main">
                <Typography>
                  <strong>Ubicación:</strong>
                </Typography>
                <Typography>
                  {appointment.place}
                </Typography>
              </Box>
            </Grid>
          </Grid>
          <Divider orientation="vertical" flexItem/>
          <Grid item container alignItems="center" xs justifyContent="center">
            <Grid item>
              <Typography>
                <strong>Datos del Evento:</strong>
              </Typography>
              <Typography>
                {`${appointment.extraData.substr(0,30)}...`}
              </Typography>
            </Grid>
          </Grid>
          <Divider orientation="vertical" flexItem/>
          <Grid item container alignItems="center" xs justifyContent="center">
            <Grid item>
              <Typography>
                <strong>Invitados:</strong>
              </Typography>
              <Button aria-controls="assigned-list" aria-haspopup="true" onClick={openAssigneList}>
                <AvatarGroup max={3}>
                  {appointment.users.map((user) => {
                    return(<Avatar key={user.id} alt={user.fullName} src={user.avatarThumbUrl} />)
                  })}
                </AvatarGroup>
              </Button>
              <Menu
                id="assigned-list"
                anchorEl={anchorEl}
                keepMounted
                open={assigneList}
                onClose={closeAssigneList}
              >
                {appointment.users.map((user) => {
                  return(
                    <MenuItem key={user.id}>
                      <ListItemIcon>
                        <Avatar alt={user.firstName} src={user.avatarThumbUrl} />
                      </ListItemIcon>
                      <ListItemText primary={`${user.firstName} ${user.lastName}`} />
                    </MenuItem>
                  )
                })}
              </Menu>
            </Grid>
          </Grid>
          <Divider orientation="vertical" flexItem/>
          <Grid item container xs alignItems='center' style={{ paddingLeft: "10px"}}>
            <Grid item container>
              <Typography>
                <strong>Creador: </strong>
              </Typography>
              {creator ?
                <Grid item container direction="row" spacing={1}>
                  <Grid item>
                    <Avatar alt={creator.fullName} src={creator.avatarThumbUrl}/>
                  </Grid>
                  <Grid item>
                    <Typography variant="body2" align="left">{creator.firstName}</Typography>
                    <Typography variant="body2" align="left">{creator.lastName}</Typography>
                  </Grid>
                </Grid>
              :
                <Typography>
                  Sin Usuario Asignado
                </Typography>
              }
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default Appointment;
