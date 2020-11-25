import React                        from 'react';
import { styles }                   from '../styles';
import { withStyles }               from '@material-ui/core/styles';
import Typography                   from '@material-ui/core/Typography';
import Grid                         from '@material-ui/core/Grid';
import Button                       from '@material-ui/core/Button';
import TabMenu                      from './tab_menu';



const Tab = (props) => {

  const { active, tab, setCurrentTab, proceduresTemplateId } = props;
  const { classes } = props;


  const selectTab = (event) => {
    setCurrentTab(tab)
  }

  const showFields = () => {
    console.log( "select")
  }


  return(
    <>
    <Grid container item xs={2} alignItems="center" >
      <TabMenu
        name={ tab.name }
        id={ tab.id }
        proceduresTemplateId={ proceduresTemplateId }
        active={ active}
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
      className={ active ? classes.activeTab : classes.tabDefault }
      >
      <Button variant={ active ? "contained" : "outlined" } className={ classes.tittleTab } onClick={ showFields }>
        <Typography variant="h6" gutterBottom>
          { tab.name }
        </Typography>
      </Button>
    </Grid>
    </>
  )
}

export default withStyles(styles)(Tab);
