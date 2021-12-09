import React, { useState } from 'react';
import Grid                from '@material-ui/core/Grid';
import GenericDropdownMenu from '../../../../ui/generic_dropdown_menu';
import MoreHorizIcon       from '@material-ui/icons/MoreHoriz';
import MenuItem            from '@material-ui/core/MenuItem';
import ListItemText        from '@material-ui/core/ListItemText';
import Dialog              from '@material-ui/core/Dialog';
import DialogActions       from '@material-ui/core/DialogActions';
import DialogContent       from '@material-ui/core/DialogContent';
import DialogTitle         from '@material-ui/core/DialogTitle';
import FormControl         from '@material-ui/core/FormControl';
import InputLabel          from '@material-ui/core/InputLabel';
import Select              from '@material-ui/core/Select';
import TextField           from '@material-ui/core/TextField';
import InputAdornment      from '@material-ui/core/InputAdornment';
import Button              from '@material-ui/core/Button';
import { useMutation }     from '@apollo/client'
import CurrentUserAvatar   from '../current_user_avatar';
import PropTypes           from 'prop-types';
import NumberFormat        from 'react-number-format';
import {
  GET_PROCEDURES_AUDITLOG,
  GET_PROCEDURE
} from '../../queries_and_mutations/queries';

const ProcedureActions = (props) => {
  const { procedure } = props;

  const [open, setOpen]                 = useState(false)
  const [pristine, setPristine]         = useState(true)
  const [errors, setErrors]             = useState(false)

  const inputsList = ["total"]

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false);
    setPristine(false)
  }


  const getCurrentDate = (separator='/') => {
    let newDate = new Date()
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();

    return (`${year}${separator}${month<10?`0${month}`:`${month}`}${separator}${date}`)
  }

  return(
    <>
      <GenericDropdownMenu icon={MoreHorizIcon}>
        <MenuItem key="1-abono" onClick={handleClickOpen}>
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
