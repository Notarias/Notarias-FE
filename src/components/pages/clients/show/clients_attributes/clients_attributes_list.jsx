import React, {useEffect}               from 'react'
import { withStyles }                   from '@material-ui/core/styles';
import { styles }                       from '../styles';
import { useQuery }                     from '@apollo/client';
import { GET_CLIENT_ATTRIBUTE }         from '../../clients_queries_and_mutations/queries';
import List                             from '@material-ui/core/List';
import ListItem                         from '@material-ui/core/ListItem';
import Paper                            from '@material-ui/core/Paper';
import ClientAttribute                  from './client_attribute';

const ClientsAttributesList = (props) => {
  const { classes, match } = props



  const  { data: dataAttribute}  = useQuery(GET_CLIENT_ATTRIBUTE)

  const [attributes, setAttributes] = React.useState(dataAttribute ? dataAttribute.clientAttributes : [] )
  
  useEffect(() => {
    dataAttribute && setAttributes(dataAttribute.clientAttributes);;
  }, [dataAttribute])

  return (
    <Paper className={classes.paperWidth}>
      <List>
        {attributes.map((attr) => {
          return(
            <ListItem key={attr.id + "-attr"}>
              <ClientAttribute
                attr={attr}
                match={match}
              />
            </ListItem>
          )
        }
        )}
      </List>
    </Paper>
  )
}

export default withStyles(styles)(ClientsAttributesList)
