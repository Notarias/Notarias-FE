import React, { useState }       from 'react';
import IconButton                from '@material-ui/core/IconButton';
import PostAddIcon               from '@material-ui/icons/PostAdd';
import Tooltip                   from '@material-ui/core/Tooltip';
import NewProcedureDialog        from './new_procedure_dialog';

const NewProcedureButton = (props) => {

  const { procedure } = props;
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
      <NewProcedureDialog procedure={procedure} dialog={dialog} setDialog={setDialog} openDialog={openDialog}/>
    </>
  )
}

export default NewProcedureButton;
