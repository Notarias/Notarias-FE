import React                                from 'react';
import CircularProgress                     from '@material-ui/core/CircularProgress';
import Grid                                 from '@material-ui/core/Grid';
import { styles }                           from '../styles';
import { withStyles }                       from '@material-ui/core/styles';
import Typography                           from '@material-ui/core/Typography';


const RenderFields = (props) => {
  const {classes, currentTab, loading, data} = props

  const render = () => {
    if (loading || !data) {
      return (
        <Grid container item className={ classes.circularProgressLoading } direction="column" alignItems="center" justify="center">
          <CircularProgress size={ 100 }/>
        </Grid>
      )
    } else if (currentTab) {
      return (
        <Grid container item direction="column" alignItems="center">
          <Grid container item xs={10} alignItems="center" justify="center">
            {/* <FieldList
              currentTab={ currentTab }
            /> */}
          </Grid>
        </Grid>
      )
    } else {
      return (
        <Grid container item direction="column" alignItems="center">
          <Grid container item xs={10} alignItems="center" justify="center">
            <Typography variant="h6">
              Agrega una pestaña para continuar
            </Typography>
          </Grid>
        </Grid>
      )
    }
  }

  return (
    render()
  )
}

export default withStyles(styles)(RenderFields);
