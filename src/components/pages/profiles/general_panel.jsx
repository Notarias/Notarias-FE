import React, { Component } from 'react';
import GeneralForm from './general_form';
import { Link }             from 'react-router-dom';
import H2 from './H2';
import H3 from './H3';
import Avatar           from '@material-ui/core/Avatar';
import UserDefaultImg from '../../../images/user_default_img.png';
import { withStyles }       from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';


const styles = (theme) => {
  return ({columsWraper:{
        height: '100%',
        backgroundColor: "white",
        display: 'flex',
      },
      columMenu: {
        backgroundColor: "#F7F7F7",
        width: '20%',
        height: '100%',
        display: 'inline-block',
        textAlign: 'left',
        paddingLeft: '15px',
        justifyContent: 'center',
      },
      profileMenu: {
        paddingLeft: '10px',
        marginTop: '40%',
        left: '10px',
      },
      columBody: {
        width:'80%',
        height: '100%',
        display: 'inline-block',
      },
      profileForm: {
        height: "60%",
        alingItems: "centered",
      },
      positionButton: {
        textTransform: "none",
        padding: "0",
        justifyContent: 'flex-start',
      },
      positionButtonLabel: {
        paddingLeft: "5px",
        paddingRight: "40px",
        display: 'default',
        alingItems: 'left',
      },
      gritFixed: {
        height: "100%",
      },
      divFixes: {
        paddingLeft: '20px',
      },
      large: {
        width: theme.spacing(36),
        height: theme.spacing(36),
      },
      paddingPaper: {
        padding: '20px',
      },
    }
  )
}

class GeneralPanel extends Component {

  render() {
    const { classes } = this.props
    return(
      <div className={classes.columsWraper}>
        <div className={classes.columMenu}>
          <div className={classes.profileMenu}>
            <H2>Cuenta</H2>
            <div>
              <Link to="/profile" style={{ textDecoration: 'none' }}>
                <Button color="primary" size='large' classes={ { root: classes.positionButton, label: classes.positionButtonLabel } }>General</Button>
              </Link>
            </div>
            <div>
              <Link to="/profile/security" style={{ textDecoration: 'none' }}>
                <Button color="primary" size='large' classes={ { root: classes.positionButton, label: classes.positionButtonLabel } }>Seguridad</Button>
              </Link>
            </div>
          </div>
        </div>
        <div className={classes.columBody}>
        <Grid container alignItems='center' className={classes.gritFixed}>
          <Grid container item alignItems='center' justify='center' xs={5}>
            <Avatar alt="default_img" src={UserDefaultImg} className={classes.large} />
          </Grid>
          <Grid container item alignItems='center' xs={7}>
            <Grid item>
              <div className={classes.divFixes}>
                <H3>Datos personales</H3>
              </div>
              <div className={classes.profileForm}>
                <Paper className={classes.paddingPaper}>
                  <GeneralForm/>
                </Paper>
              </div>
            </Grid>
          </Grid>
        </Grid>
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(GeneralPanel);
