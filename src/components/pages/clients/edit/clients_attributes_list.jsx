import React, { useEffect, useState }     from 'react'
import List                               from '@material-ui/core/List';
import ListItem                           from '@material-ui/core/ListItem';
import ClientAttribute                    from './client_attribute';
import { useQuery }                       from '@apollo/client';
import { GET_CLIENT_ATTRIBUTE }           from '../clients_queries_and_mutations/queries';
import { Typography } from '@material-ui/core';

const ClientsAttributesList = (props) => {
  const { match } = props



  const  { data: dataAttribute}  = useQuery(GET_CLIENT_ATTRIBUTE)

  const [attributes, setAttributes] = useState(dataAttribute ? dataAttribute.clientAttributes : [] )
  
  useEffect(() => {
    dataAttribute && setAttributes(dataAttribute.clientAttributes);;
  }, [dataAttribute])

  return (
    <List>
      { attributes.length > 0 ?
        attributes.map((attr) => {
          return(
            <ListItem key={attr.id + "-attr"}>
              <ClientAttribute
                attr={attr}
                match={match}
              />
            </ListItem>
          )
        })
      :
        <Typography>
          Sin Atributos Adicionales
        </Typography>
      }
    </List>
  )
}

export default ClientsAttributesList;
