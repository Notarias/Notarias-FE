import React, { useState }  from 'react'
import { withStyles }       from '@material-ui/core/styles';
import { styles }           from '../../styles';
import { Link }             from 'react-router-dom';
import { BASE_URI }         from '../../../../../apollo';
import Grid                 from '@material-ui/core/Grid';
import Hidden               from '@material-ui/core/Hidden';
import Divider              from '@material-ui/core/Divider';
import List                 from '@material-ui/core/List';
import ListItem             from '@material-ui/core/ListItem';
import ListItemIcon         from '@material-ui/core/ListItemIcon';
import ListItemText         from '@material-ui/core/ListItemText';
import SwipeableDrawer      from '@material-ui/core/SwipeableDrawer';
import Collapse             from '@material-ui/core/Collapse';
import IconButton           from '@material-ui/core/IconButton';
import PostAddIcon          from '@material-ui/icons/PostAdd';
import MenuIcon             from '@material-ui/icons/Menu';
import PrintIcon            from '@material-ui/icons/Print';
import VisibilityIcon       from '@material-ui/icons/Visibility';
import AttachmentIcon       from '@material-ui/icons/Attachment';
import DoneAllIcon          from '@material-ui/icons/DoneAll';
import MoreHorizIcon        from '@material-ui/icons/MoreHoriz';
import ExpandLess           from '@material-ui/icons/ExpandLess';
import ExpandMore           from '@material-ui/icons/ExpandMore';
import AttachMoneyIcon      from '@material-ui/icons/AttachMoney';
import GeneralInformation   from './general_information';
import CommentsList         from './comments_list/comments_list';
import AuditLog             from './audit_log';

import CompleteBudget       from './complete_budget';
import BudgetNewPayment     from './budget_new_payment';
import CreditPaymentList    from '../../edit/credit_payment_list/credit_payment_list';

import Tabs                 from '@material-ui/core/Tabs';
import Tab                  from '@material-ui/core/Tab';
import { green }            from '@material-ui/core/colors';
import { Typography } from '@material-ui/core';
import NewBudgetDialog from './new_budget_dialog';

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

