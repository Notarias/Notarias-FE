import React, { useState, useEffect } from 'react';
import Grid                 from '@material-ui/core/Grid';
import Typography           from '@material-ui/core/Typography';
import Divider              from '@material-ui/core/Divider';
import IconButton           from '@material-ui/core/IconButton';
import Print                from '@material-ui/icons/Print';
import { Link }             from 'react-router-dom';
import Asignee              from '../asignee';
import Reporter             from '../reporter';
import ProcedureFileUploader   from './procedure_file_uploader';
import ProcedureActions from './procedure_actions';

export default (props) => {

  const { procedure } = props

  return(
    <Grid container item alignItems="center" spacing={3}>
      <Grid item container xs={12} style={{ padding: "0" }} justifyContent='flex-end' alignItems='center' spacing={2}>
        <Grid item>
          <Link
            to={`/procedures/${ procedure.id }/invoice`}
            color="inherit"
            underline="none"
            key="3-paymentList"
          >
            <IconButton>
              <Print/>
            </IconButton>
          </Link>
        </Grid>
        <Grid item>
          <ProcedureFileUploader procedure={procedure}/>
        </Grid>
        <Grid item>
          <ProcedureActions procedure={procedure}/>
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
            asigneeData={procedure && procedure.asignee}
            procedure={procedure}
          />
        </Grid>
      </Grid>
      <Grid container item xs={12} alignItems='center'>
        <Grid item xs={3}>
          <Typography align='left'>Reportador:</Typography>
        </Grid>
        <Grid container item xs={9}>
          <Reporter
            reporterData={procedure && procedure.reporter}
            procedure={procedure}
          />
        </Grid>
      </Grid>
      <Grid container item xs={12} alignItems='center' alignItems='center'>
        <Grid item xs={3}>
          <Typography align='left'>Cliente:</Typography>
        </Grid>
        <Grid item xs={9}>
          <Typography noWrap align='left' style={{ padding: '10px' }}>
            <strong>{ procedure && procedure.client.firstName } { procedure && procedure.client.lastName }</strong>
          </Typography>
        </Grid>
      </Grid>
      <Grid container item xs={12} alignItems='center' alignItems='center'>
        <Grid item xs={3}>
          <Typography align='left'>Presupuesto:</Typography>
        </Grid>
        <Grid item xs={9}>
          <Typography noWrap align='left' style={{ padding: '10px' }}>
            <strong>{ procedure && procedure.budgetingTemplate.name }</strong>
          </Typography>
        </Grid>
      </Grid>
      <Grid container item xs={12} alignItems='center' alignItems='center'>
        <Grid item xs={3}>
          <Typography align='left'>Trámite:</Typography>
        </Grid>
        <Grid item xs={9}>
          <Typography noWrap align='left' style={{ padding: '10px' }}>
            <strong>{ procedure && procedure.proceduresTemplate.name }</strong>
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  )
}
