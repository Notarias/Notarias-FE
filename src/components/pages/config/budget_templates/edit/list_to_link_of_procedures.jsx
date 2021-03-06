import React, { useRef }                              from 'react';
import { styles }                                     from '../styles';
import { withStyles }                                 from '@material-ui/core/styles';
import List                                           from '@material-ui/core/List';
import Fuse                                           from 'fuse.js';
import Divider                                        from '@material-ui/core/Divider';
import TemplateSelectOption                           from './template_select_option'
import { TextField }                                  from '@material-ui/core';

const ListToLinkOfProcedures = (props) => {

  const {classes, data} = props;
  const setProcedureSelectedOption = props.setProcedureSelectedOption;
  const procedureSelectedOption = props.procedureSelectedOption;
  const [searchList, setSearchList] = React.useState([])
  const [initialList, setInitialList] = React.useState([])
  const [fuzzySearcher, setFuzzySearcher] = React.useState(new Fuse(initialList, { keys: ['name'] }))

  function changeSearch(event) {
    let result = fuzzySearcher.search(event.target.value)
    
    if (event.target.value.length === 0){
      setSearchList(initialList)
    } else {
      setSearchList(result)
    }
  }

  React.useEffect(() => {
    if (data && data.proceduresTemplatesQuickList) {
      setInitialList(data.proceduresTemplatesQuickList)
      setFuzzySearcher(new Fuse(data.proceduresTemplatesQuickList, { keys: ['name'] }))
      setSearchList(data.proceduresTemplatesQuickList)
    }
  }, [data])

  return (
    <div>
      <TextField 
        onChange={ changeSearch }
        id="outlined-basic"
        label="Buscar"
        variant="outlined"
        className={ classes.textFieldSearchInTable }
      />
      {
        searchList.map((item) => {
          let obj = item.item || item
          return(
            <List 
              component="nav" 
              aria-label="contacts" 
              key={ obj.id + "-list"}
              disablePadding={true}
              className={ classes.selectableProceduresListItem }
            >
              <TemplateSelectOption 
                key={ obj.id + "template-option" }
                template={ obj }
                selectItem={ props.setProcedureSelectedOption }
                selectedItem={ props.procedureSelectedOption }
              />
              <Divider/>
            </List>
          )
        })
      }
    </div>
  );
}

export default withStyles(styles)(ListToLinkOfProcedures);
