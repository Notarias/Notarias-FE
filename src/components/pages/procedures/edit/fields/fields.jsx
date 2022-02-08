import React, { useState, useEffect }           from 'react';
import Grid                                     from '@material-ui/core/Grid';
import { withStyles }                           from '@material-ui/core/styles';
import { styles }                               from '../../styles'
import { useQuery }                             from '@apollo/client';
import { GET_PROCEDURES_TEMPLATE_TAB_FIELDS }   from '../../queries_and_mutations/queries'
import FieldsRows                               from './fields_rows';

const Fields = (props) => {
  const { currentTab, procedure } = props;

  const [fields, setFields] = useState();

  const { data } = useQuery(
    GET_PROCEDURES_TEMPLATE_TAB_FIELDS,
    {
      variables: { "id": currentTab && currentTab.id }
    }
  );

  useEffect(() => {
    data && setFields(data.proceduresTemplateTabFields);;
  }, [data])
  
  const renderFields = () => {
    return(
      <Grid item container style={{ flex: '1 1 auto' }} direction='column' alignItems="stretch" justifyContent="flex-start">
        <Grid item container justifyContent="flex-start" style={{"paddingLeft": "25px", "paddingRight": "25px", "paddingTop": "20px"}}>
          {
            fields && fields.map((field) => {
              return(
                <FieldsRows key={`fieldsRows-${field.id}`} field={field} procedure={procedure}/>
              )
            })
          }
        </Grid>
      </Grid>
    )
  }

  return(
    renderFields()
  )
}

export default withStyles(styles)(Fields);
