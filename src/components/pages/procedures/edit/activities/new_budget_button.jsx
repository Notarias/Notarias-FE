import React, { useState }       from 'react';
import IconButton                from '@material-ui/core/IconButton';
import PostAddIcon               from '@material-ui/icons/PostAdd';
import Tooltip                   from '@material-ui/core/Tooltip';
import NewBudgetDialog           from './new_budget_dialog';

const NewBudgetButton = (props) => {

  const { procedure, budgetId } = props;
  const [dialog, setDialog] = useState(false);

  const openDialog = () => {
    setDialog(!dialog);
  }

  return(
    <>
      <Tooltip title="Nuevo Presupuesto">
        <IconButton color="default" onClick={openDialog}>
          <PostAddIcon/>
        </IconButton>
      </Tooltip>
      <NewBudgetDialog procedure={procedure} budgetId={budgetId} dialog={dialog} setDialog={setDialog} openDialog={openDialog}/>
    </>
  )
}

export default NewBudgetButton;
