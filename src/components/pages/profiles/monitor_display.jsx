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

const MonitorDisplay = (props) => {
  const { currentUser, panelStatus, switchPanelStatus } = props
  return(

    <Grid container direction='row'justifyContent='center' >
      <Grid item container xs={3} justifyContent='center' alignItems='center'>
        <Grid item container xs={8} direction='column'>
          <Grid item container xs alignItems='center'>
            <Button
              component={Link}
              to="/profiles/general"
              color={panelStatus ? 'default' : 'primary'} 
              size='large' 
              fullWidth 
              onClick={panelStatus ? switchPanelStatus : null}
              startIcon={<ListAltIcon color={panelStatus ? 'default' : 'primary'}/>}
            >
              General
            </Button>
          </Grid>
          <Grid item container xs alignItems='center'>
            <Button
              component={Link}
              to={"/profiles/security"}
              color={panelStatus ? 'primary' : 'default'} 
              size='large' 
              fullWidth 
              onClick={panelStatus? null : switchPanelStatus}
              startIcon={<LockIcon color={panelStatus ? 'primary' : 'default'}/>}
            >
              Seguridad
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid item container xs={9} justifyContent='center' alignItems='center'>
        <Grid item xs style={{paddingRight:'10%'}}>
          <Paper variant='outlined'>
            <Grid container direction='row' justifyContent='center' alignItems='center' style={{padding:'30px'}}>
              <Grid container item xs={6} justifyContent='center'>
                <AvatarUploader user={currentUser}/>
              </Grid>
              <Grid item xs={6}>
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

export default MonitorDisplay;
