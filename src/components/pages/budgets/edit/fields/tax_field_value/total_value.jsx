import React, { useState, useEffect, useRef }   from 'react';
import Grid                                     from '@material-ui/core/Grid';
import Chip                                     from '@material-ui/core/Chip';
import Dialog                                   from '@material-ui/core/Dialog';
import DialogActions                            from '@material-ui/core/DialogActions';
import DialogContent                            from '@material-ui/core/DialogContent';
import DialogTitle                              from '@material-ui/core/DialogTitle';
import TextField                                from '@material-ui/core/TextField';
import Button                                   from '@material-ui/core/Button';
import InputAdornment                           from '@material-ui/core/InputAdornment';
import AttachMoneyIcon                          from '@material-ui/icons/AttachMoney';
import EditIcon                                 from '@material-ui/icons/Edit';
import NumberFormat                             from 'react-number-format';
import PropTypes                                from 'prop-types';
import { useMutation }                          from '@apollo/client';
import { UPDATE_BUDGET_FIELD_VALUE }            from '../../../queries_and_mutations/queries';
import { GLOBAL_MESSAGE }                       from '../../../../../../resolvers/queries';
import client                                   from '../../../../../../apollo';
function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            value: values.value,
          },
        });
      }}
      thousandSeparator
      isNumericString
      decimalSeparator="."
      decimalScale={2}
      fixedDecimalScale

    />
  );
}

NumberFormatCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

const TotalValue = (props) => {
  const {
    // setPristine,
    editing,
    // setEditing,
    // value,
    pristine,
    // setValue,
    budgetFieldValue,
    templateField,
    // editingValue,
    // setEditingValue
  } = props

  const inputRef = useRef()

  // const handleChange = (event) => {
  //   if(Number(event.target.value) && pristine) {
  //     setPristine(false)
  //   } else if(!event.target.value) {
  //     setPristine(true)
  //   } else if(event.target.value === '0.00'){
  //     setPristine(false)
  //   } else if(!pristine) {
  //     setPristine(true)
  //   }
  //   setEditingValue(event.target.value);
  // }

  // const cancelEditing = () => {
  //   setEditing(false)
  //   setPristine(true)
  //   setEditingValue(value)
  // }

  // const enableEditing = () => {
  //   setEditingValue(value ? value : '')
  //   setPristine(true)
  //   setEditing(true)
  // }
  const [editTaxModal, setEditTaxModal] = useState(false)
  const [saveButtonStatus, setSaveButtonStatus] = useState(true)
  const [taxValue, setTaxValue] = useState(0)

  useEffect(() => {
    if(editing && pristine) {
      inputRef.current.lastChild.focus()
    }
  }, [editing, pristine])

  const [updateBudgetFieldValue] =
    useMutation(
      UPDATE_BUDGET_FIELD_VALUE,
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
          client.writeQuery({
            query: GLOBAL_MESSAGE,
            data: {
              globalMessage: {
                message: "Cambio guardado con exito",
                type: "success",
                __typename: "globalMessage"
              }
            }
          })
        }
      }
    )

  const saveTaxValue = () => {
    updateBudgetFieldValue({
      variables:{
        "id": budgetFieldValue.id,
        "value": parseInt(taxValue) * 100
      }
    })
    setEditTaxModal(!editTaxModal)
  }

  const inferOperatorAdornment = () => {
    if(templateField.operator === 'percentile') {
      return(`%${templateField.defaultValue || 0}`)
    }
  }

  const formatValue = (value) => {
    value = value || 0
    return((value * 1.0) / 100).toFixed(2)
  }

  const editTaxModalState = () => {
    setEditTaxModal(!editTaxModal)
  }

  const taxValueChange = (event) => {
    setTaxValue(event.target.value);
    setSaveButtonStatus(false)
  }

  const loadChip = () => {
    return(
      <>
        <Chip onClick={editTaxModalState}
          icon={<AttachMoneyIcon/>}
          label={`${formatValue(budgetFieldValue.value)}`}
          onDelete={editTaxModalState}
          deleteIcon={<EditIcon />}

        />
        <Dialog open={editTaxModal} onClose={editTaxModalState}>
          <DialogTitle>
            Ingrese el monto deseado
          </DialogTitle>
          <DialogContent>
            <TextField
                onChange={taxValueChange}
                label="Impuesto"
                id="margin-normal"
                margin="normal"
                required
                InputProps={{
                  inputComponent: NumberFormatCustom,
                  startAdornment: <InputAdornment position="start">$</InputAdornment>
                }}
              />
          </DialogContent>
          <DialogActions>
            <Button onClick={editTaxModalState}>
              Cancelar
            </Button>
            <Button
              onClick={saveTaxValue}
              disabled={saveButtonStatus}
            >
              Guardar
            </Button>
          </DialogActions>
        </Dialog>
      </>
    )
  }

  return(
    <Grid container item>
      <Grid container item direction="row" justifyContent="flex-end">
        <Grid item container spacing={5}>
          <Grid item>
            {templateField.operator === "percentile" ?
              <Chip label={`${inferOperatorAdornment()}`} variant="outlined" color='secondary' />
            :
              <></>
            }
          </Grid>
          <Grid item >
            {budgetFieldValue && loadChip()}
          </Grid>
        </Grid>
        {/*
          <TextField
            onChange={editing ? handleChange : () => {}}
            label="Total"
            disabled={!editing}
            value={editing ? editingValue : value}
            id="standard-start-adornment"
            InputProps={{
              ref: inputRef,
              inputComponent: NumberFormatCustom,
              startAdornment: <InputAdornment position="start">{inferOperatorAdornment()}</InputAdornment>
            }}/>
        */}
      </Grid>
      {/* <Grid  container item xs={4} alignItems="flex-end" justifyContent="center">
        <Button onClick={editing ? cancelEditing : enableEditing}>
          { editing ? <ClearIcon/> : <BorderColorIcon/> }
        </Button>
      </Grid> */}
    </Grid>
  )
} 

export default TotalValue
