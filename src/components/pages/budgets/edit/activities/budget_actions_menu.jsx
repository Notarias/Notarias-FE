import React, { useState }        from 'react';
import MoreHorizIcon              from '@material-ui/icons/MoreHoriz';
import AttachMoneyIcon            from '@material-ui/icons/AttachMoney';
import MenuItem                   from '@material-ui/core/MenuItem';
import ListItemIcon               from '@material-ui/core/ListItemIcon';
import ListItemText               from '@material-ui/core/ListItemText';
import GenericDropdownMenu        from '../../../../ui/generic_dropdown_menu';
import CreditPaymentList          from '../../edit/credit_payment_list/credit_payment_list';
import BudgetNewPayment           from './budget_new_payment';

const BudgetActionsMenu = (props) => {
  const { budget } = props;

  const [open, setOpen] = useState(false);


  const openDialog = () => {
    setOpen(!open)
  }

  return(
    <>
      <GenericDropdownMenu icon={MoreHorizIcon}>
        <MenuItem key="1-payment" onClick={openDialog}>
          <ListItemIcon><AttachMoneyIcon/></ListItemIcon>
          <ListItemText primary="Nuevo Ingreso"/>
        </MenuItem>
        <CreditPaymentList key="2-creditPaymentList" budget={budget}/>
      </GenericDropdownMenu>
      <BudgetNewPayment budget={budget} open={open}  openDialog={openDialog}/>
    </>
  )
}

export default BudgetActionsMenu;
