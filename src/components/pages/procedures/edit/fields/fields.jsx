import React, { useState, useEffect }           from 'react';
import CreateComments                           from './create_comments';
import Grid                                     from '@material-ui/core/Grid';
import { withStyles }                           from '@material-ui/core/styles';
import Divider                                  from '@material-ui/core/Divider';
import { styles }                               from '../../styles'
import { useQuery }                             from '@apollo/client';
import { GET_PROCEDURES_TEMPLATE_TAB_FIELDS }   from '../../queries_and_mutations/queries'
import FieldsRows                               from './fields_rows';

const Fields = (props) => {

  const { currentTab, procedure, classes } = props;
  const [currentFieldId, setCurrentFieldId] =  useState(null);
  const [scrollHeight, setScrollHeight] = useState();

  const { data } = useQuery(
    GET_PROCEDURES_TEMPLATE_TAB_FIELDS,
    {
      variables: { "id": currentTab && currentTab.id },
      fetchPolicy: "no-cache"
    }
  );

  const [fields, setFields] = useState(data ? data.proceduresTemplateTabFields : [])
  
  useEffect(() => {
    data && setFields(data.proceduresTemplateTabFields);;
  }, [data])
  
  const renderFields = () => {
    return(
      <Grid item container style={{ flex: '1 1 auto' }} direction='column' alignItems="stretch" justifyContent="flex-start">
        <Grid item container justifyContent="flex-start" style={{"padding-left": "25px", "padding-right": "25px", "padding-top": "20px"}}>
          {
            fields.map((field) => {
              return(
                <FieldsRows key={field.id} field={field} procedure={procedure}/>
              )
            })
          }
        </Grid>
        <Divider variant="middle"/>
        <Grid container  justifyContent="flex-end" item style={{ paddingTop: "20px", paddingBottom: "20px" }}>
            <Grid container item direction="row" xs={8}>
              <CreateComments procedure={procedure}/>
            </Grid>
            <Grid container item xs={4} alignItems="center" className={classes.totalValuesGridContainer}>
              
            </Grid>
          </Grid>
      </Grid>
    )
  }

  return(
    renderFields()
  )
}

export default withStyles(styles)(Fields);
