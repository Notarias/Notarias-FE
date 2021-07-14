import React, { useEffect}                from 'react';
import { styles }                         from '../styles';
import { withStyles }                     from '@material-ui/core/styles';
import Button                             from '@material-ui/core/Button';
import Grid                               from '@material-ui/core/Grid';
import Dialog                             from '@material-ui/core/Dialog';
import DialogContent                      from '@material-ui/core/DialogContent';
import DialogTitle                        from '@material-ui/core/DialogTitle';
import DialogActions                      from '@material-ui/core/DialogActions';
import { useMutation }                    from '@apollo/react-hooks';
import { UPDATE_BUDGETING_TEMPLATE }      from '../queries_and_mutations/queries'
import { GLOBAL_MESSAGE }                             from '../../../../../resolvers/queries';
import client                                         from '../../../../../apollo';


const ActiveTemplateButton = (props) => {

  const { classes, templateData, match } = props
  const [id] = React.useState(match.id);
  const [active, setActive] = React.useState(templateData.active);
  const [open, setOpen] = React.useState(false);

  useEffect(
    () => {
      setActive(templateData.active)
    },
    [templateData]
  )

  const [updateBudgetingTemplateMutation, updateProcessInfo] =
    useMutation(
      UPDATE_BUDGETING_TEMPLATE,
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
        update(store, cacheData) {
          setActive(cacheData.data.updateBudgetingTemplate.budgetingTemplate.active)
        }
      }
    )

  const updateStatusTemplate = (event) => {
    updateBudgetingTemplateMutation({ variables: {id: id , active: !active}})
    setOpen(false);
  }

  const loadingTemplate = updateProcessInfo.loading

  const handleClickOpen = (event) => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const renderActivedButton = () => {

    return (
      <Grid item>
        <Button 
          variant="contained" 
          color="primary" 
          size="small" 
          className={ classes.buttonHeight } 
          onClick={ handleClickOpen }
          disabled={ loadingTemplate }
        >
          Activar
        </Button>
      </Grid>
    )
  }

  const renderDesactivedButton = () => {

    return (
      <Grid item>
        <Button 
          variant="contained" 
          size="small" 
          className={ classes.buttonHeight } 
          onClick={ handleClickOpen }
          disabled={ loadingTemplate }
        >
          Desactivar
        </Button>
      </Grid>
    )
  }

  return(
    <>
    <Grid container item justifyContent="center" >
      { active ? renderDesactivedButton() : renderActivedButton() }
    </Grid>
    <Dialog open={open} onClose={ handleClose }>
      <DialogTitle>
      { active ? "Desactivar Plantilla" : "Activar Plantilla" }
      </DialogTitle>
      <DialogContent>
      { active ? "Desactivar la Plantilla dejará de ser editable o funcional" : "Activar esta plantilla permitirá poder trabajar en ella." }
      </DialogContent>
      <DialogActions>
        <Button 
          onClick={ handleClose }
          variant="text"
          size="small"
        >
          cancelar
        </Button>
        <Button
          onClick={ updateStatusTemplate }
          variant="text" 
          color="primary" 
          size="small" 
        >
          { active ? "Desactivar" : "Activar" }
        </Button>
      </DialogActions>
    </Dialog>
    </>
  )
}

export default withStyles(styles)(ActiveTemplateButton);
