import React, {useEffect, useState}                 from 'react';
import { withStyles }                     from '@material-ui/core/styles';
import { styles }                         from '../styles';
import ListItemText                       from '@material-ui/core/ListItemText';
import TextField                          from '@material-ui/core/TextField';
import { Grid }                           from '@material-ui/core';
import SaveIcon                           from '@material-ui/icons/Save';
import CancelIcon                         from '@material-ui/icons/Cancel';
import Button                             from '@material-ui/core/Button';
import { useMutation }                    from '@apollo/client'
import { CREATE_CLIENT_ATTRIBUTE_VALUE }  from '../../clients_queries_and_mutations/queries'
import { useQuery }                       from '@apollo/client';
import { GET_CLIENT_ATTRIBUTE_VALUE }     from '../../clients_queries_and_mutations/queries';
import { UPDATE_CLIENT_ATTRIBUTE_VALUE }  from '../../clients_queries_and_mutations/queries';


const ClientAttribute = (props) => {
  const {classes , attr, match} = props
  const [attributeValue, setAttributeValue] = React.useState("")
  const [pristine, setPristine] = React.useState(true)
  const [error, setError] = useState(false)
  const inputsList = ["name"]

  const {loading: loadingAttributeValue, data: dataAttributeValue} = 
  useQuery(GET_CLIENT_ATTRIBUTE_VALUE, { variables: { "attributeId": Number(attr.id),"clientId":
   match.params.id }})

  useEffect(() => {
    dataAttributeValue && setAttributeValue(
                        dataAttributeValue.clientAttributeValue ? dataAttributeValue.clientAttributeValue.value : ""
                                      );
  }, [dataAttributeValue])

  const [createClientAttributeValueMutation, {loading: loadingCreateClientAttributeValue}] = 
    useMutation(
      CREATE_CLIENT_ATTRIBUTE_VALUE,
      {
        onError(apolloError) {
          setErrors(apolloError)
        },
        onCompleted(cacheData) {
          setPristine(true)
        },
        refetchQueries: [
          {
            query: GET_CLIENT_ATTRIBUTE_VALUE,
              variables: {"attributeId": Number(attr.id), "clientId": match.params.id} 
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

    const attrValue = dataAttributeValue && dataAttributeValue.clientAttributeValue

    const [updateClientAttributeValueMutation, {loading: loadingUpdateClientAttributeValue}] =
  useMutation(
    UPDATE_CLIENT_ATTRIBUTE_VALUE,
    {
      onError(apolloError) {
        setErrors(apolloError)
      },
      onCompleted(cacheData) {
        setPristine(true)
      },
      refetchQueries: [
        {
          query: GET_CLIENT_ATTRIBUTE_VALUE,
            variables: {"attributeId": Number(attr.id), "clientId": match.params.id} 
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

  const setErrors = (apolloError) => {
    let errorsList = {}
    let errorTemplateList = apolloError.graphQLErrors
    for ( let i = 0; i < errorTemplateList.length; i++) {
      for( let n = 0; n < inputsList.length; n++) {
        if(errorTemplateList[i].extensions.attribute === inputsList[n]){
          errorsList[inputsList[n]] = errorTemplateList[i].message
        }
      }
    }
    setError(errorsList)
  }

  const renderInputNumber = () => {
    return(
      <Grid container direction="row" alignItems="flex-end" justifyContent="flex-end">
        <Grid container item xs={8} direction="column">
          <ListItemText>{attr.name}</ListItemText>
          <TextField
            id="outlined-disabled"
            label="Numérico"
            value={attributeValue}
            onChange={ (event)=> {
              const onlyString = event.target.value.toString()
              const onlyNums = onlyString.replace(/[^0-9]/g, '');
              event.target.value = onlyNums
              setAttributeValue(event.target.value)
              setPristine(event.target.value.length > 0 ? false : true)
            }}
            variant="outlined"
            size="small"
          />
        </Grid>
        <Grid container item xs={2} direction="row">
          <Button className={classes.buttonAttributeDefault} disabled={pristine} onClick={() => {
            setPristine(true) 
            setAttributeValue(attrValue ? dataAttributeValue.clientAttributeValue.value : "")
          }}
          >
            <CancelIcon/>
          </Button>
        </Grid>
        <Grid container item xs={2} direction="row">
          <Button 
            className={classes.buttonAttributeDefault}
            disabled={pristine || loadingCreateClientAttributeValue || loadingUpdateClientAttributeValue}
            onClick={attrValue ? updateClientAttributeValue : newClientAttributeValue}
          >
            <SaveIcon/>
          </Button>
        </Grid>
      </Grid>
    )
  }

  const renderInputString = () => {
    return(
      <Grid container direction="row" alignItems="flex-end" justifyContent="flex-end">
        <Grid container item xs={8} direction="column">
          <ListItemText>{attr.name}</ListItemText>
          <TextField
            id="outlined-disabled"
            label="Texto"
            value={attributeValue}
            onChange={ (event)=> {
              setAttributeValue(event.target.value)
              setPristine(event.target.value.length > 0 ? false : true)
            }}
            variant="outlined"
            size="small"
          />
        </Grid>
        <Grid container item xs={2} direction="row">
          <Button className={classes.buttonAttributeDefault} disabled={pristine} onClick={() => {
            setPristine(true) 
            setAttributeValue(attrValue ? dataAttributeValue.clientAttributeValue.value : "") 
          }}
          >
            <CancelIcon/>
          </Button>
        </Grid>
        <Grid container item xs={2} direction="row">
          <Button 
            className={classes.buttonAttributeDefault}
            disabled={pristine || loadingCreateClientAttributeValue || loadingUpdateClientAttributeValue}
            onClick={attrValue ? updateClientAttributeValue : newClientAttributeValue}
          >
            <SaveIcon/>
          </Button>
        </Grid>
      </Grid>
    )
  }

  return(
    <>
      {
        attr.style === "string" ? renderInputString() : renderInputNumber()
      }
    </>
  )
}

export default withStyles(styles)(ClientAttribute);
