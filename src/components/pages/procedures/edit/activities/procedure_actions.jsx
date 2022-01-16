import React               from 'react';
import GenericDropdownMenu from '../../../../ui/generic_dropdown_menu';
import MoreHorizIcon       from '@material-ui/icons/MoreHoriz';
import MenuItem            from '@material-ui/core/MenuItem';
import ListItemText        from '@material-ui/core/ListItemText';

const ProcedureActions = (props) => {
  return(
    <>
      <GenericDropdownMenu icon={MoreHorizIcon}>
        <MenuItem key="1-abono">
          <ListItemText primary="Nuevo Ingreso"/>
        </MenuItem>
        <MenuItem key="2-paymentList">
          Dropdrown
        </MenuItem>
      </GenericDropdownMenu>
    </>
  )
}

export default ProcedureActions;
