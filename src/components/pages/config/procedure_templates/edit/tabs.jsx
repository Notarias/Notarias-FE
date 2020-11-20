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


//TODO: hacer el refetch del create mutation


const Tabs = (props) => {

  const { classes, tabsData, currentTab, setCurrentTab, proceduresTemplateId } = props
  const { loading, data } = useQuery(
    GET_PROCEDURES_TEMPLATE_TABS, { variables: {"proceduresTemplateId": proceduresTemplateId }}
  );
  const [tabList, setTabList] = React.useState(data ? data.proceduresTemplateTabs: []);
  const [tabName, setTabName] = React.useState(currentTab ? currentTab.name : " Insertar");
 
  const [open, setOpen] = React.useState(false);
  const [tabDataList, setTabDataList] = React.useState([]);

  useEffect(() => {
    data && setCurrentTab(data.proceduresTemplateTabs[0]);
   data && setTabList(data.proceduresTemplateTabs);
   currentTab && setTabName(currentTab.name);
  }, [data])
    // useEffect(
  //   () => {
  //     setName(templateData.name)
  //   },
  //   [templateData]
  // )
  // Persistir tabsData en el state

  const [createProcedureTemplateTabMutation, createProcessInfo] =
  useMutation(
    CREATE_PROCEDURES_TEMPLATE_TAB,
    {
      // onError(apolloError) {
      //   setErrors(apolloError)
      // },
      update(store, cacheData) {
        // setError(false)
        const proceduresTemplateTabData = store.readQuery({
          query: GET_PROCEDURES_TEMPLATE_TABS, 
          variables: { "proceduresTemplateId": proceduresTemplateId }
        });
        console.log("cacheData", cacheData, proceduresTemplateTabData)
        // clientAttrsData.clientAttributes.push(
        //   cacheData.data.createClientAttribute.clientAttribute 
        // )
        // store.writeQuery({ query: GET_CLIENT_ATTRIBUTE, data: clientAttrsData });
        // setId(cacheData.data.createClientAttribute.clientAttribute.id)
        // )
        // store.writeQuery({ query: GET_PROCEDURES_TEMPLATE_TABS, data: clientAttrsData });
        // 
      },
      fetchPolicy: "no-cache" 
    }
  )

  const addNewTab= (event) => {
    createProcedureTemplateTabMutation(
      { 
        variables: 
          { name: tabName, id: proceduresTemplateId }
      }
    )
    const newTab = { name: tabName, id: proceduresTemplateId }
    setTabList(tabList.concat([newTab]));//TODO: hacer la mutacion
    setOpen(false);
    setCurrentTab(newTab)
  }

  // con tabsData persistidos haces el map que renderea los tabs

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
              key={ index + "-tabs"}
              tab={ tab }
              active={ tab.id === currentTab.id }
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
  };


  return(
    <Grid container item direction="column">
      <Grid  container item>
        {
          currentTab && renderTabList()
        }
      </Grid>
      <Grid item >
        <Button variant="contained" onClick={ handleClickOpen } className={ classes.buttonTab }>
          <AddIcon/>
        </Button>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Nueva página</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Inserte el nombre de la página nueva
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              variant="filled"
              fullWidth
              onChange={ handleNameChange }
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={ addNewTab } color="primary">
              Aceptar
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
    </Grid>
  )
}

export default withStyles(styles)(Tabs);
