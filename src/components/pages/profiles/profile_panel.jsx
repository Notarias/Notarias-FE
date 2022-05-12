import React, { useState }        from 'react';
import { Link }                   from 'react-router-dom';
import Typography                 from '@material-ui/core/Typography';
import LockIcon                   from '@material-ui/icons/Lock';
import ListAltIcon                from '@material-ui/icons/ListAlt';
import Button                     from '@material-ui/core/Button';
import Grid                       from '@material-ui/core/Grid';
import Paper                      from '@material-ui/core/Paper';
import Divider                    from '@material-ui/core/Divider';
import AvatarUploader             from './avatar_uploader';
import GeneralForm                from './general_form';
import SecurityForm               from './security_form';
import Breadcrumbs                from '../../ui/breadcrumbs';
import ProtectedRoute             from '../../../routes/protected_route';

const BREADCRUMBS = [
  { name: "Perfil", path: "/" },
]

const ProfilePanel = (props) => {
  const { currentUser } = props

  const [panelStatus, setPanelStatus] = useState(false);

  const switchPanelStatus = () => {
    setPanelStatus(!panelStatus);
  }

  return(
    <>
      <Breadcrumbs breadcrumbs={ BREADCRUMBS }/>
      <Divider style={{marginBottom: '50px'}}/>
      <Grid container direction='row'justifyContent='center' >
        <Grid item container xs={3} justifyContent='center' alignItems='center'>
          <Grid item container xs={8} direction='column'>
            <Grid item container xs justifyContent='center' style={{paddingBottom:'20px'}}>
              <Typography variant='h6'>
                Cuenta
              </Typography>
            </Grid>
            <Grid item container xs alignItems='center'>
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
            <Grid item container xs alignItems='center'>
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
        </Grid>
        <Grid item container xs={9} justifyContent='center' alignItems='center'>
          <Grid item xs style={{paddingRight:'10%'}}>
            <Paper variant='outlined'>
              <Grid container direction='row' justifyContent='center' alignItems='stretch' style={{padding:'30px'}}>
                <Grid item xs={6}>
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
    </>
  )
}

export default ProfilePanel;
