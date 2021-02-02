import React, { useRef }                                          from 'react';
import { makeStyles }                                 from '@material-ui/core/styles';
import { styles }                                     from '../styles';
import { withStyles }                                 from '@material-ui/core/styles';
import List                                           from '@material-ui/core/List';
import ListItem                                       from '@material-ui/core/ListItem';
import ListItemText                                   from '@material-ui/core/ListItemText';
import { useQuery }                                   from '@apollo/react-hooks';
import { GET_BUDGETING_TEMPLATES_QUICK_LIST }         from '../queries_and_mutations/queries'
import Fuse                                           from 'fuse.js'
import Divider                            from '@material-ui/core/Divider';
import TemplateSelectOption      from './template_select_option'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    overflow: 'auto',
    maxHeight: 300,
  },
  listSection: {
    backgroundColor: 'inherit',
  },
  ul: {
    backgroundColor: 'inherit',
    padding: 0,
  },
}));

const ListToLinkOfProcedures = (props) => {

  const classes = useStyles();
  const setProcedureSelectedOption = props.setProcedureSelectedOption;
  const procedureSelectedOption = props.procedureSelectedOption;
  const [searchList, setSearchList] = React.useState([])
  const [initialList, setInitialList] = React.useState([])
  const [fuzzySearcher, setFuzzySearcher] = React.useState(new Fuse(initialList, { keys: ['name'] }))

  let textInput = useRef(null);

  function changeSearch(event) {
    let result = fuzzySearcher.search(event.target.value)
    console.log("val", event.target.value)
    setSearchList(result)
  }
//cuando llegue vacio el value
  const { loading, data, refetch } = useQuery(
    GET_BUDGETING_TEMPLATES_QUICK_LIST,
  );

  React.useEffect(() => {
    if (data && data.proceduresTemplatesQuickList) {
      setInitialList(data.proceduresTemplatesQuickList)
      setFuzzySearcher(new Fuse(data.proceduresTemplatesQuickList, { keys: ['name'] }))
      setSearchList(data.proceduresTemplatesQuickList)
    }
  }, [data])

  return (
      <div>
        <input type="text" onChange={ changeSearch }/>
        {
          searchList.map((item) => {
            let obj = item.item || item
            return(
              <TemplateSelectOption 
                key={ obj.id + "template-option" }
                template={ obj }
                selectItem={ props.setProcedureSelectedOption }
                selectedItem={ props.procedureSelectedOption }
              />
            )
          })
        }
      </div>
    // <List className={classes.root}>
    //   {data.proceduresTemplatesQuickList.map(
    //     (item) => {
    //       return(
    //         <ListItem 
    //           button
    //           key={ item.id + "-itemId"}
    //           divider
    //           selected={procedureIdSelected === item.id}
    //           onClick={(event) =>  procedureLinked(item.id)}
    //           // disabled={true}
    //         >
    //           <ListItemText primary={`${item.name} ${item.id}`} />
    //         </ListItem>
    //       )
    //     }
    //   )
    //   }
    // </List>
    // {
    //   data.proceduresTemplatesQuickList.map(
    //     (item) => {
    //       return([{
    //         id: item.id,
    //         name: item.name,
    //         folioNumber: item.folioNumber,
    //       }]
    //       )
    //     }
    //   )
    // }

  );
}

export default withStyles(styles)(ListToLinkOfProcedures);
