import React, { useState, useEffect }          from 'react';
import Grid                                    from '@material-ui/core/Grid';
import Typography                              from '@material-ui/core/Typography';
import Dialog                                  from '@material-ui/core/Dialog';
import DialogTitle                             from '@material-ui/core/DialogTitle';
import DialogContent                           from '@material-ui/core/DialogContent';
import DialogActions                           from '@material-ui/core/DialogActions';
import Divider                                 from '@material-ui/core/Divider';
import List                                    from '@material-ui/core/List';
import ListItem                                from '@material-ui/core/ListItem';
import ListItemText                            from '@material-ui/core/ListItemText';
import ListItemIcon                            from '@material-ui/core/ListItemIcon';
import Chip                                    from '@material-ui/core/Chip';
import Card                                    from '@material-ui/core/Card';
import CardContent                             from '@material-ui/core/CardContent';
import Button                                  from '@material-ui/core/Button';
import { useQuery, useMutation }               from '@apollo/client';
import { Redirect }                            from 'react-router-dom';
import { GET_BUDGETING_TEMPLATES_QUICK_LIST }  from '../../queries_and_mutations/queries';
import { CREATE_BUDGET_FROM_BUDGET }                       from '../../queries_and_mutations/queries';
import { GLOBAL_MESSAGE }                      from '../../../../../resolvers/queries';
import client                                  from '../../../../../apollo';

const NewBudgetDialog = (props) => {

  const { procedure, budgetId, dialog, openDialog } = props;

  const [budgetingTemplatesList, setBudgetingTemplatesList] = useState([]);
  const [templateSelected, setTemplateSelected] = useState(0);
  const [redirect, setRedirect] = useState();
  
  const { data } = useQuery(
    GET_BUDGETING_TEMPLATES_QUICK_LIST
  );

  useEffect( () => {
    if(data && data.budgetingTemplatesQuickList){
      setBudgetingTemplatesList(data && data.budgetingTemplatesQuickList);
  }}, [data]);

  const [createBudgetFromBudgetMutation] =
  useMutation(
    CREATE_BUDGET_FROM_BUDGET,
    {
      onError(apolloError) {
        client.writeQuery({
          query: GLOBAL_MESSAGE,
          data: {
            globalMessage: {
              message: "Ocurrió un error",
              type: "error",
              __typename: "globalMessage"
            }
          }
        })
      },
      onCompleted(cacheData) {
        const id = cacheData.createBudgetFromBudget.budget.id
        id && setRedirect(
          <Redirect to={{ pathname: `/budgets/${id}/edit` }} />
        );
      }
    }
  )

  const createNewBudget = (event) => {
    createBudgetFromBudgetMutation(
      { 
        variables: { 
          "clientId": procedure.client.id,
          "attorneyId": procedure.attorney.id,
          "proceduresTemplateId": procedure.proceduresTemplate.id,
          "budgetingTemplateId": budgetingTemplatesList[templateSelected].id,
          "asigneeId": procedure.asignee ? procedure.asignee.id : null,
          "procedureId": procedure.id
        }
      }
    )
  }

  const selectTempalte = (event, index) => {
    setTemplateSelected(index)
  }

  return(
    <>
      <Dialog fullWidth open={dialog} onClose={openDialog} maxWidth='sm'>
        <DialogTitle>
          Nuevo Presupuesto
        </DialogTitle>
        <Divider />
        <DialogContent>
          <Grid container direction='row'>
            <Grid container item xs={5}>
              <Grid item xs={12} style={{padding:'0', margin:'0'}}>
                <Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>
                  Presupuesto Original
                </Typography>
              </Grid>
              <Grid item xs={12}>
                No. {budgetId}
              </Grid>
              <Grid item xs={12}>
                Plantilla: {procedure.budgetingTemplate.name}
              </Grid>
              <Grid item xs={12}>
                Version No. {procedure.budgetingTemplate.version}
              </Grid>
              <Grid item xs={12} style={{padding:'0', margin:'0'}}>
                <Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>
                  Tramite Vinculado
                </Typography>
              </Grid>
              <Grid item xs={12}>
                No. {procedure.id}
              </Grid>
              <Grid item xs={12}>
                Plantilla: {procedure.proceduresTemplate.name}
              </Grid>
              <Grid item xs={12}>
                Version No. {procedure.proceduresTemplate.version}
              </Grid>
            </Grid>
            <Grid item xs={7}>
              <Grid item xs={12} style={{padding:'0', margin:'0'}}>
                <Typography variant="subtitle1" style={{ paddingLeft: '20px', fontWeight: 'bold' }}>
                  Plantilla del Nuevo Presupuesto
                </Typography>
              </Grid>
              <Card variant="outlined">
                <CardContent>
                  <List component="nav" aria-label="budgetingTemplate">
                    {budgetingTemplatesList && budgetingTemplatesList.map((template, index) => (
                      <ListItem
                        id={template.id}
                        key={`budgeting-template-${template.id}`}
                        button
                        selected={templateSelected === index}
                        onClick={(event) => selectTempalte(event, index)}
                      >
                        <ListItemText id={template.id} primary={template.name} />
                        <ListItemIcon id={template.id}>
                          <Chip
                            size="small"
                            color={ template.active ? "primary" : "secondary" }
                            label={ `${template.version ? template.version : "0"}.0` }
                          />
                        </ListItemIcon>
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

        </DialogContent>
        <Divider />
        <DialogActions>
          <Button
            variant="contained"
            onClick={openDialog}
          >
            Cancelar
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={createNewBudget}
          >
            { redirect }
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default NewBudgetDialog;
