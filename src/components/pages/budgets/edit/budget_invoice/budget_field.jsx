import React, { useState, useEffect }   from 'react';
import Dialog                           from '@material-ui/core/Dialog';
import DialogActions                    from '@material-ui/core/DialogActions';
import DialogContent                    from '@material-ui/core/DialogContent';
import DialogTitle                      from '@material-ui/core/DialogTitle';
import TextField                        from '@material-ui/core/TextField';
import Button                           from '@material-ui/core/Button';
import Grid                             from '@material-ui/core/Grid';
import Typography                       from '@material-ui/core/Typography';
import Link                             from '@material-ui/core/Link';
import { useQuery, useMutation }        from '@apollo/client';
import { GET_BUDGET_FIELD_VALUE }       from '../../queries_and_mutations/queries'
import { UPDATE_PROCEDURE_FIELD_VALUE } from '../../queries_and_mutations/queries'

export default (props) => {
  const { field, budget } = props

  const [open, setOpen]   = useState(false)
  const [value, setValue] = useState("")
  const [fieldValue, setFieldValue] = useState(null)
  const [pristine, setPristine] = useState(true)
  const [valueDefaulted, setValueDefaulted] = useState(true)

  const handleClickOpen = (event) => {
    event.preventDefault();
    setOpen(true);
  }

  const { loading, data, refetch } = useQuery(
    GET_BUDGET_FIELD_VALUE,
    { variables: { budgetingTemplateFieldId: field.id, budgetId: budget.id }}
  )

  useEffect(() => {
    if(data && data.budgetFieldValue) {
      setFieldValue(data && data.budgetFieldValue)
      setValue(data && data.budgetFieldValue.value)
    }
  }, [loading, data])

  const handleClose = (event) => {
    setOpen(false);
    setValue(fieldValue.value);
    setPristine(true);
  }

  const handleValueChange = (event) => {
    setValue(event.target.value);
    
    if(sameValue(event.target.value)) {
      setPristine(true)
      setValueDefaulted(true)
    } else {
      setValueDefaulted(false)
      setPristine(false)
    }
  }

  const [updateProcedureFieldValue] = useMutation(
    UPDATE_PROCEDURE_FIELD_VALUE,
    {
      onError(apolloError) {
        // setErrors(apolloError)
      },
      onCompleted(cacheData) {
        refetch();
        setOpen(false);
        setPristine(true)
      }
    }
  )

  const handleSaveNewValue = (event) => {
    updateProcedureFieldValue(
      { variables: { 
        id: fieldValue && fieldValue.id,
        proceduresTemplateFieldId: field.id,
        procedureId: budget.procedure.id,
        value: value 
      }}
    )
  }

  const sameValue = (newValue) => {
    return(fieldValue && fieldValue.value === newValue)
  }

  return(
    <Grid container item xs={8} direction="row">
      <Grid container item xs={9}>
        <Grid
          item 
          xs={3}
        >
          <Typography style={{ fontWeight: 600 }} align='left'>{field.name}:</Typography>
        </Grid>
        <Grid
          container
          item
          xs={9}
        >
          <Typography align='left'>
            <Link href="#" onClick={handleClickOpen}>
              { fieldValue && fieldValue.value ? value : "Agregar Información" }
            </Link>
          </Typography>
          <Dialog open={open} onClose={handleClose} fullWidth>
            <DialogTitle>
              {field.name}
            </DialogTitle>
            <DialogContent>
              <TextField
                onChange={handleValueChange}
                label={field.name}
                id="margin-normal"
                margin="normal"
                fullWidth
                value={value}
                variant="outlined"
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>
                Cancelar
              </Button>
              <Button onClick={handleSaveNewValue} disabled={pristine && valueDefaulted}>
                Aceptar
              </Button>
            </DialogActions>
          </Dialog>
        </Grid>
      </Grid>
    </Grid>
  )
}
