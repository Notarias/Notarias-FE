import React                          from 'react';
import Grid                           from '@material-ui/core/Grid';
import TextField                      from '@material-ui/core/TextField';
import StarsIcon                      from '@material-ui/icons/Stars';
import FormControlLabel               from '@material-ui/core/FormControlLabel';
import Checkbox                       from '@material-ui/core/Checkbox';
import StarBorderIcon                 from '@material-ui/icons/StarBorder';
import Button                         from '@material-ui/core/Button';
import DeleteForeverIcon              from '@material-ui/icons/DeleteForever';
import { withStyles }                 from '@material-ui/core/styles';
import { styles }                     from '../styles';
import FormControl                    from '@material-ui/core/FormControl';
import Select                         from '@material-ui/core/Select';
import MenuItem                       from '@material-ui/core/MenuItem';
import InputLabel                     from '@material-ui/core/InputLabel';
import Dialog                         from '@material-ui/core/Dialog';
import DialogActions                  from '@material-ui/core/DialogActions';
import DialogContent                  from '@material-ui/core/DialogContent';
import DialogTitle                    from '@material-ui/core/DialogTitle';
import Paper                          from '@material-ui/core/Paper';
import Typography                         from '@material-ui/core/Typography';
import SaveIcon                           from '@material-ui/icons/Save';
import CreateIcon                         from '@material-ui/icons/Create';
import { useMutation }                    from '@apollo/react-hooks';
import { UPDATE_PROCEDURES_TEMPLATE_TAB_FIELD }     from '../queries_and_mutations/queries'

import RadioButtonUncheckedIcon       from '@material-ui/icons/RadioButtonUnchecked';
import RadioButtonCheckedIcon         from '@material-ui/icons/RadioButtonChecked';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import LabelOffIcon from '@material-ui/icons/LabelOff';

import Switch             from '@material-ui/core/Switch';

const INPUT_TYPES = {
  string: "Texto",
  number: "Numerico",
  file: "Archivo",
}

