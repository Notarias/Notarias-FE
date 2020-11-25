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


const Field = (props) => {

  const { classes, id, name, type, favourite } = props
  // const { removeFromList } = props
  
  const [open, setOpen] = React.useState(false);
  const [openb, setOpenb] = React.useState(false);
  const [editing, setEditing] = React.useState(true);
  // const[name, setName] = React.useState(props.name)
  // const[type, setType] = React.useState(props.type)
  // const [favourite, setFavourite] = React.useState(props.favourite)
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

  const checkedStar = () => {
    // setFavourite(!favourite);
    setOpenb(false);
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
            { name }
          </Typography>
        </Grid>
        <Grid container item xs={4}>
        <Typography className={ classes.textTittleType }>
            { type === "string" ?  "Texto": "Numerico"}
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
            onClick={ editField }
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
          />
        </Grid>
        <Grid container item xs={4}>
          <FormControl variant="outlined" className={ classes.textFieldTittleType }>
            <InputLabel id="label-field">Tipo de campo</InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              name='name'
              value={ type }
            >
              <MenuItem key='string' value={'string'}>Texto</MenuItem>
              <MenuItem key='number' value={'number'}>Numerico</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </>
    )
  }


  return (
    <Grid container item alignItems="flex-start" justify="flex-start" className={ classes.fielPaddingBottom }>
      <Paper>
      <Grid container item className={ classes.fieldHeightRow }>
        { editing ? renderTextField() : renderInputField() }
        <Grid container item direction="column"  alignItems="center" justify="center" item xs={1}>
          <FormControlLabel
            control={<Checkbox icon={<StarBorderIcon />} 
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
                { favourite === true ? "Quitar": "Añadir"}
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
      </Grid>
      </Paper>
    </Grid>
  )
}


export default  withStyles(styles)(Field);
