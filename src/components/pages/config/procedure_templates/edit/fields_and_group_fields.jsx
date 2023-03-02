import React                  from 'react';
import Grid                   from '@material-ui/core/Grid';
import { styles }             from '../styles';
import { withStyles }         from '@material-ui/core/styles';
import FieldList              from './field_list';
import FieldsGroupList        from './fields_group_list';
import Typography             from '@material-ui/core/Typography';

const FieldsAndGroupFields = (props) => {
  const { currentTab } = props

  return(
    <>
      { currentTab ? 
        <>
          <Grid container item xs={10} direction='row' justifyContent="center">
            <FieldList
              currentTab={ currentTab }
            />
          </Grid>
          <Grid container item xs={10} direction='row' justifyContent="center">
            <FieldsGroupList
              currentTab={ currentTab }
            />
          </Grid>
        </>
      : 
        <Grid container item direction="column" alignItems="center">
          <Grid container item xs={10} alignItems="center" justifyContent="center">
            <Typography variant="h6">
              Agrega una pestaña para continuar 
            </Typography>
          </Grid>
        </Grid> 
      }
    </>
  )
}

export default withStyles(styles)(FieldsAndGroupFields);
