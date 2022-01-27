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

const Budget = (props) => {
  const { budget } = props
  console.log(budget)
  const [asignee] = useState(budget.asignee)

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
                  {budget.budgetingTemplate.name}
                </Typography>
              </Grid>
              {
                budget.completedAt &&
                  <Grid item style={{ paddingLeft: "10px", paddingRight: "10px" }}>
                    <Box color="success.main">
                      <CheckCircleIcon/>
                    </Box>
                  </Grid>
              }
            </Grid>
            <Grid item container xs justifyContent='flex-end' alignItems='center' style={{ marginRight: "20px" }}>
              {budget.comments.length > 0 ? 
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
                  No. {budget.serialNumber.toString().padStart(10, "0")}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item container style={{ paddingBottom: "10px", paddingTop: "10px" }}>
            <Grid item container alignItems="center" xs stifyContent="center">
              <Grid item xs>
                <Typography color="primary">
                  <strong>Total:</strong> ${formatValue(budget.total)}
                </Typography>
              </Grid>
            </Grid>
            <Divider orientation="vertical" flexItem/>
            <Grid item container alignItems="center" xs justifyContent="center">
              <Grid item>
                <Typography color="secondary">
                  <strong>Saldo:</strong> ${formatValue(budget.totalDebt)}
                </Typography>
              </Grid>
            </Grid>
            <Divider orientation="vertical" flexItem/>
            <Grid item container alignItems="center" xs justifyContent="center">
              <Grid item>
                <Box color="success.main">
                  <Typography>
                    <strong>Ingresos:</strong> ${formatValue(budget.totalCredit)}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
            <Divider orientation="vertical" flexItem/>
            <Grid item container alignItems="center" xs justifyContent="center">
              <Grid item>
                <Typography>
                  <strong>Egresos:</strong> ${formatValue(budget.totalPaid)}
                </Typography>
              </Grid>
            </Grid>
            <Divider orientation="vertical" flexItem/>
            <Grid item container xs={3} alignItems='center' style={{ paddingLeft: "20px"}}>
              <Grid item>
                <Avatar alt={asignee} src={asignee && asignee.avatarThumbUrl}>{!asignee && "NA"}</Avatar>
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

export default Budget;
