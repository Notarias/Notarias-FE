import React, { useState }        from 'react';
import GeneralForm                from './general_form';
import SecurityForm               from './security_form';
import { Link }                   from 'react-router-dom';
import { withStyles }             from '@material-ui/core/styles';
import Typography                 from '@material-ui/core/Typography';
import LockIcon                   from '@material-ui/icons/Lock';
import ListAltIcon                from '@material-ui/icons/ListAlt';
import Button                     from '@material-ui/core/Button';
import Grid                       from '@material-ui/core/Grid';
import Paper                      from '@material-ui/core/Paper';
import Divider                    from '@material-ui/core/Divider';
import ProtectedRoute             from '../../../routes/protected_route';
import Breadcrumbs                from '../../ui/breadcrumbs';
import styles                     from './styles';
import AvatarUploader             from './avatar_uploader';

const BREADCRUMBS = [
  { name: "Perfil", path: "/" },
]

const ProfilePanel = (props) => {
  const { classes, currentUser } = props

  const [panelStatus, setPanelStatus] = useState(true);

  const switchPanel = () => {
    setPanelStatus(!panelStatus);
  }
  return(
    <>
      <Breadcrumbs breadcrumbs={ BREADCRUMBS }/>
      <Divider style={{marginBottom: '100px'}}/>
      <Grid container direction='row'justifyContent='center'>
        <Grid item container xs={2} justifyContent='center' alignItems='center'>
          <Grid item container xs={8} direction='column' alignItems='baseline'>
            <Grid item container xs justifyContent='center' style={{paddingBottom:'20px'}}>
              <Typography variant='h6'>
                Cuenta
              </Typography>
            </Grid>
            <Grid item container xs alignItems='center'>
              <ListAltIcon color={panelStatus ? 'primary' : 'action'}/>
              <Link to="/profiles/general" style={{ textDecoration: 'none' }}>
                <Button 
                  color={panelStatus ? 'primary' : 'action'} 
                  size='large' 
                  fullWidth 
                  onClick={switchPanel}
                >
                  General
                </Button>
              </Link>
            </Grid>
            <Grid item container xs alignItems='center'>
              <LockIcon color={panelStatus ? 'action' : 'primary'}/>
              <Link to="/profiles/security" style={{ textDecoration: 'none' }}>
                <Button 
                  color={panelStatus ? 'action' : 'primary'} 
                  size='large' 
                  fullWidth 
                  onClick={switchPanel}
                >
                  Seguridad
                </Button>
              </Link>
            </Grid>
          </Grid>
        </Grid>
        <Grid item container xs={6} justifyContent='center' alignItems='center'>
          <Paper variant="outlined" style={{padding: '30px'}}>
            <Grid item container xs={12} direction='row' alignItems='center'>
              <Grid item container xs={6} justifyContent='center'>
                <AvatarUploader classes={ classes } user={currentUser}/>
              </Grid>

              <Grid item container xs={6} justifyContent='center' alignItems='stretch'>
                <Grid item>
                  <Typography variant="h5" style={{paddingBottom:'20px'}}>
                    Datos personales
                  </Typography>
                  <ProtectedRoute path="/profiles/security" component={SecurityForm} currentUser={ currentUser }/>
                  <ProtectedRoute path="/profiles/general" component={GeneralForm} currentUser={ currentUser }/>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </>
  )
}

export default withStyles(styles)(ProfilePanel);
