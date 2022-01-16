import React, { useState } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Dialog from '@material-ui/core/Dialog';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import SelectAsigneeDialog from './../select_asignee_dialog'

export default (props) => {
  const { asignee, setAsignee } = props;

  const [openDialog, setOpenDialog] = useState(false);

  const clickCloseAsigneeDialog = () => {
    setOpenDialog(false);
  }

  const clickOpenAsigneeDialog = () => {
    setOpenDialog(true);
  }

  return(
    <React.Fragment key='asignee-data-fragment'>
      <ListItem button key="asignee-data" style={{ paddingBottom: '0px' }}>
        <ListItemText primaryTypographyProps={{ variant: 'h6' }} primary="Responsable"/>
      </ListItem>

      <ListItem button key="asignee-data" style={{ paddingBottom: '0px' }}>
        <Chip
          onClick={clickOpenAsigneeDialog}
          color="primary"
          label={asignee ? asignee.fullName : 'Asignar Responsable'}
          // onDelete={handleDelete}
          avatar={<Avatar src={asignee.avatarThumbUrl} />}
        />
      </ListItem>
      <Dialog onClose={clickCloseAsigneeDialog} aria-labelledby="simple-dialog-title" open={openDialog}>
        <SelectAsigneeDialog asignee={asignee} setAsignee={setAsignee} closeAsigneeDialog={clickCloseAsigneeDialog}/>
      </Dialog>
    </React.Fragment>
  )
}