const Field = (props) => {

  const { classes, id, groupId } = props
  // const { removeFromList } = props
  
  const [open, setOpen] = React.useState(false);
  const [openb, setOpenb] = React.useState(false);
    const [openDialog, setOpenDialog] = React.useState(false);
  const [editing, setEditing] = React.useState(true);
  const[name, setName] = React.useState(props.name)
  const[style, setStyle] = React.useState(props.style)
  const[active, setActive] = React.useState(true)
  const [favourite, setFavourite] = React.useState(props.favourite)

  const [updateProceduresTemplateTabFieldMutation, updateProcessInfo] =
  useMutation(
    UPDATE_PROCEDURES_TEMPLATE_TAB_FIELD,
    {
      // onError(apolloError) {
      //   setErrors(apolloError)
      // },
      update(store, cacheData) {
        setFavourite(cacheData.data.updateProceduresTemplateField.proceduresTemplateField.favourite)
        // console.log(cacheData.data.updateProceduresTemplateField.proceduresTemplateField.favourite, "---2--")
        // // setError(false)
        // setPristine(true)
        // const clientAttrsData = store.readQuery({ query: GET_CLIENT_ATTRIBUTE });
      }
    }
  )

  const updateField = (event) => {
    updateProceduresTemplateTabFieldMutation({ variables: { id: id, name: name, style: style, active: active }})
    setEditing(!editing)
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpenb = () => {
    setOpenb(true);
  }

  const handleCloseb = () => {
    setOpenb(false);
  };

  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  }

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const checkedStar = () => {
    updateProceduresTemplateTabFieldMutation({ variables: { id: id, favourite: !favourite }})
    setOpenb(false);
  }

  const changeFieldStatus = (event) => {
    // updateProceduresTemplateTabFieldMutation({ variables: { id: id, active: !active }})
    setActive(!active)
    setOpenDialog(false);
  }

  const colorButton = () => {
    if (favourite === true) {
      return 'secondary'
    } else {
      return "primary"
    }
  }

  const deleteFieldClick = () => {
    // removeFromList(props.arrayIndex);
    setOpen(false);
  }

  const editField = () => {
    setEditing(!editing)
  }

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleStyleChange = (event) => {
    setStyle(event.target.value);
    // setPristine(false)
  };

  const statusField = () => { 
    return active ? "Desactivar" : "Activar"
  }

  const renderTextField = () => {
    return(
      <>
        <Grid container item xs={1} alignItems="center" justify="center">
          <Button
            onClick={ editField }
          >
            <CreateIcon/>
          </Button>
        </Grid>
        <Grid container item xs={5}>
          <Typography className={ classes.texPlainTittleName }>
            { name } { id } -{ groupId }
          </Typography>
        </Grid>
        <Grid container item xs={3}>
        <Typography className={ classes.textTittleType }>
            {  INPUT_TYPES[style] }
          </Typography>
        </Grid>
      </>
    )
  }

  const renderInputField = () => {
    return(
      <>
        <Grid container item xs={1} alignItems="center" justify="center">
          <Button
            onClick={ updateField }
          >
            <SaveIcon />
          </Button>
        </Grid>
        <Grid container item xs={5}>
          <TextField 
            id="standard-basic" 
            label="Nombre del campo"
            className={ classes.textInputTittleName }
            value={ name }
            onChange={ handleNameChange }
          />
        </Grid>
        <Grid container item xs={3}>
          <FormControl variant="outlined" className={ classes.textFieldTittleType }>
            <InputLabel id="label-field">Tipo de campo</InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              name='name'
              value={ style }
              onChange={ handleStyleChange }
            >
              <MenuItem key='string' value={'string'}>Texto</MenuItem>
              <MenuItem key='number' value={'number'}>Numerico</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </>
    )
  }


  console.log("field-active", props.active)
  return (
    <Grid container item alignItems="flex-start" justify="flex-start" className={ classes.fielPaddingBottom }>
      <Paper>
      <Grid container item className={ classes.fieldHeightRow }>
        { editing ? renderTextField() : renderInputField() }
        <Grid container item direction="column"  alignItems="center" justify="center" item xs={1}>
          <FormControlLabel
            control={<Checkbox 
              icon={<StarBorderIcon />} 
              checkedIcon={<StarsIcon />} 
              name="favourite"
              checked={ favourite }
            />}
            label=" "
            color="primary"
            className={ classes.formControlPadding }
            onChange={ handleClickOpenb }
          />
          <Dialog
            open={openb}
            onClose={handleClose}
            aria-labelledby="favorite-alert"
            aria-describedby="favorite-alert-dialog"
          >
            <DialogTitle id="favorite-alert">
              { favourite === true ? "Eliminar Favorito": "Añadir Favorito"}
            </DialogTitle>
            <DialogContent>
            { favourite === true ? "Este campo dejará de ser importante": "Se marcará este campo como importante"}
            </DialogContent>
            <DialogActions>
              <Button onClick={ handleCloseb } color="secondary">
                Cancelar
              </Button>
              <Button color={ colorButton() } autoFocus onClick={ checkedStar } variant="contained">
                { favourite ? "Quitar": "Añadir"}
              </Button>
            </DialogActions>
          </Dialog>
        </Grid>
        <Grid container item direction="column"  alignItems="center" justify="center" item xs={1}>
          <Button onClick={ handleClickOpen }>
            <DeleteForeverIcon/>
          </Button>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"Eliminar campo"}</DialogTitle>
            <DialogContent>
              Se eliminara de manera permantente este campo
            </DialogContent>
            <DialogActions>
              <Button onClick={ handleClose } color="secondary">
                Cancelar
              </Button>
              <Button color="primary" autoFocus onClick={ deleteFieldClick }>
                Borrar
              </Button>
            </DialogActions>
          </Dialog>
        </Grid>
        <Grid container item direction="column"  alignItems="center" justify="center" item xs={1} onClick={ handleClickOpenDialog }>

          {
          active ?
            <Button>
              <RadioButtonUncheckedIcon color="secondary" className={ classes.defaultIcon }/>
            </Button>
          :
            <Button>
              <RadioButtonCheckedIcon className={classes.radioButtonActiveGreen}/>
            </Button>
        }
            {/* <FormControlLabel
              value="top"
              control={
                <Switch 
                  color="primary" 
                  // onChange={ handleDialogActiveChange } 
                  // checked={ active } 
                />
              }
              labelPlacement="top"
              onClick={ handleClickOpenDialog }
            /> */}
        </Grid>
        
        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title"> Deseas {statusField()}</DialogTitle>
          <DialogContent>
            Realmente deseas { statusField() }
          </DialogContent>
          <DialogActions>
            <Button onClick={ handleCloseDialog } color="secondary">
              Cancelar
            </Button>
            <Button
              color="primary"
              autoFocus
              onClick={ changeFieldStatus }
            >
              { statusField() }
            </Button>
          </DialogActions>
        </Dialog>

      </Grid>
      </Paper>
    </Grid>
  )
}


export default  withStyles(styles)(Field);
