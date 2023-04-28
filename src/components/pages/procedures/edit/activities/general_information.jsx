import React, {useState}           from 'react';
import Skeleton                    from '@material-ui/lab/Skeleton';
import Grid                        from '@material-ui/core/Grid';
import Typography                  from '@material-ui/core/Typography';
import Divider                     from '@material-ui/core/Divider';
import IconButton                  from '@material-ui/core/IconButton';
import Print                       from '@material-ui/icons/Print';
import Button                      from '@material-ui/core/Button';
import OpenInNewIcon               from '@material-ui/icons/OpenInNew';
import { Link }                    from 'react-router-dom';
import Asignee                     from '../asignee';
import Reporter                    from '../reporter';
import ProcedureFileUploader       from './procedure_file_uploader';
import ProcedureActions            from './procedure_actions';
import ProceedingNumber            from './proceeding_number';
import WritingNumber               from './writing_number';
import CompleteProcedure           from './complete_procedure';
import NewBudgetButton             from './new_budget_button';

 const GeneralInformation = (props) => {

  const { procedure, loadingProcedure } = props

  const [array] = useState([1,2,3,4,5,6,7])
  const budget = procedure.budgets[procedure.budgets.length - 1]

  return(
    <Grid container item alignItems="center">
      { loadingProcedure || !procedure ? 
        <Grid container item direction='column' alignItems='stretch'>
          <Grid container item direction='row' justifyContent='flex-end' spacing={1}>
            <Grid container item xs justifyContent='flex-end'>
              <Skeleton variant="circle" width={50} height={50} style={{marginRight: '10px'}}/>
              <Skeleton variant="circle" width={50} height={50} style={{marginRight: '10px'}}/>
              <Skeleton variant="circle" width={50} height={50} style={{marginRight: '10px'}}/>
              <Skeleton variant="circle" width={50} height={50}/>
            </Grid>
          </Grid>
          <Divider style={{marginTop: '15px', marginBottom: '15px'}}/>
          <Grid container item direction='row' spacing={2}>
            { array.map( (index) => {
              return(
                <React.Fragment key={index + '-audit-log'}>
                  <Grid item xs={4}>
                    <Skeleton variant="rect" width="100%" height={40}/>
                  </Grid>
                  <Grid item xs={8}>
                    <Skeleton variant="rect" width='70%' height={40}/>
                  </Grid>
                </React.Fragment>
              )}
            )}
          </Grid>
        </Grid>
      :
        <>
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
              <CompleteProcedure procedure={procedure}/>
            </Grid>
            <Grid item>
              <NewBudgetButton procedure={procedure} budgetId={budget.id}/>
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
          <Grid container item xs={12} alignItems='center'>
            <Grid item xs={3}>
              <Typography align='left'>Cliente:</Typography>
            </Grid>
            <Grid item xs={9}>
              <Typography noWrap align='left' style={{ padding: '10px', textTransform: 'uppercase' }}>
                <strong>{ procedure && procedure.client.firstName } { procedure && procedure.client.lastName }</strong>
              </Typography>
            </Grid>
          </Grid>
          <Grid container item xs={12} alignItems='center'>
            <Grid item xs={3}>
              <Typography align='left'>Despacho Solicitante:</Typography>
            </Grid>
            <Grid item xs={9}>
              <Typography noWrap align='left' style={{ padding: '10px', textTransform: 'uppercase' }}>
                <strong>{ procedure && procedure.attorney.firstName } { procedure && procedure.attorney.lastName }</strong>
              </Typography>
            </Grid>
          </Grid>
          <Grid container item xs={12} alignItems='center'>
            <Grid item xs={3}>
              <Typography align='left'>Presupuesto:</Typography>
            </Grid>
            <Grid item xs={9}>
              {
                procedure.budgets ?
                  (
                    <Button fullWidth style={{ padding: '10px' }} target='_blank' href={`/budgets/${budget.id}/edit`}>
                      <Grid container alignItems="center" justifyContent='flex-start'>
                        <Grid item>
                          <Typography noWrap align='left' style={{ paddingRight: "10px", fontWeight: 600 }}>
                            {
                              procedure && procedure.budgetingTemplate.name
                            }
                          </Typography>
                        </Grid>
                        <Grid item>
                          <OpenInNewIcon/>
                        </Grid> 
                      </Grid>
                    </Button>
                  ) : (
                    <Typography noWrap align='left' style={{ padding: '10px', textTransform: 'uppercase' }}>
                      <strong>{ procedure && procedure.budgetingTemplate.name }</strong>
                    </Typography>
                  )
              }
            </Grid>
          </Grid>
          <Grid container item xs={12} alignItems='center'>
            <Grid item xs={3}>
              <Typography align='left'>Trámite:</Typography>
            </Grid>
            <Grid item xs={9}>
              <Typography noWrap align='left' style={{ padding: '10px', textTransform: 'uppercase' }}>
                <strong>{ procedure && procedure.proceduresTemplate.name }</strong>
              </Typography>
            </Grid>
          </Grid>
          <ProceedingNumber
            procedure={procedure}
            budget={budget}
          />
          <WritingNumber
            procedure={procedure}
            budget={budget}
          />
        </>
      }
    </Grid>
  )
}

export default GeneralInformation;
