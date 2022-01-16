import React, { useState } from 'react';
import Grid       from '@material-ui/core/Grid';
import Typography         from '@material-ui/core/Typography';
import HelpOutlineIcon    from '@material-ui/icons/HelpOutline';
import Tooltip            from '@material-ui/core/Tooltip';
import { makeStyles }     from '@material-ui/core/styles';
import Destroy            from './destroy'

const useStyles = makeStyles((theme) => ({
  taxedField: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
    textAlign: 'left'
  },
  taxedFieldName: {
    paddingLeft: theme.spacing(2),
  },
  helpIcon: {
    cursor: 'pointer'
  },
  taxedFieldIcon: {
    textAlign: 'center'
  }
}));

const TaxedField = (props) => {
  const { taxField, refetchTaxedFields } = props
  const classes = useStyles();

  const [taxedField] = useState(props.taxedField)

  return(
    <Grid container item className={classes.taxedField} direction="row" >
      <Grid item xs={1} className={classes.taxedFieldIcon}>
        <Tooltip title="Campo afectado por el impuesto">
          <HelpOutlineIcon fontSize="medium" className={classes.helpIcon}/>
        </Tooltip>
      </Grid>
      <Grid item xs={5} className={classes.taxedFieldName}>
        <Typography variant="subtitle1" gutterBottom>{taxedField.name}</Typography>
      </Grid>
      <Grid item xs={5} className={classes.taxedFieldName}/>
      <Grid container item xs={1} alignItems="center" justifyContent="center">
        <Destroy destroyCallback={refetchTaxedFields} taxedField={taxedField} taxField={taxField}/>
      </Grid>
    </Grid>
  )
}

export default TaxedField;