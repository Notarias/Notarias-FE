import React, { useEffect }                 from 'react';
import Grid                                 from '@material-ui/core/Grid';
import AddIcon                              from '@material-ui/icons/Add';
import Button                               from '@material-ui/core/Button';
import { styles }                           from '../styles';
import { withStyles }                       from '@material-ui/core/styles';
import TextField                            from '@material-ui/core/TextField';
import Dialog                               from '@material-ui/core/Dialog';
import DialogActions                        from '@material-ui/core/DialogActions';
import DialogContent                        from '@material-ui/core/DialogContent';
import DialogContentText                    from '@material-ui/core/DialogContentText';
import DialogTitle                          from '@material-ui/core/DialogTitle';
import { useQuery }                         from '@apollo/react-hooks';
import { useMutation }                      from '@apollo/react-hooks';
import { GET_BUDGETING_TEMPLATES_TABS }     from '../queries_and_mutations/queries'
import { CREATE_BUDGETING_TEMPLATES_TABS }  from '../queries_and_mutations/queries'
import Tab                                  from './tab';
import { GLOBAL_MESSAGE }                   from '../../../../../resolvers/queries';
import client                               from '../../../../../apollo';


const Tabs = (props) => {

  const { classes, currentTab, setCurrentTab, budgetingTemplateId } = props
  const { data } = useQuery(
    GET_BUDGETING_TEMPLATES_TABS, { variables: {"id": budgetingTemplateId }}
  );

  const [tabList, setTabList] = React.useState(data ? data.budgetingTemplateTabs: []);
  const [tabName, setTabName] = React.useState(currentTab ? currentTab.name : "");
  const [open, setOpen] = React.useState(false);
  const [pristine, setPristine] = React.useState(true)
  const [error, setError] = React.useState(false)
  const inputsList = ["name"]

  useEffect(() => {
    currentTab || (data && setCurrentTab(data.budgetingTemplateTabs[0]));
    data && setTabList(data.budgetingTemplateTabs);
    currentTab && setTabName(currentTab.name);
  }, [data])

  const [createBudgetingTemplateTabMutation] =
  useMutation(
    CREATE_BUDGETING_TEMPLATES_TABS,
    {
      onError(apolloError) {
        setErrors(apolloError)
        setPristine(true)
        client.writeQuery({
          query: GLOBAL_MESSAGE,
          data: {
            globalMessage: {
              message: "Ocurrió un error",
              type: "error",
              __typename: "globalMessage"
            }
          }
        })
      },
      onCompleted(cacheData) {
        setCurrentTab(cacheData.createBudgetingTemplateTab.budgetingTemplateTab)
        setError(false)
        setOpen(false)
        setPristine(true)
      },
      refetchQueries: [{
        query: GET_BUDGETING_TEMPLATES_TABS,
        variables: { "id": budgetingTemplateId },
      }],
    }
  )

  const setErrors = (apolloError) => {
    let errorsList = {}
    let errorTemplateList = apolloError.graphQLErrors
    for ( let i = 0; i < errorTemplateList.length; i++) {
      for( let n = 0; n < inputsList.length; n++) {
        if(errorTemplateList[i].extensions.attribute === inputsList[n]){
          errorsList[inputsList[n]] = errorTemplateList[i].message
        }
      }
    }
    setError(errorsList)
  }

  const addNewTab = (event) => {
    createBudgetingTemplateTabMutation(
      { 
        variables: 
          { name: tabName, templateId: budgetingTemplateId },
      }
    )

  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const renderTabList = () => {
    return(
      tabList.map(
        (tab, index) => {
          return(
            <Tab
              key={ tab.id + "-tabs" }
              tab={ tab }
              selected={ tab.id === (currentTab && currentTab.id ) }
              setCurrentTab={ setCurrentTab }
              budgetingTemplateId={ budgetingTemplateId }
            />
          )
        }
      )
    )
  }

  const handleNameChange = (event) => {
    setTabName(event.target.value);
    setPristine(false);
  };

  return(
    <Grid container item direction="column">
      <Grid  container item>
        {
          (currentTab || (data && data.budgetingTemplateTabs)) && renderTabList()
        }
      </Grid>
      <Grid item >
        <Button variant="contained" onClick={ handleClickOpen } className={ classes.buttonTab }>
          <Grid container direction="column" alignItems="center" justify="center">
            Agregar pestaña
            <AddIcon/>
          </Grid>
        </Button>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Nueva pestaña</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Inserte el nombre de la pestaña nueva
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              variant="filled"
              fullWidth
              onChange={ handleNameChange }
              error={ !!error["name"] && true }
              helperText={error["name"] || " "}
              errorskey={ "name" }
              name='name'
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={ addNewTab } color="primary" disabled={ pristine }>
              Aceptar
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
    </Grid>
  )
}

export default withStyles(styles)(Tabs);
