import React, { useState, useEffect }           from 'react';
import Grid                                     from '@material-ui/core/Grid';
import Dialog                                   from '@material-ui/core/Dialog';
import DialogTitle                              from '@material-ui/core/DialogTitle';
import DialogContent                            from '@material-ui/core/DialogContent';
import DialogContentText                        from '@material-ui/core/DialogContentText';
import DialogActions                            from '@material-ui/core/DialogActions';
import Divider                                  from '@material-ui/core/Divider';
import List                                     from '@material-ui/core/List';
import ListItem                                 from '@material-ui/core/ListItem';
import ListItemText                             from '@material-ui/core/ListItemText';
import Card                                     from '@material-ui/core/Card';
import CardContent                              from '@material-ui/core/CardContent';
import Button                                   from '@material-ui/core/Button';
import { useQuery, useMutation }                from '@apollo/client';
import { Redirect }                             from 'react-router-dom';
import { GET_PROCEDURES_TEMPLATES_QUICK_LIST }  from '../../queries_and_mutations/queries';
import { CREATE_PROCEDURE }                     from '../../queries_and_mutations/queries';
import { GLOBAL_MESSAGE }                       from '../../../../../resolvers/queries';
import client                                   from '../../../../../apollo';

const NewProcedureDialog = (props) => {

  const { procedure, dialog, openDialog } = props;

  const [budget] = useState(procedure.budgets[procedure.budgets.length - 1]);
  const [proceduresTemplatesList, setProceduresTemplatesList] = useState([]);
  const [templateSelected, setTemplateSelected] = useState(0);
  const [redirect, setRedirect] = useState();

  const { data } = useQuery(
    GET_PROCEDURES_TEMPLATES_QUICK_LIST
  );

  useEffect( () => {
    if(data && data.proceduresTemplatesQuickList){
      setProceduresTemplatesList(data && data.proceduresTemplatesQuickList);
  }}, [data]);

  const [createProcedureMutation] =
  useMutation(
    CREATE_PROCEDURE,
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
        const id = cacheData.createBudget.procedure.id
        id && setRedirect(
          <Redirect to={{ pathname: `/procedures/${id}/edit` }} />
        );
      }
    }
  )

  const createNewProcedure = (event) => {
    createProcedureMutation(
      { 
        variables: { 
          "clientId": procedure.client.id,
          "attorneyId": procedure.attorney.id,
          "proceduresTemplateId": procedure.proceduresTemplate.id,
          "proceduresTemplateId": proceduresTemplatesList[templateSelected].id,
          "asigneeId": procedure.asignee.id
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
          Nuevo Tramite
        </DialogTitle>
        <Divider />
        <DialogContent>
          <DialogContentText align='center' style={{paddingLeft:'25px', paddingRight:'25px'}}>
            El tramite nuevo se vinculara con el presupuesto exitente actualmente vinculado a este tramite.
          </DialogContentText>

          <Grid container direction='row'>
            <Grid container item xs={5}>
              <Grid item xs={12} style={{padding:'0', margin:'0'}}>
                {`Tramite No. ${procedure.id}`}
              </Grid>
              <Grid item xs={12}>
                {`Plantilla: ${procedure.proceduresTemplate.name}`}
              </Grid>
              <Grid item xs={12}>
                {`Version No. ${procedure.proceduresTemplate.version}`}
              </Grid>
              <Grid item xs={12} style={{padding:'0', margin:'0'}}>
                {`Presupuesto vinculado No. ${budget.id}`}
              </Grid>
              <Grid item xs={12}>
                {`Plantilla: ${procedure.budgetingTemplate.name}`}
              </Grid>
              <Grid item xs={12}>
                {`Version No. ${procedure.budgetingTemplate.version}`}
              </Grid>
            </Grid>
            <Grid item xs={7}>
              <Card variant="outlined">
                <CardContent>
                  <List component="nav" aria-label="proceduresTemplate">
                    {proceduresTemplatesList && proceduresTemplatesList.map((template, index) => (
                      <ListItem
                        key={`procedures-template-${template.id}`}
                        button
                        selected={templateSelected === index}
                        onClick={(event) => selectTempalte(event, index)}
                      >
                        <ListItemText primary={template.name} />
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
            onClick={createNewProcedure}
          >
            { redirect }
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default NewProcedureDialog;
