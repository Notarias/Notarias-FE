import React, { useState }       from 'react';
import IconButton                from '@material-ui/core/IconButton';
import AssignmentTurnedInIcon    from '@material-ui/icons/AssignmentTurnedIn';
import Tooltip                   from '@material-ui/core/Tooltip';
import StartProcedure            from './start_procedeure';
import { green }                 from '@material-ui/core/colors';

const StartProcedureButton = (props) => {

  const { budget, procedure } = props;
  const [dialog, setDialog] = useState(false);

  const openDialog = () => {
    setDialog(!dialog);
  }

  return(
    <>
      <Tooltip title={procedure.serialNumber ? "Tramite Iniciado" : "Iniciar Tramite"}>
        <IconButton onClick={openDialog} style={procedure.serialNumber ? { color: green[500] } : {  }} >
          <AssignmentTurnedInIcon/>
        </IconButton>
      </Tooltip>
      <StartProcedure budget={budget} procedure={procedure} dialog={dialog} setDialog={setDialog} openDialog={openDialog}/>
    </>
  )
}

export default StartProcedureButton;
