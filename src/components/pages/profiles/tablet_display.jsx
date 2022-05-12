import React                      from 'react';
import { Link }                   from 'react-router-dom';
import LockIcon                   from '@material-ui/icons/Lock';
import ListAltIcon                from '@material-ui/icons/ListAlt';
import Button                     from '@material-ui/core/Button';
import Grid                       from '@material-ui/core/Grid';
import Paper                      from '@material-ui/core/Paper';
import AvatarUploader             from './avatar_uploader';
import GeneralForm                from './general_form';
import SecurityForm               from './security_form';
import ProtectedRoute             from '../../../routes/protected_route';

const TabletDisplay = (props) => {
  const { currentUser, panelStatus, switchPanelStatus } = props
  return(

    <Grid container spacing={3} direction='column' justifyContent='center' alignItems='center'>
        <Grid item container xs={8} direction='row'>
          <Grid item container xs={6}>
            <Button
              component={Link}
              to="/profiles/general"
              color={panelStatus ? 'action' : 'primary'} 
              size='large' 
              fullWidth 
              onClick={panelStatus ? switchPanelStatus : null}
              startIcon={<ListAltIcon color={panelStatus ? 'action' : 'primary'}/>}
            >
              General
            </Button>
          </Grid>
          <Grid item container xs={6}>
            <Button
              component={Link}
              to={"/profiles/security"}
              color={panelStatus ? 'primary' : 'action'} 
              size='large' 
              fullWidth 
              onClick={panelStatus? null : switchPanelStatus}
              startIcon={<LockIcon color={panelStatus ? 'primary' : 'action'}/>}
            >
              Seguridad
            </Button>
          </Grid>
        </Grid>
        <Grid item container xs={8} direction='row' justifyContent='center' alignContent='center'>
          <Grid item xs>
            <Paper variant='outlined'>
              <Grid container spacing={5} direction='column' alignContent='center' alignItems='stretch' style={{padding:'30px'}}>
                <Grid item xs>
                  <AvatarUploader user={currentUser}/>
                </Grid>
                <Grid item xs>
                  <ProtectedRoute path="/profiles/security" component={SecurityForm} currentUser={currentUser}/>
                  <ProtectedRoute path="/profiles/general" component={GeneralForm} currentUser={currentUser}/>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
    </Grid>
  )
}

export default TabletDisplay;
