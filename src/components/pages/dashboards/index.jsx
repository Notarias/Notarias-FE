import React                        from 'react';
import { setBreadcrumbsList }       from './../../interfaces/breadcrumbs_interface';
import Grid                         from '@material-ui/core/Grid';
import Paper                        from '@material-ui/core/Paper';
import { styles }                   from './styles';
import { withStyles }               from '@material-ui/core/styles';
import LastPayments                 from "./index/last_payments";
import LastProcedures               from "./index/last_procedures";
import LastBudgets                  from './index/last_budgets';
import LastComments                 from './index/last_comments';
import NextEvents                   from './index/next_events';
import Breadcrumbs                  from '../../ui/breadcrumbs';
import Typography                           from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider                              from '@material-ui/core/Divider';

const BREADCRUMBS = [
  { name: "Inicio", path: "/" }
]

const DashboardsIndex = (props) => {
    setBreadcrumbsList([])
  const { classes } = props;
  return (
    <>
      <Breadcrumbs breadcrumbs={BREADCRUMBS}/>
      <Grid
        container 
        item 
        xs={12} 
        justifyContent="center"
        alignItems="center" 
        style={{paddingLeft: "3%"}}
      >
        <Grid container item xs={10} direction="row">
          <Grid container item>
            <List >
              <ListItem style={{paddingLeft:"0px"}}>
                <Typography style={{margin:"10px 0px"}} variant="h6">Panel General</Typography>
              </ListItem>
            </List>
            <Divider fullwidth="true" component="li" style={{width:"93%", marginBottom: "6px"}}/>
          </Grid>
          <Grid container item xs={4} direction="column"  style={{ maxHeight: "600px"}}>
            <List >
              <ListItem button style={{paddingLeft:"0px"}}>
                <ListItemText>Algo para mostrar</ListItemText>
              </ListItem>
              <ListItem button style={{paddingLeft:"0px"}}>
                <ListItemText>Algo para mostrar</ListItemText>
              </ListItem>
              <ListItem button style={{paddingLeft:"0px"}}>
                <ListItemText>Algo para mostrar</ListItemText>
              </ListItem>
              <ListItem button style={{paddingLeft:"0px"}}>
                <ListItemText>Algo para mostrar</ListItemText>
              </ListItem>
            </List>
          </Grid>
          <Grid container item xs={8} direction="column" style={{overflowY: "scroll", maxHeight: "600px"}} >
            <Paper>
              <Grid>
                <List >
                  <ListItem >
                    <Typography variant="h6">Últimos pagos</Typography>
                  </ListItem>
                  <ListItem style={{paddingLeft:"0px"}}>
                    <Grid container item direction="row">
                      <Grid container justifyContent="center" item xs={2}>
                        <Typography variant="subtitle2" style={{margin:"5px"}}>Nombre</Typography>
                      </Grid>
                      <Grid container justifyContent="center" item xs={2}>
                        <Typography variant="subtitle2" style={{margin:"5px"}}>Total</Typography>                   
                      </Grid>
                      <Grid container justifyContent="center" item xs={2}>
                        <Typography variant="subtitle2" style={{margin:"5px"}}>Concepto</Typography>                  
                      </Grid>
                      <Grid container justifyContent="center" item xs={2}>
                        <Typography variant="subtitle2" style={{margin:"5px"}}>Fecha</Typography>                  
                      </Grid>
                      <Grid container justifyContent="center" item xs={2}>
                        <Typography variant="subtitle2" style={{margin:"5px"}}>No. folio</Typography>                  
                      </Grid>
                      <Grid container justifyContent="center" item xs={2}>
                        <Typography variant="subtitle2" style={{margin:"5px"}}>Etc...</Typography>                  
                      </Grid>
                    </Grid>
                  </ListItem>
                  <Divider style={{width:"97%", marginBottom: "6px"}}/>
                  <ListItem style={{paddingLeft:"0px"}}>
                    <Grid container item direction="row">
                      <Grid container justifyContent="center" item xs={2}>
                        <Typography variant="subtitle2" style={{margin:"5px"}}>Jose Raul Ortega Gozalo</Typography>
                      </Grid>
                      <Grid container justifyContent="center" item xs={2}>
                        <Typography variant="subtitle2" style={{margin:"5px"}}>$ 20,000</Typography>                   
                      </Grid>
                      <Grid container justifyContent="center" item xs={2}>
                        <Typography variant="subtitle2" style={{margin:"5px"}}>presupuesto</Typography>                  
                      </Grid>
                      <Grid container justifyContent="center" item xs={2}>
                        <Typography variant="subtitle2" style={{margin:"5px"}}>dd/mm/aa</Typography>                  
                      </Grid>
                      <Grid container justifyContent="center" item xs={2}>
                        <Typography variant="subtitle2" style={{margin:"5px"}}>00018</Typography>                  
                      </Grid>
                      <Grid container justifyContent="center" item xs={2}>
                        <Typography variant="subtitle2" style={{margin:"5px"}}>.....</Typography>                  
                      </Grid>
                    </Grid>
                  </ListItem>
                  <ListItem style={{paddingLeft:"0px"}}>
                    <Grid container item direction="row">
                      <Grid container justifyContent="center" item xs={2}>
                        <Typography variant="subtitle2" style={{margin:"5px"}}>Jose Raul Ortega Gozalo</Typography>
                      </Grid>
                      <Grid container justifyContent="center" item xs={2}>
                        <Typography variant="subtitle2" style={{margin:"5px"}}>$ 20,000</Typography>                   
                      </Grid>
                      <Grid container justifyContent="center" item xs={2}>
                        <Typography variant="subtitle2" style={{margin:"5px"}}>presupuesto</Typography>                  
                      </Grid>
                      <Grid container justifyContent="center" item xs={2}>
                        <Typography variant="subtitle2" style={{margin:"5px"}}>dd/mm/aa</Typography>                  
                      </Grid>
                      <Grid container justifyContent="center" item xs={2}>
                        <Typography variant="subtitle2" style={{margin:"5px"}}>00018</Typography>                  
                      </Grid>
                      <Grid container justifyContent="center" item xs={2}>
                        <Typography variant="subtitle2" style={{margin:"5px"}}>.....</Typography>                  
                      </Grid>
                    </Grid>
                  </ListItem>
                  <ListItem style={{paddingLeft:"0px"}}>
                    <Grid container item direction="row">
                      <Grid container justifyContent="center" item xs={2}>
                        <Typography variant="subtitle2" style={{margin:"5px"}}>Jose Raul Ortega Gozalo</Typography>
                      </Grid>
                      <Grid container justifyContent="center" item xs={2}>
                        <Typography variant="subtitle2" style={{margin:"5px"}}>$ 20,000</Typography>                   
                      </Grid>
                      <Grid container justifyContent="center" item xs={2}>
                        <Typography variant="subtitle2" style={{margin:"5px"}}>presupuesto</Typography>                  
                      </Grid>
                      <Grid container justifyContent="center" item xs={2}>
                        <Typography variant="subtitle2" style={{margin:"5px"}}>dd/mm/aa</Typography>                  
                      </Grid>
                      <Grid container justifyContent="center" item xs={2}>
                        <Typography variant="subtitle2" style={{margin:"5px"}}>00018</Typography>                  
                      </Grid>
                      <Grid container justifyContent="center" item xs={2}>
                        <Typography variant="subtitle2" style={{margin:"5px"}}>.....</Typography>                  
                      </Grid>
                    </Grid>
                  </ListItem>
                </List>
              </Grid>
            </Paper>
            <Paper style={{width:"100%"}}>
              <Grid>
                <List >
                  <ListItem >
                    <Typography variant="h6">Últimos Trámites</Typography>
                  </ListItem>
                  <ListItem style={{paddingLeft:"0px"}}>
                    <Grid container item direction="row">
                      <Grid container justifyContent="center" item xs={2}>
                        <Typography variant="subtitle2" style={{margin:"5px"}}>Nombre</Typography>
                      </Grid>
                      <Grid container justifyContent="center" item xs={2}>
                        <Typography variant="subtitle2" style={{margin:"5px"}}>Total</Typography>                   
                      </Grid>
                      <Grid container justifyContent="center" item xs={2}>
                        <Typography variant="subtitle2" style={{margin:"5px"}}>Concepto</Typography>                  
                      </Grid>
                      <Grid container justifyContent="center" item xs={2}>
                        <Typography variant="subtitle2" style={{margin:"5px"}}>Fecha</Typography>                  
                      </Grid>
                      <Grid container justifyContent="center" item xs={2}>
                        <Typography variant="subtitle2" style={{margin:"5px"}}>No. folio</Typography>                  
                      </Grid>
                      <Grid container justifyContent="center" item xs={2}>
                        <Typography variant="subtitle2" style={{margin:"5px"}}>Etc...</Typography>                  
                      </Grid>
                    </Grid>
                  </ListItem>
                  <Divider style={{width:"97%", marginBottom: "6px"}}/>
                  <ListItem style={{paddingLeft:"0px"}}>
                    <Grid container item direction="row">
                      <Grid container justifyContent="center" item xs={2}>
                        <Typography variant="subtitle2" style={{margin:"5px"}}>Jose Raul Ortega Gozalo</Typography>
                      </Grid>
                      <Grid container justifyContent="center" item xs={2}>
                        <Typography variant="subtitle2" style={{margin:"5px"}}>$ 20,000</Typography>                   
                      </Grid>
                      <Grid container justifyContent="center" item xs={2}>
                        <Typography variant="subtitle2" style={{margin:"5px"}}>presupuesto</Typography>                  
                      </Grid>
                      <Grid container justifyContent="center" item xs={2}>
                        <Typography variant="subtitle2" style={{margin:"5px"}}>dd/mm/aa</Typography>                  
                      </Grid>
                      <Grid container justifyContent="center" item xs={2}>
                        <Typography variant="subtitle2" style={{margin:"5px"}}>00018</Typography>                  
                      </Grid>
                      <Grid container justifyContent="center" item xs={2}>
                        <Typography variant="subtitle2" style={{margin:"5px"}}>.....</Typography>                  
                      </Grid>
                    </Grid>
                  </ListItem>
                  <ListItem style={{paddingLeft:"0px"}}>
                    <Grid container item direction="row">
                      <Grid container justifyContent="center" item xs={2}>
                        <Typography variant="subtitle2" style={{margin:"5px"}}>Jose Raul Ortega Gozalo</Typography>
                      </Grid>
                      <Grid container justifyContent="center" item xs={2}>
                        <Typography variant="subtitle2" style={{margin:"5px"}}>$ 20,000</Typography>                   
                      </Grid>
                      <Grid container justifyContent="center" item xs={2}>
                        <Typography variant="subtitle2" style={{margin:"5px"}}>presupuesto</Typography>                  
                      </Grid>
                      <Grid container justifyContent="center" item xs={2}>
                        <Typography variant="subtitle2" style={{margin:"5px"}}>dd/mm/aa</Typography>                  
                      </Grid>
                      <Grid container justifyContent="center" item xs={2}>
                        <Typography variant="subtitle2" style={{margin:"5px"}}>00018</Typography>                  
                      </Grid>
                      <Grid container justifyContent="center" item xs={2}>
                        <Typography variant="subtitle2" style={{margin:"5px"}}>.....</Typography>                  
                      </Grid>
                    </Grid>
                  </ListItem>
                  <ListItem style={{paddingLeft:"0px"}}>
                    <Grid container item direction="row">
                      <Grid container justifyContent="center" item xs={2}>
                        <Typography variant="subtitle2" style={{margin:"5px"}}>Jose Raul Ortega Gozalo</Typography>
                      </Grid>
                      <Grid container justifyContent="center" item xs={2}>
                        <Typography variant="subtitle2" style={{margin:"5px"}}>$ 20,000</Typography>                   
                      </Grid>
                      <Grid container justifyContent="center" item xs={2}>
                        <Typography variant="subtitle2" style={{margin:"5px"}}>presupuesto</Typography>                  
                      </Grid>
                      <Grid container justifyContent="center" item xs={2}>
                        <Typography variant="subtitle2" style={{margin:"5px"}}>dd/mm/aa</Typography>                  
                      </Grid>
                      <Grid container justifyContent="center" item xs={2}>
                        <Typography variant="subtitle2" style={{margin:"5px"}}>00018</Typography>                  
                      </Grid>
                      <Grid container justifyContent="center" item xs={2}>
                        <Typography variant="subtitle2" style={{margin:"5px"}}>.....</Typography>                  
                      </Grid>
                    </Grid>
                  </ListItem>
                </List>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
      {/* <Grid item container xs={12} spacing={3} classes={{root: classes.gridContainer}}>
        <Grid item container xs={12} sm={12} md={12} lg={8} spacing={3} style={{width: "100%"}}>
          <Grid item xs={12} sm={12} md={6}><Paper className={ classes.paper }> <LastPayments/> </Paper></Grid>
          <Grid item xs={12} sm={12} md={6}><Paper className={ classes.paper }> <LastProcedures/> </Paper></Grid>
          <Grid item xs={12} sm={12} md={6}><Paper className={ classes.paper }> <LastBudgets/> </Paper></Grid>
          <Grid item xs={12} sm={12} md={6}><Paper className={ classes.paper }> <NextEvents/> </Paper></Grid>
        </Grid>
        <Grid item container xs={12} sm={12} md={12} lg={4}>
          <Grid item xs={12} md={12}>
            <Paper className={ classes.paper }>
              <LastComments/>
            </Paper>
          </Grid>
        </Grid>
      </Grid> */}
    </>
  );  
}

export default withStyles(styles)(DashboardsIndex);
