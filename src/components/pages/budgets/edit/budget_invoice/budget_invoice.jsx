import React, {useEffect, useState}   from 'react';
import { withStyles }       from '@material-ui/core/styles';
import Grid                 from '@material-ui/core/Grid';
import Paper                from '@material-ui/core/Paper';
import Typography           from '@material-ui/core/Typography';
import Skeleton             from '@material-ui/lab/Skeleton';
import { useQuery }         from '@apollo/client';
import { styles }           from '../../styles';
import { GET_PRINT_BUDGET } from '../../queries_and_mutations/queries'
import Breadcrumbs          from '../../../../ui/breadcrumbs';
import Tab                  from './tab';
import ProcedureFields      from './procedure_fields';
import logo_notaria         from '../../../../../images/logo_notaria.JPG';
import { Button }           from '@material-ui/core';
import CloudDownloadIcon    from '@material-ui/icons/CloudDownload';
import { BASE_URI }         from '../../../../../apollo'


const months = [
  'Ene',
  'Feb',
  'Mar',
  'Abr',
  'May',
  'Jun',
  'Jul',
  'Ago',
  'Sept',
  'Oct',
  'Nov',
  'Dic'
]


const BudgetInvoice = (props) => {
  const { classes, match } = props
  const [open, setOpen]                           = useState(false)
  const [budget, setBudget]                       = useState()
  const [budgetingTemplate, setBudgetingTemplate] = useState()
  const [causant, setCausant]                     = useState()
  const [client, setClient]                       = useState()
  const [asignee, setAsignee]                     = useState()
  const [createdAt, setCreatedAt]                 = useState()
  const [tabs, setTabs]                           = useState()

  const { loading, data, refetch } = useQuery(
    GET_PRINT_BUDGET, { variables: { "id": match.params.id } }
  );

  useEffect(()=> {
    if(data && data.budget) {
      setBudget(data.budget)
    }
  }, [loading])

  useEffect(() => {
    if(budget) {
      setBudgetingTemplate(budget.budgetingTemplate);
      setCausant(budget.causant);
      setClient(budget.client);
      setAsignee(budget.asignee);
      setTabs(budget.tabs);
      setCreatedAt(new Date(budget.createdAt));
    }
  }, [budget])

  const BREADCRUMBS =  [
    { name: "Inicio", path: "/" },
    { name: "Presupuestos", path: '/budgets' },
    { name: "Editar", path: `/budgets/${ match.params.id}/edit` },
    { name: "Vista Previa", path: null }
  ]

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return(
    <>
    <Breadcrumbs breadcrumbs={ BREADCRUMBS }/>
    <Paper>
      <Grid container direction="column" justifyContent="center" alignItems="flex-end">
        <Grid item style={{ paddingLeft: '20px', paddingRight: '20px' }}>
          { 
            budget &&
            <Button
              href={`http://${BASE_URI}/invoices/${budget.id}.pdf?auth=${localStorage.getItem('jwtToken')}`}
              variant="contained"
              color="primary"
              target='_blank'
              startIcon={<CloudDownloadIcon />}
            >
              Descargar
            </Button>
          }
        </Grid>
      </Grid>
    </Paper>
    <Paper>
      <Grid container  direction='column' alignItems="center">
          <Grid item style={{ marginBottom: '30px' }}>
            <img className={classes.logoInInvoice} src={logo_notaria} alt="Logo"/>
          </Grid>
          <Grid container xs={8} item>
            <Grid container item xs={9} md={9} lg={9} direction="column">
              <Grid container item>
                <Grid item xs={2}>
                  <Typography style={{ fontWeight: 600 }} align='left'>Causante:</Typography>
                </Grid>
                <Grid item xs={10}>
                  { causant ? <Typography align='left'> { causant.fullName }</Typography> : <Skeleton variant="text" width="90%"/> }
                </Grid>
              </Grid>
              <Grid container item>
                <Grid item xs={2}>
                  <Typography style={{ fontWeight: 600 }} align='left'>Interesado:</Typography>
                </Grid>
                <Grid item xs={10}>
                  { client ? <Typography align='left'>{ client.fullName }</Typography> : <Skeleton variant="text" width="90%"/> }
                </Grid>
              </Grid>
              <Grid container item>
                <Grid item xs={2}>
                  <Typography style={{ fontWeight: 600 }} align='left'>Operación:</Typography>
                </Grid>
                <Grid item xs={10}>
                  { budgetingTemplate ? <Typography align='left'>{ budgetingTemplate.name }</Typography> : <Skeleton variant="text" width="90%"/> }
                </Grid>
              </Grid>
              <Grid container item>
                <Grid item xs={2}>
                  <Typography style={{ fontWeight: 600 }} align='left'>Encargado:</Typography>
                </Grid>
                <Grid item xs={10}>
                  { asignee ? <Typography align='left'>{ asignee.fullName }</Typography> : <Skeleton variant="text" width="90%"/> }
                </Grid>
              </Grid>
            </Grid>
            <Grid container item xs={1} direction="column" justifyContent="flex-start" alignItems="flex-start">
              <Typography style={{ fontWeight: 600 }} variant="button">Presupuesto:</Typography>
              <Typography style={{ fontWeight: 600 }} variant="button">Fecha:</Typography>
              <Typography style={{ fontWeight: 600 }} variant="button">Expediente:</Typography>
              <Typography style={{ fontWeight: 600 }} variant="button">Escritura:</Typography>
            </Grid>
            <Grid container item xs={2} direction="column" justifyContent="flex-start" alignItems="flex-start">
              <Grid item style={{ marginLeft: '10px' }}>
                { budget ? <Typography align='left'>{ budget.serialNumber }</Typography> : <Skeleton variant="text" width="90%"/> }
              </Grid>
              <Grid item style={{ marginLeft: '10px' }}>
                { budget ? <Typography align='left'>{ createdAt && `${createdAt.getDay() }/${months[createdAt.getMonth()]}/${createdAt.getFullYear()}` }</Typography> : <Skeleton variant="text" width="90%"/> }
              </Grid>
              <Grid item style={{ marginLeft: '10px' }}>
                { budget ? <Typography align='left'>{ budget.proceedingNumber }</Typography> : <Skeleton variant="text" width="90%"/> }
              </Grid>
              <Grid item style={{ marginLeft: '10px' }}>
                { budget ? <Typography align='left'>{ budget.deedNumber }</Typography> : <Skeleton variant="text" width="90%"/> }
              </Grid>
            </Grid>
          </Grid>
          {/* <Grid container item direction="row">
            <Grid container item xs={1}>
            </Grid>
            <Grid 
              container 
              item 
              xs={7} 
              direction="column" 
              justifyContent="flex-start" 
              alignItems="flex-start" 
              className={classes.marginTopGridInvoice}
            >
              <Typography variant="button">Valor de contraprestación:</Typography>
              <Typography variant="button">Valor de Avalúo:</Typography>
              <Typography variant="button">Valor de terreno:</Typography>
              <Typography variant="button">Valor de las construcciones:</Typography>
              <Typography variant="button">Base para crédito:</Typography>
            </Grid>
            <Grid 
              container 
              item 
              xs={4}
              direction="column" 
              justifyContent="flex-start" 
              alignItems="flex-start"
              className={classes.marginTopGridInvoice}
            >
              <Typography >$ 0.00</Typography>
              <Typography >$ 0.00</Typography>
              <Typography >$ 0.00</Typography>
              <Typography >$ 0.00</Typography>
              <Typography >$ 0.00</Typography>
            </Grid>
          </Grid> */}
          <Grid container item xs={8} >
            { budget && <ProcedureFields key={`${budget.id}-budget`} budget={budget}/> }
          </Grid>
          <Grid container item xs={8} className={classes.marginTopGridInvoice}>
            <Grid
              item 
              xs={6} 
            >
              <Typography variant='h5' align='left'>CONCEPTO:</Typography>
            </Grid>
            <Grid
              item 
              xs={6} 
            >
              <Typography variant='h5' align='right'>CANTIDAD:</Typography>
            </Grid>
          </Grid>
          <Grid container item xs={8} direction="column">
            {
              tabs && tabs.map((tab) => {
                return(
                  <Tab key={`${tab.id}-tab-invoice-information`} tab={tab} budget={budget}/>
                )
              })
            }
          </Grid>
          <Grid container item xs={8} style={{ marginTop: "20px" }}>
            <Grid item xs={6}>
              <Typography align='left' variant='h6'>Gran Total</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography align='right' variant='h6'>
                { budget && ((budget.totalDebt * 1.0) / 100).toFixed(2) }
              </Typography>
            </Grid>
          </Grid>
          <Grid container item xs={8} direction="row">
            <Grid
              container 
              item 
              xs={5} 
              direction="column" 
              justifyContent="flex-start" 
              alignItems="flex-start"
            >
              <Typography variant="subtitle2"> Cuenta: 0108511160 </Typography>
              <Typography variant="subtitle2"> CLABE: 012694001085111605 </Typography>
              <Typography variant="subtitle2"> Titular: JOSE ALFREDO ASUNCIO MARTIN VILLANUEVA </Typography>
              <Typography variant="subtitle2"> Bancomer: BBVA Bancomer. </Typography>
              <Typography variant="subtitle2"> Swif: BCMRMXMMPYM </Typography>
              <Typography variant="subtitle2"> Dirección: Av. Paseo de la Reforma 510, Col. Juárez, </Typography>
              <Typography variant="subtitle2"> C.P. 06600, Delegación Cuauhtémoc, D.F.</Typography>
            </Grid>
            <Grid
              container 
              item 
              xs={5} 
              direction="column" 
              justifyContent="flex-start" 
              alignItems="flex-start"
            >
              <Typography variant="subtitle2"> Cuenta: 0108764492 </Typography>
              <Typography variant="subtitle2">  CLABE: 012691001087644924 </Typography>
              <Typography variant="subtitle2"> Titular: CORPORATIVO N48, S.C. </Typography>
              <Typography variant="subtitle2"> Bancomer: BBVA Bancomer. </Typography>
              <Typography variant="subtitle2"> Swif: BCMRMXMMPYM </Typography>
              <Typography variant="subtitle2"> Dirección: Av. Paseo de la Reforma 510, Col. Juárez,</Typography>
              <Typography variant="subtitle2"> C.P. 06600, Delegación Cuauhtémoc, D.F. </Typography>
            </Grid>
          </Grid>
          <Grid container item xs={8} direction="row" className={classes.marginTopGridInvoice}>
            <Grid
              container
              item
              xs={11}
              direction="column" 
              justifyContent="flex-start" 
              alignItems="flex-start"
            >
              <h3 className={classes.honorariumGrid}>Observaciones:</h3>
              <Typography variant="subtitle2"> 
                Honorarios calculados de acuerdo al Arancel de Notarios para el estado de Quintana Roo publicado 
                  en el Periódico Oficial del Estado el 9 de octubre de 2013. 
              </Typography>
            </Grid>
          </Grid>
      </Grid>
    </Paper>
    </>
  )
}

export default withStyles(styles)(BudgetInvoice);
