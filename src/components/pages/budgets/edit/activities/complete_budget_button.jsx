import React, { useState }       from 'react';
import IconButton                from '@material-ui/core/IconButton';
import DoneAllIcon               from '@material-ui/icons/DoneAll';
import Tooltip                   from '@material-ui/core/Tooltip';
import CompleteBudget            from './complete_budget';
import { green }                 from '@material-ui/core/colors';

const CompleteBudgetButton = (props) => {

  const { budget } = props;
  const [dialog, setDialog] = useState(false);

  const openDialog = () => {
    setDialog(!dialog);
  }

  return(
    <>
      <Tooltip title={budget.completedAt ? "Desmarcar Completado" : "Marcar Completado"}>
        <IconButton onClick={openDialog} style={budget.completedAt ? { color: green[500] } : {  }} >
          <DoneAllIcon/>
        </IconButton>
      </Tooltip>
      <CompleteBudget budget={budget} dialog={dialog} setDialog={setDialog} openDialog={openDialog}/>
    </>
  )
}

export default CompleteBudgetButton;
