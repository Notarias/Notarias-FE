import React, { useState, useEffect }     from 'react';
import Grid                               from '@material-ui/core/Grid';
import IconButton                         from '@material-ui/core/IconButton';
import SaveIcon                           from '@material-ui/icons/Save';
import AttributeField                     from './attribute_field';
import { withStyles }                     from '@material-ui/core/styles';
import { styles }                         from '../styles';
import { useQuery, useMutation }          from '@apollo/client';
import { GET_CLIENT_ATTRIBUTE_VALUE }     from '../clients_queries_and_mutations/queries';
import { CREATE_CLIENT_ATTRIBUTE_VALUE }  from '../clients_queries_and_mutations/queries';
import { UPDATE_CLIENT_ATTRIBUTE_VALUE }  from '../clients_queries_and_mutations/queries';

const ClientAttribute = (props) => {
  const { classes, attr, match } = props

  const [attributeValue, setAttributeValue] = useState("")
  const [pristine, setPristine] = useState(true)
  
  const { data: dataAttributeValue } = 
    useQuery(GET_CLIENT_ATTRIBUTE_VALUE, 
      { variables: { "attributeId": Number(attr.id),"clientId": match.params.id }}
    )
  
  const attrValue = dataAttributeValue && dataAttributeValue.clientAttributeValue

  useEffect(() => { dataAttributeValue && setAttributeValue( 
    dataAttributeValue.clientAttributeValue ? 
      dataAttributeValue.clientAttributeValue.value 
    : 
      ""
    )
  }, [dataAttributeValue])

  const [createClientAttributeValueMutation, {loading: loadingCreateClientAttributeValue}] = 
    useMutation(
      CREATE_CLIENT_ATTRIBUTE_VALUE,
      {
        onCompleted(cacheData) {
          setPristine(true)
        },
        refetchQueries: [
          {
            query: GET_CLIENT_ATTRIBUTE_VALUE, variables: {"attributeId": Number(attr.id), "clientId": match.params.id} 
          },
        ],
        awaitRefetchQueries: true
      }
    )

    const newClientAttributeValue = (event) => {
      createClientAttributeValueMutation({
        variables:{
          "clientId": match.params.id,
          "clientAttributeId": attr.id,
          "value": String(attributeValue),
        }
      })
    }

  const [updateClientAttributeValueMutation, {loading: loadingUpdateClientAttributeValue}] =
    useMutation(
      UPDATE_CLIENT_ATTRIBUTE_VALUE,
      {
        onCompleted(cacheData) {
          setPristine(true)
        },
        refetchQueries: [
          {
            query: GET_CLIENT_ATTRIBUTE_VALUE, variables: {"attributeId": Number(attr.id), "clientId": match.params.id} 
          },
        ],
        awaitRefetchQueries: true
      }
    )

  const updateClientAttributeValue = (event) => {
    updateClientAttributeValueMutation({
      variables:{
        "id": attrValue.id,
        "value": String(attributeValue),
      }
    })
  }

  const editAttrField = (event) => {
    setAttributeValue(event.target.value);
    setPristine(event.target.value.length > 0 ? false : true);
  }

  const cancelEdit = () => {
    setPristine(true) 
    setAttributeValue(attrValue ? dataAttributeValue.clientAttributeValue.value : "")
  }

  return(
    <>
      <Grid container item xs={12} alignItems='center' className={classes.clientAttrPadding}>
        <Grid item xs>
          <AttributeField
            attr={attr}
            attrValue={attrValue}
            attributeValue={attributeValue}
            editAttrField={editAttrField}
            cancelEdit={cancelEdit}
            pristine={pristine}
            match={match}
          />
        </Grid>
        {pristine ?
          ""
        :
          <Grid item xs={1}>
            <IconButton
              aria-label="cancel-attr-edit"
              disabled={pristine || loadingCreateClientAttributeValue || loadingUpdateClientAttributeValue}
              onClick={attrValue ? updateClientAttributeValue : newClientAttributeValue}
              edge="end"
              color='primary'
            >
              <SaveIcon/>
            </IconButton>
          </Grid>
        }
      </Grid>
    </>
  )
}

export default withStyles(styles)(ClientAttribute);
