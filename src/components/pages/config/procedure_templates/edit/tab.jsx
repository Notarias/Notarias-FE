import React                        from 'react';
import { styles }                   from '../styles';
import { withStyles }               from '@material-ui/core/styles';
import Typography                   from '@material-ui/core/Typography';
import Grid                         from '@material-ui/core/Grid';
import Button                       from '@material-ui/core/Button';


const Tab = (props) => {

  // const [name, setName] = React.useState(props.name);
  // const [id, setId] = React.useState(props.id);
  // const [activeTab, setActiveTab] = React.useState(props.active);
  const { active, tab, changeTab } = props;
  const { classes } = props;

  const selectTab = (event) => {
    changeTab(tab)
  }

  const showFields = () => {
    console.log("aqui", tab)
  }
  return(

    <Grid
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
  )
}

export default withStyles(styles)(Tab);