import React                                from 'react';
import Breadcrumbs                          from '../../../ui/breadcrumbs'
import Divider                              from '@material-ui/core/Divider';
import Paper                                from '@material-ui/core/Paper';
import Grid                                 from '@material-ui/core/Grid';
import { styles }                           from './styles';
import { withStyles }                       from '@material-ui/core/styles';
import Button                               from '@material-ui/core/Button';
import CircularProgress                     from '@material-ui/core/CircularProgress';
import TemplateTittle                       from './edit/template_tittle';
import { useQuery }                         from '@apollo/react-hooks';
import { GET_BUDGETING_TEMPLATE }           from './queries_and_mutations/queries'
import Typography                           from '@material-ui/core/Typography';
import AddIcon                              from '@material-ui/icons/Add';


const BREADCRUMBS = [
  { name: "Inicio", path: "/" },
  { name: "Presupuestos", path:"/config/budget_templates" },
  { name: "Editar", path: null }
]

const Edit = (props) => {
  const { classes, match } = props
  const { loading, data, refetch } = useQuery(GET_BUDGETING_TEMPLATE,
    { variables: {"id": match.params.id } } 
  );

  return(
    <>
      <Breadcrumbs breadcrumbs={ BREADCRUMBS }/>
      <Divider/>
      <Grid container direction="row">
        <Grid container item xs={9} direction="column">
            <Grid container direction="row"  alignItems="center" className={ classes.addTittleProcedure }>
              <Grid container item xs={7} justify="flex-start">
                <TemplateTittle
                  templateData={ data ? data.budgetingTemplate : " " }
                  match={ props.match.params }
                />
              </Grid>
              <Grid container item xs={5} justify="flex-end" alignItems="center">
                <Grid container item xs={4} justify="center">
                </Grid>
                <Grid container item xs={4} justify="center">
                  <Button variant="contained" size="small" className={ classes.buttonAddProcedure }>
                  + presupuesto
                  </Button>
                </Grid>
                <Grid container item xs={4} justify="center">
{/* spaces left intentionally to mark the spaces of it own components */}
                <Grid item>
                  <Button 
                    variant="contained" 
                    color="primary" 
                    size="small" 
                    className={ classes.buttonHeight } 
                  >
                    Activar
                  </Button>
                </Grid>
{/* spaces left intentionally to mark the spaces of it own components */}
                </Grid>
              </Grid>
            </Grid>
            <Divider/>
{/* spaces left intentionally to mark the spaces of it own components */}
            <Grid container justify="center" alignItems="center" className={ classes.addFieldsAndGroupsButton } >
              <Grid container  justify="center" alignItems="center" direction="row" >
                <Grid item xs={4}>
                  <Typography variant="button" display="block" gutterBottom>
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                    >
                      Campo  <AddIcon className={ classes.addIconMargin }/>
                    </Button>
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="button" display="block" gutterBottom>
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                    >
                      Grupo de Campos <AddIcon className={ classes.addIconMargin }/>
                    </Button>
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
{/* spaces left intentionally to mark the spaces of it own components */}
            { 
              (loading || !data) ?
                (
                  <Grid container item className={ classes.circularProgressLoading } direction="column" alignItems="center" justify="center">
                    <CircularProgress size={ 100 }/>
                  </Grid>
                )
              :
                (
                  <Grid container item direction="column" alignItems="center" justify="center">
                    Fields and Groups
                  </Grid>
                )
            }
          </Grid>
          <Grid container item xs={3} direction="column">
          <Paper>
            {
              (loading || !data) ?
                (
                  <Grid container item className={ classes.circularProgressLoading } direction="column" alignItems="center" justify="center">
                    <CircularProgress size={ 100 }/>
                  </Grid>
                )
              :
                <Grid container item direction="column">
                  <Grid item >
                    <Button variant="contained" className={ classes.buttonTab }>
                      <Grid container direction="column" alignItems="center" justify="center">
                        Agregar pestaña
                        <AddIcon/>
                      </Grid>
                    </Button>
                  </Grid>
                </Grid>
            }
          </Paper>
        </Grid>
      </Grid>
    </>
  )
}

export default withStyles(styles)(Edit);
