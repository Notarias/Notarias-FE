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
import Tab                                  from './tab';
import { useQuery }                         from '@apollo/react-hooks';
import { useMutation }                      from '@apollo/react-hooks';
import { GET_PROCEDURES_TEMPLATE_TABS }     from '../queries_and_mutations/queries'
import { CREATE_PROCEDURES_TEMPLATE_TAB }   from '../queries_and_mutations/queries'


const Tabs = (props) => {

  const { classes, tabsData, currentTab, setCurrentTab, proceduresTemplateId } = props
  const { loading, data } = useQuery(
    GET_PROCEDURES_TEMPLATE_TABS, { variables: {"proceduresTemplateId": proceduresTemplateId }}
  );

  const [tabList, setTabList] = React.useState(data ? data.proceduresTemplateTabs: []);
  const [tabName, setTabName] = React.useState(currentTab ? currentTab.name : "");
  const [open, setOpen] = React.useState(false);
  const [pristine, setPristine] = React.useState(true)
  const [error, setError] = React.useState(false)
  const inputsList = ["name"]

  useEffect(() => {
    currentTab || (data && setCurrentTab(data.proceduresTemplateTabs[0]));
    data && setTabList(data.proceduresTemplateTabs);
    currentTab && setTabName(currentTab.name);
  }, [data])

  const [createProcedureTemplateTabMutation, createProcessInfo] =
  useMutation(
    CREATE_PROCEDURES_TEMPLATE_TAB,
    {
      onError(apolloError) {
        setErrors(apolloError)
        setPristine(true)
      },
      onCompleted(cacheData) {
        setCurrentTab(cacheData.createProceduresTemplateTab.proceduresTemplateTab)
        setError(false)
        setOpen(false)
        setPristine(true)
      },
      fetchPolicy: "no-cache",
      refetchQueries: [{
        query: GET_PROCEDURES_TEMPLATE_TABS,
        variables: { "proceduresTemplateId": proceduresTemplateId },
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
    createProcedureTemplateTabMutation(
      { 
        variables: 
          { name: tabName, id: proceduresTemplateId },
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
              proceduresTemplateId={ proceduresTemplateId }
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
          (currentTab || (data && data.proceduresTemplateTabs)) && renderTabList()
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
