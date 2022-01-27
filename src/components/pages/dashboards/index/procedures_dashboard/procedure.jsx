import React, { useEffect, useState } from 'react'
import Grid                           from '@material-ui/core/Grid';
import Paper                          from '@material-ui/core/Paper';
import Typography                     from '@material-ui/core/Typography';
import Avatar                         from '@material-ui/core/Avatar';
import Button                         from '@material-ui/core/Button';
import CheckCircleIcon                from '@material-ui/icons/CheckCircle';
import Box                            from '@material-ui/core/Box';
import IconButton                     from '@material-ui/core/IconButton';
import Divider                        from '@material-ui/core/Divider';
import MessageIcon                    from '@material-ui/icons/Message';

const Procedure = (props) => {
  const { procedure } = props
  console.log(procedure)
  const [asignee] = useState(procedure.asignee)

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

  const formatValue = (value) => {
    return(((value * 1.0) / 100).toFixed(2))
  }

  return(
    <Grid item style={{ paddingBottom: "20px", paddingRight: "30px" }}>
      <Paper style={{ padding: "10px" }}>
        <Grid item container justifyContent="flex-start">
          <Grid item container>
            <Grid item container xs={8} justifyContent='flex-start' alignItems='center'>
              <Grid item>
                <Typography variant='h6'>
                  {procedure.proceduresTemplate.name}
                </Typography>
              </Grid>
              {
                procedure.completedAt &&
                  <Grid item style={{ paddingLeft: "10px", paddingRight: "10px" }}>
                    <Box color="success.main">
                      <CheckCircleIcon/>
                    </Box>
                  </Grid>
              }
            </Grid>
            <Grid item container xs spacing={1} justifyContent='flex-end' alignItems='center'>
              {procedure.comments.length > 0 ? 
                <Grid item>
                  <IconButton
                    aria-label="more"
                    aria-controls="long-menu"
                    aria-haspopup="true"
                  >
                    <MessageIcon />
                  </IconButton>
                </Grid>
              :
                ""
              }
              <Grid item>
                <Typography variant='subtitle2' color="secondary">
                  No. {procedure.serialNumber.toString().padStart(10, "0")}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item container  style={{ paddingBottom: "10px", paddingTop: "10px" }}>
            <Grid item container alignItems="center" xs={2}>
              <Grid item>
                <Typography color="primary">
                  <strong>Presupuesto Vinculado: </strong>
                </Typography>
                <Typography color="primary">
                  {procedure.budgetingTemplate.name}
                </Typography>
              </Grid>
            </Grid>
            <Divider orientation="vertical" flexItem/>
            <Grid item container alignItems="center" xs={2} justifyContent="center">
              <Grid item>
                <Typography>
                  <strong>Cliente:</strong>
                </Typography>
                <Typography>
                  {procedure.client.fullName}
                </Typography>
              </Grid>
            </Grid>
            <Divider orientation="vertical" flexItem/>
            <Grid item container alignItems="center" xs={2} justifyContent="center">
              <Grid item>
                <Typography>
                  <strong>Fecha de Inicio:</strong>
                </Typography>
                <Typography>
                  {buildDate(procedure.createdAt)}
                </Typography>
              </Grid>
            </Grid>
            <Divider orientation="vertical" flexItem/>
            <Grid item container alignItems="center" xs={2} justifyContent="center">
              <Grid item>
                <Box color="success.main">
                  <Typography>
                    <strong>Ultima Modificacion:</strong>
                  </Typography>
                  <Typography>
                    {procedure.updatedAt == procedure.createdAt ?
                      "Sin Modificaciones"
                    :
                      buildDate(procedure.updatedAt)}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
            <Divider orientation="vertical" flexItem/>
            <Grid item container xs={3} alignItems='center' style={{ paddingLeft: "20px"}}>
              <Grid item container>
                <Typography>
                  <strong>Responsable:</strong>
                </Typography>
                {asignee ?
                  <Grid item container direction="row" spacing={1}>
                    <Grid item>
                      <Avatar alt={asignee.fullName} src={asignee && asignee.avatarThumbUrl}/>
                    </Grid>
                    <Grid item direction="column">
                      <Typography variant="body2" align="left">{asignee.firstName}</Typography>
                      <Typography variant="body2" align="left">{asignee.lastName}</Typography>
                    </Grid>
                  </Grid>
                  :
                  "Sin Usuario Asignado"
                }
              </Grid>
              <Grid item xs zeroMinWidth style={{ paddingLeft: "20px"}}>
                <Typography noWrap={true} align='left'>
                  {asignee ? asignee.fullName : 'Sin Encargado'}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  )
}

export default Procedure;
