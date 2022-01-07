import React, { useState, useEffect } from 'react';
import Grid                 from '@material-ui/core/Grid';
import Typography           from '@material-ui/core/Typography';
import Divider              from '@material-ui/core/Divider';
import IconButton           from '@material-ui/core/IconButton';
import Button               from '@material-ui/core/Button';
import Print                from '@material-ui/icons/Print';
import VisibilityIcon       from '@material-ui/icons/Visibility';
import Tooltip              from '@material-ui/core/Tooltip';
import { Link }             from 'react-router-dom';
import Asignee              from '../asignee';
import Reporter             from '../reporter';
import BudgetActions        from './budget_actions';
import BudgetFileUploader   from './budget_file_uploader';
import PaymentDrawer        from '../payment_drawer';
import { BASE_URI }         from '../../../../../apollo'
import { useQuery }         from '@apollo/client';

export default (props) => {

  const { budget } = props

  return(
    <Grid container item alignItems="center" spacing={3}>
      <Grid item container xs={12} style={{ padding: "0" }} justifyContent='flex-end' alignItems='center' spacing={2}>
        <Grid item>
          <Tooltip title="Imprimir">
            <Button
              href={`http://${BASE_URI}/invoices/${budget.id}.pdf?auth=${localStorage.getItem('jwtToken')}`}
              variant="contained"
              color="primary"
              target='_blank'
            >
              <Print />
            </Button>
          </Tooltip>
        </Grid>
        <Grid item>
          <Tooltip title="Vista Previa">
            <Link
              to={`/budgets/${ budget.id }/invoice`}
              color="inherit"
              underline="none"
              key="3-paymentList"
            >
              <IconButton color="default" >
                <VisibilityIcon/>
              </IconButton>
            </Link>
          </Tooltip>
        </Grid>
        <Grid item>
          <BudgetFileUploader budget={budget}/>
        </Grid>
        <Grid item>
          <PaymentDrawer budget={budget}/>
        </Grid>
        <Grid item>
          <BudgetActions budget={budget}/>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Divider/>
      </Grid>
      <Grid container item xs={12} alignItems='center'>
        <Grid item xs={3}>
          <Typography align='left'>Encargado:</Typography>
        </Grid>
        <Grid item xs={9}>
          <Asignee
            asigneeData={budget && budget.asignee}
            budget={budget}
          />
        </Grid>
      </Grid>
      <Grid container item xs={12} alignItems='center'>
        <Grid item xs={3}>
          <Typography align='left'>Reportador:</Typography>
        </Grid>
        <Grid container item xs={9}>
          <Reporter
            reporterData={budget && budget.reporter}
            budget={budget}
          />
        </Grid>
      </Grid>
      <Grid container item xs={12} alignItems='center' alignItems='center'>
        <Grid item xs={3}>
          <Typography align='left'>Cliente:</Typography>
        </Grid>
        <Grid item xs={9}>
          <Typography noWrap align='left' style={{ padding: '10px' }}>
            <strong>{ budget && budget.client.firstName } { budget && budget.client.lastName }</strong>
          </Typography>
        </Grid>
      </Grid>
      <Grid container item xs={12} alignItems='center' alignItems='center'>
        <Grid item xs={3}>
          <Typography align='left'>Presupuesto:</Typography>
        </Grid>
        <Grid item xs={9}>
          <Typography noWrap align='left' style={{ padding: '10px' }}>
            <strong>{ budget && budget.budgetingTemplate.name }</strong>
          </Typography>
        </Grid>
      </Grid>
      <Grid container item xs={12} alignItems='center' alignItems='center'>
        <Grid item xs={3}>
          <Typography align='left'>Trámite:</Typography>
        </Grid>
        <Grid item xs={9}>
          <Typography noWrap align='left' style={{ padding: '10px' }}>
            <strong>{ budget && budget.proceduresTemplate.name }</strong>
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  )
}
