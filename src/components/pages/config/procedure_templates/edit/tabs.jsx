import React                        from 'react';
import Grid                         from '@material-ui/core/Grid';
import AddIcon                      from '@material-ui/icons/Add';
import Button                       from '@material-ui/core/Button';
import { styles }                   from '../styles';
import { withStyles }               from '@material-ui/core/styles';
import TextField                    from '@material-ui/core/TextField';
import Dialog                       from '@material-ui/core/Dialog';
import DialogActions                from '@material-ui/core/DialogActions';
import DialogContent                from '@material-ui/core/DialogContent';
import DialogContentText            from '@material-ui/core/DialogContentText';
import DialogTitle                  from '@material-ui/core/DialogTitle';
import Tab                          from './tab';


const Tabs = (props) => {
  
  const { classes, tabsData, currentTab, changeTab } = props
  const [tabList, setTabList] = React.useState(tabsData);
 // const [activeTab, setActiveTab] = React.useState(currentTab)
  const [tabName, setTabName] = React.useState(currentTab.name);
  const [open, setOpen] = React.useState(false);
// const { loading, data } = useQuery(GET_PROCEDURE_TEMPLATE, { variables: {"id": tabData.id }} )


  const [tabDataList, setTabDataList] = React.useState([]);
  // Persistir tabsData en el state

  const addNewTab= (event) => {
    const newTab = { name: tabName, id: tabList[tabList.length - 1].id + 1, groups: [] }
    setTabList(tabList.concat([newTab]));//TODO: hacer la mutacion
    setOpen(false);
    changeTab(newTab)
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
              changeTab={ changeTab }
            />
          )
        }
      )
    )
  }

  const handleNameChange = (event) => {
    setTabName(event.target.value);
  };

  //endpoint cuando pida las paginas me llega name teniendo una relacion con campos
  return(
    <Grid container item direction="column">
      <Grid >
        {
          renderTabList()
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
