import React, { useState, useEffect }                 from 'react';
import { withStyles }                                 from '@material-ui/core/styles';
import { styles }                                     from '../styles';
import Fuse                                           from 'fuse.js';
import { TextField }                                  from '@material-ui/core';
import List                                           from '@material-ui/core/List';
import ListItem                                       from '@material-ui/core/ListItem';
import ListItemText                                   from '@material-ui/core/ListItemText';
import Grid                                           from '@material-ui/core/Grid';
import Divider                                        from '@material-ui/core/Divider';
import { useQuery }                                   from '@apollo/react-hooks';
import { BUDGETING_TEMPLATE_BY_PROCEDURE_ID }         from '../queries_and_mutations/queries';


const BudgetSelector = (props) => {
  const {classes, procedureId, setbudgetInfo, setDisableNextButton } = props
  const [searchList, setSearchList] = React.useState([])
  const [initialList, setInitialList] = React.useState([])
  const [fuzzySearcher, setFuzzySearcher] = React.useState(new Fuse(initialList, { keys: ['name'] }))
  const [selectedIndex, setSelectedIndex] = React.useState();

  const { loading, data, refetch } = useQuery(
    BUDGETING_TEMPLATE_BY_PROCEDURE_ID, { variables: {"proceduresTemplateId": procedureId} }
  );


  function changeSearch(event) {
    let result = fuzzySearcher.search(event.target.value)
    
    if (event.target.value.length === 0){
      setSearchList(initialList)
    } else {
      setSearchList(result)
    }
  }

  useEffect(() => {
    if (procedureId)
    {setInitialList(data.budgetingTemplatesByProcedureId)
    setFuzzySearcher(new Fuse(data.budgetingTemplatesByProcedureId, { keys: ['name'] }))
    setSearchList(data.budgetingTemplatesByProcedureId)}

  }, [data, procedureId])

  const handleMenuItemClick = (obj) => {
   
    return ((event) => {
      setSelectedIndex(obj.id);
      setbudgetInfo(obj)
    })
  }

  useEffect (() => {
    setDisableNextButton( selectedIndex ? false : true)
  }, [selectedIndex])

  return (
    <Grid container item direction="column" alignItems="center" justify="center">
      <div>
        <TextField 
          onChange={ changeSearch }
          id="outlined-basic"
          label="Buscar"
          variant="outlined"
          className={ classes.textFieldSearchInTable }
          fullWidth
        />
      </div>
    <div className={ classes.selectableListItem }>
      <List 
        component="nav" 
        aria-label="contacts" 
        disablePadding={true}
      >
        { 
          searchList.map(
            (item, index) => {
              let obj = item.item || item

              return(
                <React.Fragment key={obj.id + "fragment"}>
                  <ListItem 
                    key={obj.id} 
                    role={undefined} 
                    dense 
                    button 
                    onClick={ handleMenuItemClick(obj) }
                    selected={obj.id === selectedIndex}
                  >
                    <ListItemText 
                      id={obj.id} 
                      primary={obj.name}
                    />
                  </ListItem>
                  <Divider/>
                </React.Fragment>
              )
            }
          )
        }
        </List>
      </div>
    </Grid>
  )
}

export default  withStyles(styles)(BudgetSelector);
