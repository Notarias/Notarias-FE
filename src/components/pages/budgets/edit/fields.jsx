import React, { useState, useEffect }               from 'react';
import { useQuery }                                 from '@apollo/react-hooks';
import { GET_BUDGETING_TEMPLATE_TAB_FIELDS }        from '../queries_and_mutations/queries'
import Typography                                   from '@material-ui/core/Typography';
import Box                                          from '@material-ui/core/Box';
import PropTypes                                    from 'prop-types';
import Grid                                         from '@material-ui/core/Grid';
import TextField                                    from '@material-ui/core/TextField';
import InputAdornment                               from '@material-ui/core/InputAdornment';
import { withStyles }                               from '@material-ui/core/styles';
import { styles }                                   from '../styles';


const Fields = (props) => {
  const {value, setValue, currentTab, tabList, classes} = props;


  // function TabPanel(props) {
  //   const { children, value, index, ...other } = props;
  
  //   return (
  //     <div
  //       role="tabpanel"
  //       hidden={value !== index}
  //       id={`simple-tabpanel-${index}`}
  //       aria-labelledby={`simple-tab-${index}`}
  //       {...other}
  //     >
  //       {value === index && (
  //         <Box p={3}>
  //           <Typography>{children}</Typography>
  //         </Box>
  //       )}
  //     </div>
  //   );
  // }
  
  // TabPanel.propTypes = {
  //   children: PropTypes.node,
  //   index: PropTypes.any.isRequired,
  //   value: PropTypes.any.isRequired,
  // };

  const { data } = useQuery(
    GET_BUDGETING_TEMPLATE_TAB_FIELDS,
    {
      variables: { "id": currentTab.id }
    }
  );

  const [fields, setFields] = React.useState(data ? data.budgetingTemplateTabFields : [])

  useEffect(() => {
    data && setFields(data.budgetingTemplateTabFields);;
  }, [data])

  const renderFields = () => {

    return(
      <>

            {
              fields.map((field) => {
                return(
                  <Grid 
                    key={field.id + "-field"} 
                    container
                    alignItems="center"
                    className={classes.budgetTabPanelFields}
                  >
                    <Grid container item xs={3} justify="flex-start" >
                      <Typography variant="subtitle2" gutterBottom>
                        {field.name}
                      </Typography>
                    </Grid>
                    <Grid container item xs={2} justify="flex-start">
                      <TextField
                      label="Total"
                      id="standard-start-adornment"
                      InputProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                      }}
                      />
                    </Grid>
                    <Grid>

                    </Grid>
                  </Grid>
                )
              })
            }

      </>
    )
  }

  console.log(data, "tabList")
  return(
    renderFields()
  )
}

export default withStyles(styles)(Fields);
