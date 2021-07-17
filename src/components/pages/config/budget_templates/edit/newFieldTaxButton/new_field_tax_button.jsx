import React           from 'react';
import Button          from '@material-ui/core/Button';
import Grid            from '@material-ui/core/Grid';
import { styles }      from '../../styles';
import { withStyles }  from '@material-ui/core/styles';
import AddIcon         from '@material-ui/icons/Add'
import Dialog          from '@material-ui/core/Dialog';
import DialogContent   from '@material-ui/core/DialogContent';
import DialogTitle     from '@material-ui/core/DialogTitle';
import DialogActions   from '@material-ui/core/DialogActions';
import Divider         from '@material-ui/core/Divider';
import FieldSearch     from './field_search';

const NewFliedTaxButton = (props) => {
  const { classes, templateData } = props

  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false)
  }

  const handleOpen = () => {
    setOpen(true)
  }

  return(
    <Grid container item justifyContent="flex-start" alignItems="center" className={ classes.addTaxFieldButton } xs={6}>
      <Button
        variant="contained"
        size="small"
        className={ classes.addTaxFieldButtonColor }
        onClick={handleOpen}
      >
        Impuestos  <AddIcon className={ classes.addIconMargin }/>
      </Button>
      <Dialog open={open} onClose={ handleClose }>
        <DialogTitle 
          id="simple-dialog-title"
          className={ classes.tittleDialogWidth }
        >
          Rellena los campos para continuar
        </DialogTitle >
        <Divider/>
        <DialogContent>
          <FieldSearch
            templateData={templateData}
          />
          {/* <Grid container direction="row" alignItems="center"  >
            <Grid container item xs={6} alignItems="center" justifyContent="center" >
              <FormControl variant="outlined">
                <OutlinedInput
                  id="percentage"
                  defaultValue={(Number("3"))}
                  endAdornment={<InputAdornment className={classes.InputAdornmentInPercentage} position="end">%</InputAdornment>}
                  size="small"
                  type="number"
                  className={classes.InputPercentage}
                />
              </FormControl>
            </Grid>
            <Grid container item xs={6} alignItems="center" justifyContent="center" >
              <FormControl className={classes.operatorMenu}>
                <InputLabel id="demo-simple-select-label">Operador</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={operator}
                  onChange={handleOperatorChange}
                  // className={classes.operatorMenu}
                >
                  <MenuItem value={"uno"}>uno</MenuItem>
                  <MenuItem value={"dos"}>dos</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} >
              <FieldSearch/>
            </Grid>
          </Grid> */}
        </DialogContent>
        <Divider/>
        <DialogActions>
          <Grid container direction="row" justifyContent="flex-end">
            <Button onClick={ handleClose }>
              Cancelar
            </Button>
            <Button 
              color="primary"
              variant="contained"
              disabled
            >
              Añadir campo
            </Button>
          </Grid>
        </DialogActions>
      </Dialog>
    </Grid>
  )
}

export default withStyles(styles)(NewFliedTaxButton);