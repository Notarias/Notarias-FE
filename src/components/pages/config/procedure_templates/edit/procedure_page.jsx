import React                        from 'react';
import Grid                         from '@material-ui/core/Grid';
import AddIcon                      from '@material-ui/icons/Add';
import Button                       from '@material-ui/core/Button';
import { styles }                   from '../styles';
import { withStyles }               from '@material-ui/core/styles';
import Typography                   from '@material-ui/core/Typography';


const ProcedurePage = (props) => {
  
  const { classes } = props
  const [procedurePageList, setprocedurePageList] = React.useState([])
  const [pageCounter, setPageCounter] = React.useState(0)

  const addNewProcedurePage = (event) => {
    setprocedurePageList(procedurePageList.concat([procedurePageList]));
    setPageCounter(pageCounter + 1);
  }

  

  const renderProcedurePageList = () => {
    return(
      procedurePageList.map(
        (procedurePage, index) => {
          return(
            <Grid 
              container 
              item 
              direction="column" 
              justify="flex-start" 
              alignItems="center" 
            >
              <Button variant="contained" className={ classes.tittleProcedurePage }>
                <Typography variant="h6" gutterBottom>
                  "Página " {pageCounter}
                </Typography>
              </Button>
            </Grid>
          )
        }
      )
    )
  }  
  
  return(
    <Grid container item direction="column">
      <Grid >
        {
          renderProcedurePageList()
        }
      </Grid>
      <Grid item >
        <Button variant="contained" onClick={ addNewProcedurePage } className={ classes.buttonProcedurePage }>
          <AddIcon/>
        </Button>
      </Grid>
    </Grid>
  )
}

export default withStyles(styles)(ProcedurePage);
