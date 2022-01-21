import React, { useState } from 'react'
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import ClientData from './wizard_summary/client_data';
import CausantData from './wizard_summary/causant_data';
import ProcedureData from './wizard_summary/procedure_data';
import BudgetData from './wizard_summary/budget_data';
import AsigneeData from './wizard_summary/asignee_data';

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: "280px",
    flexShrink: 0,
  },
  drawerPaper: {
    width: "300px",
  },
}));

export default (props) => {

  const localClasses = useStyles()

  const {
    classes,
    clientInfo,
    causantInfo,
    selectedProcedure,
    selectedBudget,
    asignee,
    setAsignee
  } = props;
  

  const [open, setOpen] = useState(false);

  const toggleDrawer = (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setOpen(!open)
  };

  return(
    <>
      <Button
        variant="contained"
        color="secondary"
        className={classes.button}
        onClick={toggleDrawer}
        startIcon={<VisibilityIcon />}>
        Resumen
      </Button>
      <Drawer
        anchor='right'
        open={open}
        onClose={toggleDrawer}
        classes={{
          root: localClasses.drawer,
          paperAnchorRight: localClasses.drawerPaper
        }}>
        <ClientData client={clientInfo}/>
        <Divider/>
        <CausantData causant={causantInfo}/>
        <Divider/>
        <ProcedureData procedure={selectedProcedure}/>
        <Divider/>
        <BudgetData budget={selectedBudget}/>
        <Divider/>
        <AsigneeData asignee={asignee} setAsignee={setAsignee} />
      </Drawer>
    </>
  )
};
