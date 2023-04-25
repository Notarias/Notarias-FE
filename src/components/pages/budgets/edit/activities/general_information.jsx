import React, {useState}           from 'react';
import Skeleton                    from '@material-ui/lab/Skeleton';
import Grid                        from '@material-ui/core/Grid';
import Hidden                      from '@material-ui/core/Hidden';
import Typography                  from '@material-ui/core/Typography';
import Divider                     from '@material-ui/core/Divider';
import IconButton                  from '@material-ui/core/IconButton';
import Button                      from '@material-ui/core/Button';
import Print                       from '@material-ui/icons/Print';
import VisibilityIcon              from '@material-ui/icons/Visibility';
import Tooltip                     from '@material-ui/core/Tooltip';
import OpenInNewIcon               from '@material-ui/icons/OpenInNew';
import { Link }                    from 'react-router-dom';
import AsigneesList                from '../asignees_list';
import Reporter                    from '../reporter';
import BudgetActionsMenu           from './budget_actions_menu';
import BudgetFileUploader          from './budget_file_uploader';
import { BASE_URI }                from '../../../../../apollo';
import ProceedingNumber            from './proceeding_number';
import WritingNumber               from './writing_number';
import CompleteBudgetButton        from './complete_budget_button';
import NewBudgetButton             from './new_budget_button';

export default (props) => {

  const { budget, loadingBudget } = props

  const [array] = useState([1,2,3,4,5,6,7,8,9])
  const procedure = budget.procedures[budget.procedures.length - 1]

  return(
    <Grid container item alignItems="center">
      { loadingBudget || !budget ? 
        <Grid container item direction='column' alignItems='stretch'>
          <Grid container item direction='row' justifyContent='flex-end' spacing={1}>
            <Grid container item xs justifyContent='flex-end'>
              <Skeleton variant="rect" width={65} height={50} style={{marginRight: '10px'}}/>
              <Skeleton variant="circle" width={50} height={50} style={{marginRight: '10px'}}/>
              <Skeleton variant="circle" width={50} height={50} style={{marginRight: '10px'}}/>
              <Skeleton variant="circle" width={50} height={50} style={{marginRight: '10px'}}/>
              <Skeleton variant="circle" width={50} height={50} style={{marginRight: '10px'}}/>
              <Skeleton variant="circle" width={50} height={50}/>
            </Grid>
          </Grid>
          <Divider/>
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
          <Hidden mdDown>
            <Grid item container xs={12} style={{ padding: "0" }} justifyContent='flex-end' alignItems='center'>
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
                <CompleteBudgetButton budget={budget}/>
              </Grid>
              <Grid item>
                <NewBudgetButton budget={budget}/>
              </Grid>
              <Grid item>
                <BudgetActionsMenu budget={budget}/>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Divider/>
            </Grid>
          </Hidden>
          <Grid container item xs={12} alignItems='center'>
            <Hidden mdDown>
              <Grid item xs={3}>
                <Typography align='left'>Encargado:</Typography>
              </Grid>
            </Hidden>
            <Grid item xs>
              <AsigneesList
                asigneeData={budget && budget.asignee}
                budget={budget}
              />
            </Grid>
          </Grid>
          <Grid container item xs={12} alignItems='center'>
            <Hidden mdDown>
              <Grid item xs={3}>
                <Typography align='left'>Reportador:</Typography>
              </Grid>
            </Hidden>
            <Grid item xs>
              <Reporter
                reporterData={budget && budget.reporter}
                budget={budget}
              />
            </Grid>
          </Grid>
          <Grid container item xs={12} alignItems='center'>
            <Hidden mdDown>
              <Grid item xs={3}>
                <Typography align='left'>Cliente:</Typography>
              </Grid>
            </Hidden>
            <Grid item xs>
              <Typography noWrap align='left' style={{ padding: '10px', textTransform: 'uppercase' }}>
                <strong>{ budget && budget.client.firstName } { budget && budget.client.lastName }</strong>
              </Typography>
            </Grid>
          </Grid>
          <Grid container item xs={12} alignItems='center'>
            <Hidden mdDown>
              <Grid item xs={3}>
                <Typography align='left'>Despacho Solicitante:</Typography>
              </Grid>
            </Hidden>
            <Grid item xs>
              <Typography noWrap align='left' style={{ padding: '10px', textTransform: 'uppercase' }}>
                <strong>{ budget && budget.attorney.firstName } { budget && budget.attorney.lastName }</strong>
              </Typography>
            </Grid>
          </Grid>
          <Grid container item xs={12} alignItems='center'>
            <Hidden mdDown>
              <Grid item xs={3}>
                <Typography align='left'>Presupuesto:</Typography>
              </Grid>
            </Hidden>
            <Grid item xs>
              <Typography noWrap align='left' style={{ padding: '10px', textTransform: 'uppercase' }}>
                <strong>{ budget && budget.budgetingTemplate.name }</strong>
              </Typography>
            </Grid>
          </Grid>
          <Grid container item xs={12} alignItems='center'>
            <Hidden mdDown>
              <Grid item xs={3}>
                <Typography align='left'>Presupuesto No.</Typography>
              </Grid>
            </Hidden>
            <Grid item xs>
              <Typography noWrap align='left' style={{ padding: '10px', textTransform: 'uppercase' }}>
                <strong>{ budget && budget.serialNumber.toString().padStart(10, "0") }</strong>
              </Typography>
            </Grid>
          </Grid>
          <Grid container item xs={12} alignItems='center'>
            <Hidden mdDown>
              <Grid item xs={3}>
                <Typography align='left'>Trámite:</Typography>
              </Grid>
            </Hidden>
            <Grid item xs>
              {
                budget.procedures ?
                  (
                    <Button fullWidth style={{ padding: '10px' }} target='_blank' href={`/procedures/${procedure.id}/edit`}>
                      <Grid container alignItems="center" justifyContent='flex-start'>
                        <Grid item>
                          <Typography noWrap align='left' style={{ paddingRight: "10px", fontWeight: 600 }}>
                            {
                              budget && budget.proceduresTemplate.name
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
                      <strong>{ budget && budget.proceduresTemplate.name }</strong>
                    </Typography>
                  )
              }
            </Grid>
          </Grid>
          <Grid container item xs={12} alignItems='center'>
            <Hidden mdDown>
              <Grid item xs={3}>
                <Typography align='left'>Trámite No.</Typography>
              </Grid>
            </Hidden>
            <Grid item xs>
              <Typography noWrap align='left' style={{ padding: '10px', textTransform: 'uppercase' }}>
                <strong>{ procedure && procedure.serialNumber.toString().padStart(10, "0") }</strong>
              </Typography>
            </Grid>
          </Grid>
          <ProceedingNumber budget={budget}/>
          <WritingNumber budget={budget}/>
        </>
      }
    </Grid>
  )
}
