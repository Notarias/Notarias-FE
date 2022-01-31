import React, { useState } from 'react'
import Grid                           from '@material-ui/core/Grid';
import Paper                          from '@material-ui/core/Paper';
import Typography                     from '@material-ui/core/Typography';
import Avatar                         from '@material-ui/core/Avatar';
import CheckCircleIcon                from '@material-ui/icons/CheckCircle';
import Box                            from '@material-ui/core/Box';
import IconButton                     from '@material-ui/core/IconButton';
import Divider                        from '@material-ui/core/Divider';
import MoreVertIcon                   from '@material-ui/icons/MoreVert';

export default (props) => {
  const { budget } = props
  
  const [asignee] = useState(budget.asignee)

  const formatValue = (value) => {
    return(((value * 1.0) / 100).toFixed(2))
  }

  return(
    <Grid item style={{ paddingBottom: "20px", paddingRight: "30px" }}>
      <Paper style={{ padding: "10px" }}>
        <Grid container direction='column' alignItems="stretch" justifyContent="flex-start">
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
            <Grid item container xs={4} justifyContent='flex-end' alignItems='center'>
              <Grid item>
                <Typography variant='subtitle2' color="secondary">
                  No. {budget.serialNumber.toString().padStart(10, "0")}
                </Typography>
              </Grid>
              <Grid item>
                <IconButton
                  aria-label="more"
                  aria-controls="long-menu"
                  aria-haspopup="true"
                >
                  <MoreVertIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
          <Grid item container  style={{ paddingBottom: "10px", paddingTop: "10px" }}>
            <Grid item container alignItems="center" xs={2}>
              <Grid item>
                <Typography color="primary">
                  <strong>Total:</strong> ${formatValue(budget.total)}
                </Typography>
              </Grid>
            </Grid>
            <Divider orientation="vertical" flexItem/>
            <Grid item container alignItems="center" xs={2} justifyContent="center">
              <Grid item>
                <Typography color="secondary">
                  <strong>Saldo:</strong> ${formatValue(budget.totalDebt)}
                </Typography>
              </Grid>
            </Grid>
            <Divider orientation="vertical" flexItem/>
            <Grid item container alignItems="center" xs={2} justifyContent="center">
              <Grid item>
                <Box color="success.main">
                  <Typography>
                    <strong>Ingresos:</strong> ${formatValue(budget.totalCredit)}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
            <Divider orientation="vertical" flexItem/>
            <Grid item container alignItems="center" xs={2} justifyContent="center">
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