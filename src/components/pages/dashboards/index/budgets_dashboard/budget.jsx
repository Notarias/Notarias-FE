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

const Budget = (props) => {
  const { budget } = props

  const [asignee] = useState(budget.asignee);
  const [commentDialog, setCommentDialog] = useState(false);

  const statsCommentDialog = () => {
    setCommentDialog(!commentDialog);
  }

  const formatValue = (value) => {
    return(((value * 1.0) / 100).toFixed(2))
  }

  const buildDate = (value, separator='/') => {
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

  return(
    <Paper style={{ padding: "10px" }}>
      <Grid container justifyContent="flex-start">
        <Grid item container xs={8} justifyContent='flex-start' alignItems='center'>
          <Grid item style={{marginLeft: "20px"}}>
            <Typography variant='h6'>
              {budget.budgetingTemplate.name}
            </Typography>
          </Grid>
        </Grid>
        <Grid item container xs spacing={1} justifyContent='flex-end' alignItems='center' style={{ marginRight: "20px" }}>
          {budget.comments.length > 0 &&
            <Grid item>
              <Tooltip title='Ver Comentarios'>
                <IconButton onClick={statsCommentDialog}>
                  <MessageIcon />
                </IconButton>
              </Tooltip>
              <CommentsDialog 
                budget={budget}
                commentDialog={commentDialog}
                statsCommentDialog={statsCommentDialog}
              />
            </Grid>
          }
          <Grid item>
            <Link to={`/budgets/${budget.id}/edit`}>
              <Tooltip title='Ver Presupuesto'>
                <IconButton>
                  <VisibilityIcon />
                </IconButton>
              </Tooltip>
            </Link>
          </Grid>
          <Grid item>
            <Typography variant='subtitle2' color="secondary">
              No. {budget.serialNumber.toString().padStart(10, "0")}
            </Typography>
          </Grid>
        </Grid>
        <Grid item container direction="row" alignItems="stretch" style={{ paddingBottom: "10px", paddingTop: "10px" }}>
          <Grid item container alignItems="center" xs justifyContent="center">
            <Grid item>
              <Typography color="primary">
                <strong>Total:</strong>
              </Typography>
              <Typography color="primary">
                ${formatValue(budget.total)}
              </Typography>
            </Grid>
          </Grid>
          <Divider orientation="vertical" flexItem/>
          <Grid item container alignItems="center" xs justifyContent="center">
            <Grid item>
              <Typography color="secondary">
                <strong>Saldo:</strong>
              </Typography>
              <Typography color="secondary">
                {`$${formatValue(budget.totalDebt)}`}
              </Typography>
            </Grid>
          </Grid>
          <Divider orientation="vertical" flexItem/>
          <Grid item container alignItems="center" xs justifyContent="center">
            <Grid item>
              <Box color="success.main">
                <Typography>
                  <strong>Ingresos:</strong>
                </Typography>
                <Typography>
                  {`$${formatValue(budget.totalCredit)}`}
                </Typography>
              </Box>
            </Grid>
          </Grid>
          <Divider orientation="vertical" flexItem/>
          <Grid item container alignItems="center" xs justifyContent="center">
            <Grid item>
              <Typography>
                <strong>Egresos:</strong>
              </Typography>
              <Typography>
                {`$${formatValue(budget.totalPaid)}`}
              </Typography>
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
              {!!budget.completedAt ?
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
                <strong>Fecha de Inicio:</strong>
              </Typography>
              <Typography>
                {buildDate(budget.createdAt)}
              </Typography>
            </Grid>
          </Grid>
          <Divider orientation="vertical" flexItem/>
          <Grid item container xs direction="column" alignItems='center' style={{ paddingLeft: "5px"}}>
            <Grid item xs>
              <Typography>
                <strong>Encargado: </strong>
              </Typography>
            </Grid>
            {asignee ?
              <Grid item container xs direction="row" spacing={1}>
                <Grid item>
                  <Avatar src={asignee && asignee.avatarThumbUrl}/>
                </Grid>
                <Grid item xs>
                  <Typography variant="body2" align="left">{asignee.firstName}</Typography>
                  <Typography variant="body2" align="left">{asignee.lastName}</Typography>
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
    </Paper>
  )
}

export default Budget;
