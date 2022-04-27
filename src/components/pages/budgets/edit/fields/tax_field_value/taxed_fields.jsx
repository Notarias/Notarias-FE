import React                      from 'react';
import Grid                       from '@material-ui/core/Grid';
import { grey }                   from '@material-ui/core/colors';
import Divider                    from '@material-ui/core/Divider';
import Collapse                   from '@material-ui/core/Collapse';
import Typography                 from '@material-ui/core/Typography';
import AttachMoneyIcon            from '@material-ui/icons/AttachMoney';
import Chip                       from '@material-ui/core/Chip';
import { useQuery }               from '@apollo/client';
import { BUDGET_TAXED_FIELDS_FOR_FIELD } from '../../../queries_and_mutations/queries';

export default (props) => {
  const { expandTaxedFields, templateField, budget } = props

  const { data } = useQuery(
    BUDGET_TAXED_FIELDS_FOR_FIELD,
    {
      variables: {
        "fieldId": templateField.id,
        "budgetId": budget.id
      }
    }
  );

  const formatValue = (value) => {
    return((value * 1.0) / 100).toFixed(2)
  }

  return(
    <Collapse in={expandTaxedFields}>
      <Grid item container direction='column' style={{ backgroundColor: grey[100]}}>
        <Divider/>
        {
          data && data.budgetTaxedFieldsForField.map((taxedField) => {
            return(
              <React.Fragment key={ `${taxedField.id}-taxed-field-${templateField.id}` }>
                <Grid container item style={{ padding: '10px' }}>
                  <Grid container xs={3} item justifyContent='flex-end'>
                    <Grid item>
                      <Typography align='left'>{taxedField.name}</Typography>
                    </Grid>
                  </Grid>
                  <Grid container xs={4} item justifyContent='center'>
                    <Grid item>
                      <Chip
                        icon={<AttachMoneyIcon/>}
                        label={`Total: ${formatValue(taxedField.fieldValue ? taxedField.fieldValue.value : taxedField.defaultValue) || 0}`}
                      />
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Grid item>
                      <Chip
                        icon={<AttachMoneyIcon/>}
                        label={`Impuesto: ${formatValue(taxedField.tax)}`}
                      />
                    </Grid></Grid>
                </Grid>
                <Divider/>
              </React.Fragment>
            )
          })
        }
      </Grid>
    </Collapse>
  )
}