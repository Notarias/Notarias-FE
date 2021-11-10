import React, { useState } from 'react';
import Dialog             from '@material-ui/core/Dialog';
import DialogTitle        from '@material-ui/core/DialogTitle';
import DialogContent      from '@material-ui/core/DialogContent';
import DialogActions      from '@material-ui/core/DialogActions';
import DialogContentText  from '@material-ui/core/DialogContentText';
import Button             from '@material-ui/core/Button';
import DeleteForeverIcon  from '@material-ui/icons/DeleteForever';
import IconButton         from '@material-ui/core/IconButton';
import { useMutation }    from '@apollo/react-hooks';
import { DESTROY_TAXED_FIELD } from '../../queries_and_mutations/mutations';
import { GET_BUDGETING_TEMPLATE_TAB_FIELDS, GET_BUDGETING_TEMPLATE_TAXED_FIELDS } from '../../queries_and_mutations/queries';

export default (props) => {

  const { destroyCallback, taxedField, taxField } = props;

  const [
    destroyTaxedFieldMutation,
    { loading }
  ] = useMutation(
    DESTROY_TAXED_FIELD,
    {
      onError(apolloError) {
        // setErrors(apolloError)
      },
      onCompleted(cacheData) {
        destroyCallback()
        setDialogOpen(false)
      },
      refetchQueries: [
        {
          query: GET_BUDGETING_TEMPLATE_TAB_FIELDS,
          variables: { id: taxField.budgetingTemplateTabId }
        },
        {
          query: GET_BUDGETING_TEMPLATE_TAXED_FIELDS,
          variables: { id: taxField.id }
        }
      ]
    }
  )

  const [dialogOpen, setDialogOpen] = useState(false)

  const openDestroyDialog = () => {
    setDialogOpen(true)
  }

  const closeDestroyDialog = () => {
    setDialogOpen(false)
  }

  const destroy = () => {
    destroyTaxedFieldMutation({
      variables: {
        taxedFieldId: taxedField.id,
        taxFieldId: taxField.id
      }
    })
  }

  return(
    <>
      <IconButton aria-label="delete" size='small' onClick={openDestroyDialog}>
        <DeleteForeverIcon/>
      </IconButton>
      <Dialog open={dialogOpen}>
        <DialogTitle id="confirmation-dialog-title">Phone Ringtone</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Está seguro que desea borrar este campo de la lista de afectados por el impuesto?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button disabled={loading} autoFocus onClick={closeDestroyDialog} color="primary">
            Cancelar
          </Button>
          <Button disabled={loading} onClick={destroy} color="primary">
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}