import React, { useState }            from 'react'
import Grid                           from '@material-ui/core/Grid';
import Paper                          from '@material-ui/core/Paper';
import Typography                     from '@material-ui/core/Typography';
import Avatar                         from '@material-ui/core/Avatar';
import Chip                           from '@material-ui/core/Chip';
import Box                            from '@material-ui/core/Box';
import IconButton                     from '@material-ui/core/IconButton';
import Divider                        from '@material-ui/core/Divider';
import Tooltip                        from '@material-ui/core/Tooltip';
import VisibilityIcon                 from '@material-ui/icons/Visibility';
import MessageIcon                    from '@material-ui/icons/Message';
import { Link }                       from 'react-router-dom';
import CommentsDialog                 from './comments_dialog';

const Procedure = (props) => {
  const { procedure } = props

  const [asignee] = useState(procedure.asignee);
  const [commentDialog, setCommentDialog] = useState(false);

  const statsCommentDialog = () => {
    setCommentDialog(!commentDialog);
  }

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

  return(
    <Paper style={{ padding: "10px" }}>
      <Grid item container justifyContent="flex-start">
        <Grid item container xs={8} justifyContent='flex-start' alignItems='center'>
          <Grid item style={{marginLeft: "20px"}}>
            <Typography variant='h6'>
              {procedure.proceduresTemplate.name}
            </Typography>
          </Grid>
        </Grid>
        <Grid item container xs spacing={1} justifyContent='flex-end' alignItems='center' style={{ marginRight: "20px" }}>
          {procedure.comments.length > 0 &&
            <Grid item>
              <Tooltip title='Ver Comentarios'>
                <IconButton onClick={statsCommentDialog}>
                  <MessageIcon />
                </IconButton>
              </Tooltip>
              <CommentsDialog
                procedure={procedure}
                commentDialog={commentDialog}
                statsCommentDialog={statsCommentDialog}
              />
            </Grid>
          }
          <Grid item>
            <Link to={`/procedures/${procedure.id}/edit`}>
              <Tooltip title='Ver Tramite'>
                <IconButton>
                  <VisibilityIcon />
                </IconButton>
              </Tooltip>
            </Link>
          </Grid>
          <Grid item>
            <Typography variant='subtitle2' color="secondary">
              No. {procedure.serialNumber.toString().padStart(10, "0")}
            </Typography>
          </Grid>
        </Grid>
        <Grid item container style={{ paddingBottom: "10px", paddingTop: "10px" }}>
          <Grid item container alignItems="center" xs justifyContent="center">
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
          <Grid item container alignItems="center" xs justifyContent="center">
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
          <Grid item container alignItems="center" xs justifyContent="center">
            <Grid item>
              <Box color="success.main">
                <Typography>
                  <strong>Ultimo Movimiento:</strong>
                </Typography>
                <Typography>
                  {buildDate(procedure.updatedAt)}
                </Typography>
              </Box>
            </Grid>
          </Grid>
          <Divider orientation="vertical" flexItem/>
          <Grid item container direction="row" alignItems="center" xs justifyContent="center">
            <Grid item xs={12}>
              <Typography>
                <strong>Estatus:</strong>
              </Typography>
            </Grid>
            <Grid item xs={12}>
              {!!procedure.completedAt ?
                <Box color="success.main">
                  <Chip label="Completado" color='primary' style={{backgroundColor:'MediumSeaGreen'}}/>
                </Box>
              :
                <Chip label="En Proceso" color='secondary'/>
              }
            </Grid>
          </Grid>
          <Divider orientation="vertical" flexItem/>
          <Grid item container alignItems="center" xs justifyContent="center">
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
          <Grid item container xs alignItems='center' style={{ paddingLeft: "10px"}}>
            <Grid item container>
              {asignee ?
                <Grid item container direction="row" spacing={1}>
                  <Grid item>
                    <Avatar alt={asignee.fullName} src={asignee && asignee.avatarThumbUrl}/>
                  </Grid>
                  <Grid item>
                    <Typography variant="body2" align="left">{asignee.firstName}</Typography>
                    <Typography variant="body2" align="left">{asignee.lastName}</Typography>
                  </Grid>
                </Grid>
                :
                "Sin Usuario Asignado"
              }
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default Procedure;