const Activities = (props) => {
  const { budget, loadingBudget } = props
  const [activity, setActivity] = useState(0);
  const [drawerState, setDrawerState] = useState(false);
  const [completeDialog, setCompleteDialog] = useState(false);
  const [newPaymentDialog, setNewPaymentDialog] = useState(false);
  const [newBudgetDialog, setNewBudgetDialog] = useState(false);
  const [moreActions, setMoreActions] = useState(false);

  const renderActivitiesMenu = () => {
    switch (activity) {
      case 0 :
        return(<GeneralInformation budget={budget} loadingBudget={loadingBudget}/>)
      case 1 :
        return(<CommentsList budget={budget}/>)
      case 2 :
        return(<AuditLog budget={budget}/>)
      default :
        return(<></>)
    }
  }

  const handleChange = (event, newValue) => {
    setActivity(newValue);
    closeDrawer();
  }

  const selectActivity = (event, index) => {
    setActivity(index);
    closeDrawer();
  }

  const openDrawer = (event) => {
    setDrawerState(true);
  }

  const closeDrawer = (event) => {
    setDrawerState(false);
  }

  const openCompleteDialog = () => {
    setCompleteDialog(!completeDialog);
  }

  const openNewPaymentDialog = () => {
    setNewPaymentDialog(!newPaymentDialog);
  }

  const expandActions = () => {
    setMoreActions(!moreActions);
  }

  const openNewBudgetDialog = () => {
    setNewBudgetDialog(!newBudgetDialog);
  }

  return(
    <Grid container direction="column" justifyContent="flex-start" alignItems="stretch">
      <Divider />
      <Hidden mdDown>
        <Grid container item direction="row" justifyContent='center'>
          <Tabs id="tabs" centered value={activity} indicatorColor='primary' textColor='primary' onChange={selectActivity}>
            <Tab label='General'/>
            <Tab label='Comentarios'/>
            <Tab label='Historial'/>
          </Tabs>
        </Grid>
      </Hidden>
      <Hidden lgUp>
        <Grid container item direction="row" justifyContent='flex-end' alignItems='center'>
          <Grid item>
            <Typography variant="button" color='primary'>
              {activity > 0 ? 
                activity === 1 ? "Comentarios" : "Historial"
              :
                "General"
              }
            </Typography>
          </Grid>
          <Grid item>
            <IconButton
              aria-controls="activity-menu"
              aria-haspopup="true"
              variant="contained"
              color="primary"
              onClick={openDrawer}
            >
              <MenuIcon />
            </IconButton>
          </Grid>
          <SwipeableDrawer
            anchor='right'
            open={drawerState}
            onClose={closeDrawer}
            onOpen={openDrawer}
          >
            <Tabs id="tabs" 
              centered 
              indicatorColor='primary' 
              textColor='primary' 
              orientation="vertical"
              onChange={handleChange}
              value={activity}
              style={{width:'280px'}}
            >
              <Tab label='General'/>
              <Tab label='Comentarios'/>
              <Tab label='Historial'/>
            </Tabs>
            <Divider />

            <List>
              <ListItemLink key="print" href={`http://${BASE_URI}/invoices/${budget.id}.pdf?auth=${localStorage.getItem('jwtToken')}`} target='_blank'>
                <ListItemIcon>
                  <PrintIcon />
                </ListItemIcon>
                <ListItemText primary="Imprimir"/>
              </ListItemLink>
              <Link
                to={`/budgets/${ budget.id }/invoice`}
                style={{ textDecoration: 'none', color: "black" }}
              >
                <ListItem key="preview" button>
                  <ListItemIcon>
                    <VisibilityIcon/>
                  </ListItemIcon>
                  <ListItemText primary="Vista Previa"/>
                </ListItem>
              </Link>
              <ListItem key="uploadDocs" button onClick={closeDrawer}>
                <ListItemIcon>
                  <AttachmentIcon/>
                </ListItemIcon>
                <ListItemText primary="Subir Documentos"/>
              </ListItem>
              <ListItem key="complete" button onClick={openCompleteDialog}>
                <ListItemIcon>
                  <DoneAllIcon style={budget.completedAt ? { color: green[500] } : {}}/>
                </ListItemIcon>
                <ListItemText primary={budget.completedAt ? "Desmarcar Completado" : "Marcar Completado"}/>
              </ListItem>
              <ListItem key="newBudget" button onClick={openNewBudgetDialog}>
                <ListItemIcon>
                  <PostAddIcon/>
                </ListItemIcon>
                <ListItemText primary="Nuevo Presupuesto"/>
              </ListItem>

              <ListItem key="payments" button onClick={expandActions}>
                <ListItemIcon>
                  <MoreHorizIcon />
                </ListItemIcon>
                <ListItemText primary="Ingresos" />
                {moreActions ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Divider />
              <Collapse in={moreActions} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItem button key="1-payment"onClick={openNewPaymentDialog}>
                    <ListItemIcon><AttachMoneyIcon/></ListItemIcon>
                    <ListItemText primary="Nuevo Ingreso" />
                  </ListItem>
                  <CreditPaymentList budget={budget}/>
                </List>
              </Collapse>
            </List>
            <CompleteBudget 
              budget={budget} 
              dialog={completeDialog} 
              setDialog={setCompleteDialog} 
              openDialog={openCompleteDialog}/>
            <BudgetNewPayment 
              budget={budget} 
              open={newPaymentDialog} 
              openDialog={openNewPaymentDialog}/>
            <NewBudgetDialog 
              budget={budget} 
              dialog={newBudgetDialog} 
              setDialog={setNewBudgetDialog} 
              openDialog={openNewBudgetDialog}/>
          </SwipeableDrawer>

        </Grid>
      </Hidden>
        <Divider />
        <Grid item container justifyContent='flex-start' style={{ flexGrow: '1', paddingLeft: "20px", paddingTop: "11px", paddingRight: "20px"}}>
          { renderActivitiesMenu() }
        </Grid>
      </Grid>
    )
  }

  export default withStyles(styles)(Activities);
