import React                          from 'react'
import Grid                           from '@material-ui/core/Grid';
import Paper                          from '@material-ui/core/Paper';
import Typography                     from '@material-ui/core/Typography';
import Avatar                         from '@material-ui/core/Avatar';
import CheckCircleIcon                from '@material-ui/icons/CheckCircle';
import CancelIcon                     from '@material-ui/icons/Cancel';
import Box                            from '@material-ui/core/Box';
import Divider                        from '@material-ui/core/Divider';
import Tooltip                        from '@material-ui/core/Tooltip';
import VisibilityIcon                 from '@material-ui/icons/Visibility';
import IconButton                     from '@material-ui/core/IconButton';
import { Link }                       from 'react-router-dom';

const CreditPayment = (props) => {
  const { creditPayment } = props

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
      `${date < 10 ? `0${date}` : `${date}`}${separator}${month < 10 ? `0${month}` : `${month}`}${separator}${year} - ${hours < 10 ? `0${hours}` : `${hours}`}:${minutes < 10 ? `0${minutes}` : `${minutes}`}`
    )
  }

  return(
    <Paper style={{ padding: "10px" }}>
      <Grid item container justifyContent="flex-start">
        <Grid item container>
          <Grid item container xs={8} justifyContent='flex-start' alignItems='center'>
            <Grid item style={{marginLeft: "20px"}}>
              <Typography variant='h6'>
                {`Presupuesto: ${creditPayment.budget.budgetingTemplate.name} - ${creditPayment.note}`}
              </Typography>
            </Grid>
            {!!creditPayment.voidAt ?
              <>
                <Grid item style={{ paddingLeft: "10px", paddingRight: "10px" }}>
                  <Box color="error.main">
                    <CancelIcon/>
                  </Box>
                </Grid>
                <Grid item style={{ paddingLeft: "10px", paddingRight: "10px" }}>
                  <Typography variant='h6' color="secondary">
                    <strong>Movimiento Cancelado </strong>
                  </Typography>
                </Grid>
                <Grid item style={{ paddingLeft: "10px", paddingRight: "10px" }}>
                  <Typography variant='h6' color="secondary">
                    {buildDate(creditPayment.voidAt)}
                  </Typography>
                </Grid>
              </>
            :
              <Grid item style={{ paddingLeft: "10px", paddingRight: "10px" }}>
                <Box color="success.main">
                  <CheckCircleIcon/>
                </Box>
              </Grid>
            }
          </Grid>
          <Grid item container xs justifyContent='flex-end' alignItems='center' style={{ marginRight: "20px" }}>
            <Grid item>
              <Link to={`/budgets/${creditPayment.budget.id}/edit`}>
                <Tooltip title='Ver Presupuesto'>
                  <IconButton>
                    <VisibilityIcon />
                  </IconButton>
                </Tooltip>
              </Link>
            </Grid>
            <Grid item>
              <Typography variant='subtitle2' color="secondary">
                No. {creditPayment.id.toString().padStart(10, "0")}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item container style={{ paddingBottom: "10px", paddingTop: "10px" }}>
        <Grid item container alignItems="center" xs justifyContent="center">
            <Grid item>
              <Typography>
                <strong>Tramite:</strong>
              </Typography>
              <Typography>
                {creditPayment.budget.proceduresTemplate.name}
              </Typography>
            </Grid>
          </Grid>
          <Divider orientation="vertical" flexItem/>
          <Grid item container alignItems="center" xs justifyContent="center">
            <Grid item xs>
              <Typography color="primary">
                <strong>Monto: </strong>
              </Typography>
              <Typography color="primary">
                {`$${formatValue(creditPayment.total)}`}
              </Typography>
            </Grid>
          </Grid>
          <Divider orientation="vertical" flexItem/>
          <Grid item container alignItems="center" xs justifyContent="center">
            <Grid item>
              <Typography color="primary">
                <strong>Tipo de Pago: </strong>
              </Typography>
              <Typography color="primary">
                {creditPayment.paymentType}
              </Typography>
            </Grid>
          </Grid>
          <Divider orientation="vertical" flexItem/>
          <Grid item container alignItems="center" xs justifyContent="center">
            <Grid item>
              <Typography>
                <strong>Fecha de Ingreso:</strong>
              </Typography>
              <Typography>
                {buildDate(creditPayment.createdAt)}
              </Typography>
            </Grid>
          </Grid>
          <Divider orientation="vertical" flexItem/>
          <Grid item container alignItems="center" xs justifyContent="center">
            <Grid item>
              <Typography>
                <strong>Cliente: </strong>
              </Typography>
              <Typography>
                {creditPayment.budget.client.fullName}
              </Typography>
            </Grid>
          </Grid>
          <Divider orientation="vertical" flexItem/>
          <Grid item container xs alignItems='center' style={{ paddingLeft: "10px"}}>
            <Grid item container alignItems="center">
              <Typography>
                <strong>Encargado: </strong>
              </Typography>
              {creditPayment.budget.asignee ?
                <Grid item container direction="row" spacing={1} alignItems="center">
                  <Grid item>
                    <Avatar alt={creditPayment.budget.asignee.fullName} src={creditPayment.budget.asignee.avatarThumbUrl}/>
                  </Grid>
                  <Grid item>
                    <Typography variant="body2" align="left">{creditPayment.budget.asignee.firstName}</Typography>
                    <Typography variant="body2" align="left">{creditPayment.budget.asignee.lastName}</Typography>
                  </Grid>
                </Grid>
              :
                <Typography>
                  Sin Encargado Asignado
                </Typography>
              }
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default CreditPayment;
