import React, { Component }           from 'react';
import { withStyles }                 from '@material-ui/core/styles';
import { styles }                     from './styles';
import Button                         from '@material-ui/core/Button';
import Typography                     from '@material-ui/core/Typography';
import { Grid, Paper }                from '@material-ui/core';
import PhoneInTalkOutlinedIcon        from '@material-ui/icons/PhoneInTalkOutlined';
import SvgIcon                        from '@material-ui/core/SvgIcon';
import LocationOnOutlinedIcon         from '@material-ui/icons/LocationOnOutlined';
import BusinessCenterOutlinedIcon     from '@material-ui/icons/BusinessCenterOutlined';
import BusinessOutlinedIcon           from '@material-ui/icons/BusinessOutlined';
import FingerprintOutlinedIcon        from '@material-ui/icons/FingerprintOutlined';
import EmailOutlinedIcon              from '@material-ui/icons/EmailOutlined';



class CustomerInformation extends Component {

  constructor(props) {
    super(props)
    const { client } = this.props.data
    this.state = {
      id: client.id,
      pristine: true,
      errors: {},
      firstName: client.firstName,
      lastName: client.lastName,
      phone: client.phone,
      business: client.business,
      category: client.category,
      address: client.address,
      email: client.email,
      rfc: client.rfc,
    }
  }

  render() {
    const { classes } = this.props
    return(
      <Paper classes={{root: classes.fullWidhAndHeight}}>
          <form className= {classes.fullWidhAndHeight}>
            <Grid container item xs={12} classes={{root: classes.marginGridInformation}}>
              <Grid align="left" classes={{root: classes.halfGridInformationOne}}>
                <Typography className={classes.title} color="textSecondary" variant="h4" gutterBottom>
                  {this.state.firstName }
                </Typography>
                <Typography className={classes.title} color="textSecondary" variant="h4" gutterBottom>
                  { this.state.lastName}
                </Typography>
                <Grid classes={{root: classes.paddingTextsInformation}}>
                  <Typography variant="h6">
                    <Grid container item xs={12}>
                      <Grid item>
                        <SvgIcon  component={PhoneInTalkOutlinedIcon} style={{ width:"25px", height:"25px" }}/>
                      </Grid>
                      <Grid item classes={{root: classes.paddingTextInformationClient}}>
                        {this.state.phone}
                      </Grid>
                    </Grid>
                  </Typography >
                </Grid>
                <Grid classes={{root: classes.paddingTextsInformation}}>
                  <Typography variant="h6">
                    <Grid container>
                      <Grid item classes={{root: classes.gridCustomerIcon}}>
                        <SvgIcon  component={EmailOutlinedIcon} style={{ width:"25px", height:"25px" }}/>
                      </Grid>
                      <Grid item classes={{root: classes.paddingTextInformationClient}}>
                        {this.state.email}
                      </Grid>
                    </Grid>
                  </Typography>
                </Grid>
                <Grid classes={{root: classes.paddingTextsInformation}}>
                  <Typography variant="h6">
                    <Grid container item xs={12}>
                      <Grid item classes={{root: classes.gridCustomerIcon}}>
                        <SvgIcon  component={LocationOnOutlinedIcon} style={{ width:"25px", height:"25px" }}/>
                      </Grid>
                      <Grid item classes={{root: classes.paddingTextInformationClient}}>
                        {this.state.address}
                      </Grid>
                    </Grid>
                  </Typography>
                </Grid>
                <Grid classes={{root: classes.paddingTextsInformation}}>
                  <Typography variant="h6">
                    <Grid container item xs={12}>
                      <Grid item classes={{root: classes.gridCustomerIcon}}>
                        <SvgIcon  component={BusinessOutlinedIcon} style={{ width:"25px", height:"25px" }}/>
                      </Grid>
                      <Grid item classes={{root: classes.paddingTextInformationClient}}>
                        {this.state.business}
                      </Grid>
                    </Grid>
                  </Typography>
                </Grid>
                <Grid classes={{root: classes.paddingTextsInformation}}>
                  <Typography variant="h6">
                    <Grid container item xs={12}>
                      <Grid item classes={{root: classes.gridCustomerIcon}}>
                        <SvgIcon component={BusinessCenterOutlinedIcon} style={{ width:"25px", height:"25px" }}/>
                      </Grid>
                      <Grid item classes={{root: classes.paddingTextInformationClient}}>
                        {this.state.category}
                      </Grid>
                    </Grid>
                  </Typography>
                </Grid>
                <Grid classes={{root: classes.paddingTextsInformation}}>
                  <Typography variant="h6">
                    <Grid container item xs={12}>
                      <Grid item classes={{root: classes.gridCustomerIcon}}>
                      <SvgIcon  component={FingerprintOutlinedIcon} style={{ width:"25px", height:"25px" }}/>
                      </Grid>
                      <Grid item classes={{root: classes.paddingTextInformationClient}}>
                        {this.state.rfc}
                      </Grid>
                    </Grid>
                  </Typography>
                </Grid>
              </Grid>
              <Grid  container  direction="row"  justifyContent="center"  alignItems="flex-end" classes={{root: classes.halfGridInformationTwo}}>
                <Grid item classes={{root: classes.fullWidth}}>
                  <Button href={`/clients/${this.state.id}/edit`} variant="contained" fullWidth color="default" style={{textTransform: 'none',}} >
                    Editar Datos
                  </Button>
                </Grid>
              </Grid>
          </Grid>
        </form>
      </Paper>
    )
  }
}
export default withStyles(styles)(CustomerInformation);