import React                        from 'react';
import { styles }                   from '../styles';
import { withStyles }               from '@material-ui/core/styles';
import Typography                   from '@material-ui/core/Typography';
import Grid                         from '@material-ui/core/Grid';
import Button                       from '@material-ui/core/Button';
import TabMenu                      from './tab_menu';


const Tab = (props) => {

  const { selected, tab, setCurrentTab, proceduresTemplateId, } = props;
  const { classes } = props;

  const selectTab = (event) => {
    setCurrentTab(tab)
  }

  return(
    <>
    <Grid container item xs={2} alignItems="center" >
      <TabMenu
        name={ tab.name }
        id={ tab.id }
        active={ tab.active }
        proceduresTemplateId={ proceduresTemplateId }
        selected={ selected}
        setCurrentTab={ setCurrentTab }
      />
    </Grid>
    <Grid
      container 
      item 
      xs={10}
      onClick={ selectTab }
      id={ tab.id }
      container 
      item 
      direction="column" 
      justify="flex-start" 
      alignItems="center"
      className={ selected ? classes.activeTab : classes.tabDefault }
      >
      <Button variant={ selected ? "contained" : "outlined" } className={ classes.tittleTab }>
        <Typography variant="h6" gutterBottom>
          { tab.name }
        </Typography>
      </Button>
    </Grid>
    </>
  )
}

export default withStyles(styles)(Tab);
