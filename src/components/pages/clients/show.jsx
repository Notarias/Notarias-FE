import React                  from 'react';
import { withStyles }         from '@material-ui/core/styles';
import { styles }             from './styles';
import { Grid }               from '@material-ui/core';
import Breadcrumbs            from '../../ui/breadcrumbs';
import Typography             from '@material-ui/core/Typography';
import List                   from '@material-ui/core/List';
import ListItem               from '@material-ui/core/ListItem';
import Divider                from '@material-ui/core/Divider';
import ClientsAttributesList  from './show/clients_attributes/clients_attributes_list';
import ClientsData            from './show/clients_data';
import ClientsBudgetsList     from './show/clients_budgets/clients_budgets_list';
import ClientsProcedures      from './show/clients_procedures';
import ClientsComments        from './show/clients_comments/clients_comments'
import IncomingEvents         from './show/incoming_events'

const BREADCRUMBS = [
  { name: "Inicio", path: "/" },
  { name: "Clientes", path: "/clients" },
  { name: "Editar", path: null }
]

const Details = (props) => {
  const { classes, match } = props

  return(
    <div className={classes.principalContainer}>
      <Breadcrumbs breadcrumbs={BREADCRUMBS}/>
      <Grid 
        container 
        item 
        xs={12} 
        justifyContent="center"
        alignItems="center"
        className={classes.gridOverflowContainer}
      >
        <Grid container item xs={8}>
          <Grid container item xs={12}>
            <List >
              <ListItem className={classes.ListItemWithoutPadding}>
                <Typography className={classes.TypographyGeneralData} variant="h6">Información general</Typography>
              </ListItem>
            </List>
            <Divider fullwidth="true" component="li" className={classes.firstDivider}/>
          </Grid>
          <Grid container item xs={4}>
            <Typography className={classes.TypographyMarginTop} variant="subtitle2">Datos del cliente</Typography>
          </Grid>
          <Grid container item xs={8}>
            <ClientsData
              match={match}
            />
          </Grid>
          <Grid container item xs={12}>
            <Divider fullwidth="true" component="li" className={classes.dividersStyles}/>
          </Grid>
          <Grid container item xs={4}>
            <Typography className={classes.TypographyMarginTop} variant="subtitle2">Otros datos</Typography>
          </Grid>
          <Grid container item xs={8}>
            <ClientsAttributesList
              match={match}
            />
          </Grid>
          <Grid container item xs={12}>
            <Divider fullwidth="true" component="li" className={classes.dividersStyles}/>
          </Grid>
          <Grid container item xs={4}>
            <Typography className={classes.TypographyMarginTop} variant="subtitle2">Últimos Presupuestos</Typography>
          </Grid>
          <Grid container item xs={8}>
            <ClientsBudgetsList
              match={match}
            />
          </Grid>
          <Grid container item xs={12}>
            <Divider fullwidth="true" component="li" className={classes.dividersStyles}/>
          </Grid>
          <Grid container item xs={4}>
            <Typography className={classes.TypographyMarginTop} variant="subtitle2">Últimos Trámites</Typography>
          </Grid>
          <Grid container item xs={8}>
            <ClientsProcedures/>
          </Grid>
          <Grid container item xs={12}>
            <Divider fullwidth="true" component="li" className={classes.dividersStyles}/>
          </Grid>
            <Grid container item xs={4}>
              <Typography className={classes.TypographyMarginTop} variant="subtitle2">Próximos eventos</Typography>
            </Grid>
            <Grid container item xs={8}>
              <IncomingEvents/>
            </Grid>
          <Grid container item xs={12}>
            <Divider fullwidth="true" component="li" className={classes.dividersStyles}/>
          </Grid>
          <Grid container item xs={12} justifyContent="center" alignItems="center" >
            <ClientsComments
              match={match}
            />
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}

export default withStyles(styles)(Details);
