import React from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { withStyles }       from '@material-ui/core/styles';
import FormHelperText from '@material-ui/core/FormHelperText';

const styles = {
  margin: {
    margin: '0px',
    width: '350px',
  },
};

class InputWithIcon extends React.Component  {
  constructor(props) {
    super(props)
    this.state = { }
  }

  render() {
    const { classes, errors, inputProps } = this.props;

    return(
      <div className={classes.margin}>
        <Grid container spacing={1} alignItems="flex-end">
          <Grid item xs={2}>
          { this.props.icon || "" }
          </Grid>
          <Grid item xs={9} >
            <TextField
              type={this.props.type}
              name={this.props.name} 
              value={this.props.value || ""}  
              label={this.props.label} 
              fullWidth
              InputProps={{...inputProps}}
              onChange={this.props.handleChange}/>
            <FormHelperText error>{ errors[this.props.errorsKey] }</FormHelperText>
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default withStyles(styles)(InputWithIcon);
