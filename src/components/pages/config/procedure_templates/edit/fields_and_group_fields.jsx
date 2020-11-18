import React                        from 'react';
import Grid                         from '@material-ui/core/Grid';
import { styles }                   from '../styles';
import { withStyles }               from '@material-ui/core/styles';
import FieldList                    from './field_list';
import FieldsGroupList              from './fields_group_list';

const FieldsAndGroupFields = (props) => {
  const { currentTab, classes } = props

  const renderFieldsAndGroups = () => {

    return(
      <Grid container item direction="column" alignItems="center">
        <Grid container item xs={10} alignItems="center" justify="center">
          Campos
        <FieldList
          // removeFromList={ removeFromList }
          currentTab={ currentTab }
        />
        </Grid>
        <Grid container item xs={10}  justify="center" alignItems="center">
          Grupo de campos
        <FieldsGroupList
          // addNewField={ addNewField }
          // removeFromList={ removeFromList }
          currentTab={ currentTab }
        />
        </Grid>
      </Grid>
    )
  }

  const renderFieldsAndGroupsEmpty = () => {
    return(
      <Grid container item direction="column" alignItems="center">
        <Grid container item xs={10} alignItems="center" justify="center">
          agregue una pestaña para continuar
        </Grid>
        <Grid container item xs={10}  justify="center" alignItems="center">

        </Grid>
      </Grid>
    )
  }

  return(
    <Grid container item >
      { currentTab ? renderFieldsAndGroups() : renderFieldsAndGroupsEmpty() }
    </Grid>
  )
}

export default withStyles(styles)(FieldsAndGroupFields);
