import React          from 'react';
import GeneralForm    from './general_form';
import SecurityForm   from './security_form';
import { Link }       from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Button         from '@material-ui/core/Button';
import Grid           from '@material-ui/core/Grid';
import Paper          from '@material-ui/core/Paper';
import ProtectedRoute from '../../../routes/protected_route';
import styles         from './styles';
import AvatarUploader from './avatar_uploader';

const ProfilePanel = (props) => {
  const { classes, currentUser } = props
  return(
    <div className={classes.columsWraper}>
      <div className={classes.columMenu}>
        <div className={classes.profileMenu}>
          <h2 className={classes.h2Header}>Cuenta</h2>
          <div>
            <Link to="/profiles/general" style={{ textDecoration: 'none' }}>
              <Button color="primary" size='large' classes={ { root: classes.positionButton, label: classes.positionButtonLabel } }>General</Button>
            </Link>
          </div>
          <div>
            <Link to="/profiles/security" style={{ textDecoration: 'none' }}>
              <Button color="primary" size='large' classes={ { root: classes.positionButton, label: classes.positionButtonLabel } }>Seguridad</Button>
            </Link>
          </div>
        </div>
      </div>
      <div className={classes.columBody}>
      <Grid container alignItems='center' className={classes.gritFixed}>
        <Grid container item alignItems='center' justifyContent='center' xs={5}>
          <AvatarUploader classes={ classes } user={currentUser}/>
        </Grid>
        <Grid container item alignItems='center' xs={7}>
          <Grid item>
            <div className={classes.divFixes}>
              <h3 className={classes.h3Header}>Datos personales</h3>
            </div>
            <div className={classes.profileForm}>
              <Paper className={classes.paddingPaper}>
                <ProtectedRoute path="/profiles/security" component={SecurityForm} currentUser={ currentUser }/>
                <ProtectedRoute path="/profiles/general" component={GeneralForm} currentUser={ currentUser }/>
              </Paper>
            </div>
          </Grid>
        </Grid>
      </Grid>
      </div>
    </div>
  )
}

export default withStyles(styles)(ProfilePanel);
