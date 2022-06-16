import React, { useEffect, useState }     from 'react'
import Grid                               from '@material-ui/core/Grid';
import Typography                         from '@material-ui/core/Typography';
import ClientAttribute                    from './client_attribute';
import { useQuery }                       from '@apollo/client';
import { GET_CLIENT_ATTRIBUTES }           from '../clients_queries_and_mutations/queries';

const ClientsAttributesList = (props) => {
  const { match } = props

  const  { data: dataAttribute}  = useQuery(GET_CLIENT_ATTRIBUTES)

  const [attributes, setAttributes] = useState(dataAttribute ? dataAttribute.clientAttributes : [] )
  
  useEffect(() => {
    dataAttribute && setAttributes(dataAttribute.clientAttributes);;
  }, [dataAttribute])

  return (
    <>
      <Grid container item direction='row' alignItems='flex-start'>
        <Grid item xs={12} >
          { attributes.length > 0 ?
            attributes.map((attr) => {
              return(
                <ClientAttribute
                  key={`client-attr-${attr.id}`}
                  attr={attr}
                  match={match}
                />
              )
            })
          :
            <Typography>
              Sin Atributos Adicionales
            </Typography>
          }
        </Grid>
      </Grid>
    </>
  )
}

export default ClientsAttributesList;
