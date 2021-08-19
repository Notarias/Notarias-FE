import React, {useEffect}   from 'react';
import { withStyles }       from '@material-ui/core/styles';
import { styles }           from '../../styles';
import Dialog               from '@material-ui/core/Dialog';
import DialogActions        from '@material-ui/core/DialogActions';
import DialogContent        from '@material-ui/core/DialogContent';
import DialogTitle          from '@material-ui/core/DialogTitle';
import Grid                 from '@material-ui/core/Grid';
import Paper                from '@material-ui/core/Paper';
import Typography           from '@material-ui/core/Typography';
import logo_notaria         from '../../../../../images/logo_notaria.JPG'
import TextField            from '@material-ui/core/TextField';
import Button               from '@material-ui/core/Button';
import { useQuery }         from '@apollo/react-hooks';
import { GET_BUDGET }       from '../../queries_and_mutations/queries'
import NumberFormat         from 'react-number-format';
import Breadcrumbs          from '../../../../ui/breadcrumbs';
import TabSeccion           from './tab_seccion';


const BudgetInvoice = (props) => {
  const { classes, match } = props
  const [open, setOpen] = React.useState(false)

  let variables = {"id": match.params.id} 

  const { loading, data, refetch } = useQuery(
    GET_BUDGET, { variables: variables, fetchPolicy: "no-cache" }
  );

  
  const budget                          = data && data.budget
  const budgetId                        = data && data.budget.budgetingTemplate.id

  useEffect(()=> {
    refetch(variables);
  }, [data])

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

  // const renderFieldsInfo = () => {
  //   return(
  //     budget && budget.fieldValues.map((toPrint) => {
  //       if(toPrint.value !== 0){

  //         return(
  //           <Grid container item direction="row" key={toPrint.id + "values"}>
  //             <Grid item xs={1}></Grid>
  //             <Grid
  //               container 
  //               item 
  //               xs={7}
  //             >
  //               <Typography> {toPrint.field ? toPrint.field.name : "sin Nombre"} </Typography>
  //             </Grid>
  //             <Grid
  //               container 
  //               item 
  //               xs={4}
  //             >
  //               <Typography gutterBottom>
  //                 <NumberFormat 
  //                   value={toPrint.value / 100} 
  //                   displayType={'text'} 
  //                   thousandSeparator={true} 
  //                   prefix={'$ '}
  //                   decimalScale={2}
  //                 />
  //               </Typography>
  //             </Grid>
  //           </Grid>
  //         )}
  //       }
  //     )
  //   )
  // }

  return(
    <>
    <Breadcrumbs breadcrumbs={ BREADCRUMBS }/>
    <Paper>
      <Grid container>
          <Grid container item justifyContent="center" alignItems="center">
            <img className={classes.logoInInvoice} src={logo_notaria} alt="Logo"/>
          </Grid>
          <Grid container item direction="row" className={classes.marginTopGridInvoice}>
            <Grid container item xs={1} direction="column" justifyContent="flex-end" alignItems="flex-end">

            </Grid>
            <Grid container item xs={1} direction="column" justifyContent="flex-start" alignItems="flex-start">
              <Typography variant="button">Causante:</Typography>
              <Typography variant="button">Interesado:</Typography>
              <Typography variant="button">Operación:</Typography>
              <Typography variant="button">Abogado:</Typography>
            </Grid>
            <Grid container item xs={6} direction="column" justifyContent="flex-start" alignItems="flex-start">
              <Typography>Alguien apellio apellido</Typography>
              <Typography>Alguien apellio apellido</Typography>
              <Typography>Alguien apellio apellido</Typography>
              <Typography>Alguien apellio apellido</Typography>
            </Grid>
            <Grid container item xs={1} direction="column" justifyContent="flex-start" alignItems="flex-start">
              <Typography variant="button">Presupuesto:</Typography>
              <Typography variant="button">Fecha:</Typography>
              <Typography variant="button">Expediente:</Typography>
              <Typography variant="button">Escritura:</Typography>
            </Grid>
            <Grid container item xs={3} direction="column" justifyContent="flex-start" alignItems="flex-start">
              <Typography>0000</Typography>
              <Typography>00/00/0000</Typography>
              <Typography>0000</Typography>
              <Typography>0000</Typography>
            </Grid>
          </Grid>
          <Grid container item direction="row">
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
          </Grid>
          <Grid container item direction="row">
            <Grid container item xs={1}>

            </Grid>
            <Grid
              container 
              item 
              xs={1} 
              direction="column" 
              justifyContent="flex-start" 
              alignItems="flex-start" 
            >
              <Typography variant="button">Imueble:</Typography>
            </Grid>
            <Grid
              container 
              item 
              xs={5} 
              direction="column" 
              justifyContent="flex-start" 
              alignItems="flex-start"
            >
              <a href="#" onClick={handleClickOpen}>
                <Typography>
                  Agregar a ficha. En este espacio se pondría la descripción del inmueble 
                    (Ej. Departamento 205 condominio Las Flores, Tulum, Q. Roo)
                </Typography>
              </a>
              <Dialog open={open} onClose={handleClose} fullWidth>
                <DialogTitle>
                  Datos del inmueble
                </DialogTitle>
                <DialogContent>
                  <TextField
                    // onChange={handleValuePaymentChange}
                    label="Rellenar campo"
                    id="margin-normal"
                    helperText="Descripción del inmueble"
                    margin="normal"
                    fullWidth
                    variant="outlined"
                  />
                </DialogContent>
                <DialogActions>
                  <Button>
                    Cancelar
                  </Button>
                  <Button>
                    Aceptar
                  </Button>
                </DialogActions>
              </Dialog>
            </Grid>
          </Grid>
          <Grid container item direction="row" className={classes.marginTopGridInvoice}>
            <Grid container item xs={1}></Grid>
            <Grid
              container 
              item 
              xs={7} 
              direction="column" 
              justifyContent="flex-start" 
              alignItems="flex-start"
            >
              <h3>CONCEPTO:</h3>
            </Grid>
            <Grid
              container 
              item 
              xs={4} 
              direction="column" 
              justifyContent="flex-start" 
              alignItems="flex-start"
            >
              <h3>CANTIDAD:</h3>
            </Grid>
          </Grid>
          {/* {renderFieldsInfo()} */}
          <Grid container item direction="row">
            

            <TabSeccion
              budgetId={budgetId}
              budget={budget}
            />

          </Grid>
          <Grid container item direction="row">
            <Grid container item xs={1}></Grid>
            <Grid
              container 
              item 
              xs={8} 
              direction="column" 
              justifyContent="flex-start" 
              alignItems="flex-start"
            >
              <h2 >Gran Total</h2>
            </Grid>
            <Grid
              container 
              item 
              xs={3} 
              direction="column" 
              justifyContent="flex-start" 
              alignItems="flex-start"
            >
              <h2 >
                <NumberFormat 
                  value={budget && budget.total / 100} 
                  displayType={'text'} 
                  thousandSeparator={true} 
                  prefix={'$ '}
                  decimalScale={2}
                />
              </h2>
            </Grid>
          </Grid>


          <Grid container item direction="row">
            <Grid container item xs={1}></Grid>
            <Grid
              container 
              item 
              xs={5} 
              direction="column" 
              justifyContent="flex-start" 
              alignItems="flex-start"
            >
             <h2 >TOTAL DE GASTOS, DERECHOS E IMPUESTOS</h2>
             <h2 >
                <NumberFormat 
                  value={0.00} 
                  displayType={'text'} 
                  thousandSeparator={true} 
                  prefix={'$ '}
                  decimalScale={2}
                />
              </h2>
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
              <h2 >HONORARIOS</h2>
             <h2 >
                <NumberFormat 
                  value={0.00} 
                  displayType={'text'} 
                  thousandSeparator={true} 
                  prefix={'$ '}
                  decimalScale={2}
                />
              </h2>
              <Typography variant="subtitle2"> Cuenta: 0108764492 </Typography>
              <Typography variant="subtitle2">  CLABE: 012691001087644924 </Typography>
              <Typography variant="subtitle2"> Titular: CORPORATIVO N48, S.C. </Typography>
              <Typography variant="subtitle2"> Bancomer: BBVA Bancomer. </Typography>
              <Typography variant="subtitle2"> Swif: BCMRMXMMPYM </Typography>
              <Typography variant="subtitle2"> Dirección: Av. Paseo de la Reforma 510, Col. Juárez,</Typography>
              <Typography variant="subtitle2"> C.P. 06600, Delegación Cuauhtémoc, D.F. </Typography>
            </Grid>
          </Grid>
          <Grid container item direction="row" className={classes.marginTopGridInvoice}>
            <Grid container item xs={1}></Grid>
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
