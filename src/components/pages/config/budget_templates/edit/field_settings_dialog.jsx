import React, { useState }                    from 'react';
import Grid                                   from '@material-ui/core/Grid';
import Button                                 from '@material-ui/core/Button';
import FormControlLabel                       from '@material-ui/core/FormControlLabel';
import MonetizationOnIcon                     from '@material-ui/icons/MonetizationOn';
import Dialog                                 from '@material-ui/core/Dialog';
import DialogActions                          from '@material-ui/core/DialogActions';
import DialogContent                          from '@material-ui/core/DialogContent';
import DialogTitle                            from '@material-ui/core/DialogTitle';
import Switch                                 from '@material-ui/core/Switch';
import Tooltip                                from '@material-ui/core/Tooltip';
import PowerSettingsNewIcon                   from '@material-ui/icons/PowerSettingsNew';
import PrintIcon                              from '@material-ui/icons/Print';
import HelpIcon                               from '@material-ui/icons/Help';
import { yellow, green, indigo, grey }        from '@material-ui/core/colors';

const FieldSettingsDialog = (props) => {

  const {
    settingsDialog,
    openSettingsDialog,
    updateBudgetingTemplateTabFieldMutation
  } = props

  const [active, setActive] = useState(props.active || false);
  const [printable, setPrintable] = useState(props.printable || false);
  const [calculable, setCalculable] = useState(props.calculable || false);

  const changeFieldStatus = (event) => {
    updateBudgetingTemplateTabFieldMutation({ variables: { id: props.id, active: !active}})
    setActive(!active)
  }

  const checkPrintableField = (event) => {
    updateBudgetingTemplateTabFieldMutation({ variables: { id: props.id, printable: !printable }})
    setPrintable(!printable);
  }

  const checkCalculableField = (event) => {
    updateBudgetingTemplateTabFieldMutation({ variables: { id: props.id, calculable: !calculable }})
    setCalculable(!calculable);
  }

  return(
    <Dialog
      open={settingsDialog}
      onClose={openSettingsDialog}
      aria-labelledby="preferences-aletrt"
      aria-describedby="preferences-alert-dialog"
      maxWidth="xs"
    >
      <DialogTitle>
        Propiedades del Campo
      </DialogTitle>
      <DialogContent>
        <Grid container>
          <Grid container item xs={12} justifyContent='center'>
            <Grid container item xs={2} justifyContent='center'>
              <PowerSettingsNewIcon fontSize="large" style={active ? {color: green[500]} : {color: grey[500]}}/>
            </Grid>
            <Grid item xs={7}>
              <FormControlLabel
                control={
                  <Switch
                    checked={active}
                    onChange={changeFieldStatus}
                    color="primary"
                    name={"active"}
                  />
                }
                label={active ? "Activado" : "Desactivado"}
              />
              <Tooltip title="Activa o desactiva el campo">
                <HelpIcon/>
              </Tooltip>
            </Grid>
          </Grid>
          <Grid container item xs={12} justifyContent='center'>
            <Grid container item xs={2} justifyContent='center'>
              <PrintIcon fontSize="large" style={printable ? {color: indigo[500]} : {color: grey[500]}}/>
            </Grid>
            <Grid item xs={7}>
              <FormControlLabel
                control={
                  <Switch
                    checked={printable}
                    onChange={checkPrintableField}
                    color="primary"
                    name={"printable"}
                  />
                }
                label={`${printable ? "" : "No"} Imprimible`}
              />
              <Tooltip title="Muestra el campo en el documento imprimible del presupuesto">
                <HelpIcon/>
              </Tooltip>
            </Grid>
          </Grid>

          <Grid container item xs={12} justifyContent='center'>
            <Grid container item xs={2} justifyContent='center'>
              <MonetizationOnIcon fontSize="large" style={calculable ? {color: yellow[700]} : {color: grey[500]}}/>
            </Grid>
            <Grid item xs={7}>
              <FormControlLabel
                control={
                  <Switch
                    checked={calculable}
                    onChange={checkCalculableField}
                    color="primary"
                    name={"printable"}
                  />
                }
                label={`${calculable ? "" : "No"} Calculable`}
              />
              <Tooltip title={`El campo ${calculable ? "" : "no"} se tomara en cuenta para los calculos totales`}>
                <HelpIcon/>
              </Tooltip>
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={ openSettingsDialog }> Cerrar </Button>
      </DialogActions>
    </Dialog>
  )
}

export default FieldSettingsDialog;
