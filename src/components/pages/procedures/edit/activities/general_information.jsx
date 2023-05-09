import React, {useState}           from 'react';
import Skeleton                    from '@material-ui/lab/Skeleton';
import Grid                        from '@material-ui/core/Grid';
import Typography                  from '@material-ui/core/Typography';
import Divider                     from '@material-ui/core/Divider';
import IconButton                  from '@material-ui/core/IconButton';
import Button                      from '@material-ui/core/Button';
import Badge                       from '@material-ui/core/Badge';
import Dialog                      from '@material-ui/core/Dialog';
import DialogTitle                 from '@material-ui/core/DialogTitle';
import DialogContent               from '@material-ui/core/DialogContent';
import Table                       from '@material-ui/core/Table';
import TableBody                   from '@material-ui/core/TableBody';
import TableCell                   from '@material-ui/core/TableCell';
import TableContainer              from '@material-ui/core/TableContainer';
import TableHead                   from '@material-ui/core/TableHead';
import TableRow                    from '@material-ui/core/TableRow';
import Paper                       from '@material-ui/core/Paper';
import OpenInNewIcon               from '@material-ui/icons/OpenInNew';
import Print                       from '@material-ui/icons/Print';
import ListAltIcon                 from '@material-ui/icons/ListAlt';
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

  const [array] = useState([1,2,3,4,5,6,7]);
  const budget = procedure.budgets[procedure.budgets.length - 1];
  const [budgetsDialog, setBudgetsDialog] = useState(false);

  const openBudgetsDialog = () => {
    setBudgetsDialog(!budgetsDialog)
  }

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
            <Grid container item xs={9} justifyContent='flex-start'>
              {procedure.budgets ?
                (
                  <Button style={{ padding: '10px' }} target='_blank'
                  href={procedure.budgets.length < 2 ? `/budgets/${budget.id}/edit` : false}
                  onClick={procedure.budgets.length < 2 ? null : openBudgetsDialog}>
                    <Grid item container alignItems="center" justifyContent='flex-start'>
                      <Grid item>
                        <Typography noWrap align='left' style={{ paddingRight: "10px", fontWeight: 600 }}>
                          {
                            procedure && procedure.budgetingTemplate.name
                          }
                        </Typography>
                      </Grid>
                      {procedure.budgets.length < 2 ?
                        (
                          <Grid item>
                            <OpenInNewIcon/>
                          </Grid> 
                        ) : (
                          <Grid item>
                            <Badge
                              badgeContent={procedure.budgets.length}
                              color="primary">
                              <ListAltIcon/>
                            </Badge>
                          </Grid> 
                        )
                      }
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
      <Dialog fullWidth open={budgetsDialog} onClose={openBudgetsDialog} maxWidth='sm'>
        <DialogTitle>
          Presupuestos Vinculados
        </DialogTitle>
        <Divider />
        <DialogContent>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="right">Serie No.</TableCell>
                  <TableCell align="right">No. Esc.</TableCell>
                  <TableCell align="right">No. Exp.</TableCell>
                  <TableCell>Plantilla</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {procedure.budgets.map((budget) => (
                  <TableRow key={`budget-${budget.id}`} hover>
                    <TableCell align="right">{budget.id}</TableCell>
                    <TableCell align="right">{budget.writingNumber}</TableCell>
                    <TableCell align="right">{budget.proceedingNumber}</TableCell>
                    <TableCell>{budget.budgetingTemplate.name}</TableCell>
                    <TableCell>
                      <IconButton target='_blank' href={`/budgets/${budget.id}/edit`}>
                        <OpenInNewIcon/>
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
      </Dialog>
    </Grid>
  )
}

export default GeneralInformation;
