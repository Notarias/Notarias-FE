import React, { useState }                      from 'react';
import Grid                                     from '@material-ui/core/Grid';
import FormControlLabel                         from '@material-ui/core/FormControlLabel';
import Button                                   from '@material-ui/core/Button';
import Switch                                   from '@material-ui/core/Switch';
import Dialog                                   from '@material-ui/core/Dialog';
import DialogActions                            from '@material-ui/core/DialogActions';
import DialogContent                            from '@material-ui/core/DialogContent';
import DialogTitle                              from '@material-ui/core/DialogTitle';
import Tooltip                                  from '@material-ui/core/Tooltip';
import StarIcon                                 from '@material-ui/icons/StarRate';
import PowerSettingsNewIcon                     from '@material-ui/icons/PowerSettingsNew';
import PrintIcon                                from '@material-ui/icons/Print';
import PrintDisabledIcon                        from '@material-ui/icons/PrintDisabled';
import VerticalAlignTopIcon                     from '@material-ui/icons/VerticalAlignTop';
import VerticalAlignBottomIcon                  from '@material-ui/icons/VerticalAlignBottom';
import HelpIcon                                 from '@material-ui/icons/Help';
import { yellow, green, indigo, grey }          from '@material-ui/core/colors';
import { withStyles }                           from '@material-ui/core/styles';
import { styles }                               from '../styles';

const FieldSettingsDialog = (props) => {

  const {
    settingsDialog,
    openSettingsDialog,
    updateProceduresTemplateTabFieldMutation,
  } = props

  const PrintPositionSwitch = withStyles({
    switchBase: {
      color: indigo[500]
    },
    checked: {},
    track: {},
  })(Switch);


  const [active, setActive] = useState(props.active);
  const [favourite, setFavourite] = useState(props.favourite);
  const [printable, setPrintable] = useState(props.printable);
  const [printPosition, setPrintPosition] = useState(props.printPosition === "bottom")


  const checkFavoriteField = () => {
    updateProceduresTemplateTabFieldMutation({ variables: { id: props.id, favourite: !favourite }})
    setFavourite(!favourite);
  };

  const checkPrintableField = (event) => {
    updateProceduresTemplateTabFieldMutation({ variables: { id: props.id, printable: !printable }})
    setPrintable(!printable);
  }

  const checkPrintPositionField = (event) => {
    !printPosition ?
      updateProceduresTemplateTabFieldMutation({ variables: { id: props.id, printPosition: "bottom" }})
    :
      updateProceduresTemplateTabFieldMutation({ variables: { id: props.id, printPosition: "top" }})
    setPrintPosition(!printPosition);
  }

  const changeFieldStatus = (event) => {
    updateProceduresTemplateTabFieldMutation({ variables: { id: props.id, active: !active }})
    setActive(!active)
  };


  return(
    <Dialog 
      open={ settingsDialog }
      onClose={ openSettingsDialog }
      aria-labelledby="preferences-aletrt"
      aria-describedby="preferences-alert-dialog"
      maxWidth="xs"
    >
      <DialogTitle id="preferences-alert">
        Propiedades del Campo
      </DialogTitle>
      <DialogContent>
        <Grid container>
          <Grid container item xs={12} justifyContent='center'>
            <Grid container item xs={2} justifyContent='center'>
              <StarIcon fontSize="large" style={favourite ? {color: yellow[700]} : {color: grey[500]}}/>
            </Grid>
            <Grid item xs={7}>
              <FormControlLabel
                control={
                  <Switch
                    checked={favourite}
                    onChange={checkFavoriteField}
                    color="primary"
                    name={"favourite"}
                  />
                }
                label="Favorito"
              />
              <Tooltip title="Marca el campo como favorito">
                <HelpIcon/>
              </Tooltip>
            </Grid>
          </Grid>
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
                label={printable ? "Imprimible" : "No Imprimible"}
              />
              <Tooltip title="Muestra el campo en el documento imprimible del presupuesto">
                <HelpIcon/>
              </Tooltip>
            </Grid>
          </Grid>
          <Grid container item xs={12} justifyContent='center'>
            <Grid container item xs={2} justifyContent='center'>
              {printable ?
                printPosition ? 
                  <VerticalAlignBottomIcon fontSize="large" style={printable ? {color: indigo[500]} : {color: grey[500]}}/>
                :
                  <VerticalAlignTopIcon fontSize="large" style={printable ? {color: indigo[500]} : {color: grey[500]}}/>
              :
                <PrintDisabledIcon fontSize="large" style={{color: grey[500]}}/>
              }
            </Grid>
            <Grid item xs={7}>
              <FormControlLabel
                disabled={!printable}
                control={
                  <PrintPositionSwitch
                    checked={printPosition}
                    onChange={checkPrintPositionField}
                    color="primary"
                    name={"printPosition"}
                  />
                }
                label={printable ? printPosition ? "Al Final" : "Al Inicio" : "No Disponible"}
              />
              <Tooltip title="Selecciona la pocicion del campo en el presupuesto imprimible, este campo se deshabilitara si el campo no es imprimible">
                <HelpIcon/>
              </Tooltip>
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={ openSettingsDialog } >
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default withStyles(styles)(FieldSettingsDialog);
