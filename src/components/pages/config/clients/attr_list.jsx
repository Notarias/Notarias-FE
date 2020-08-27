import React                        from 'react';
import { makeStyles }               from '@material-ui/core/styles';
import Grid                         from '@material-ui/core/Grid';
import TextField                    from '@material-ui/core/TextField';

import DotsMenu                     from './dots_menu';

import FormControl                  from '@material-ui/core/FormControl';
import Select                       from '@material-ui/core/Select';
import MenuItem                     from '@material-ui/core/MenuItem';
import InputLabel                   from '@material-ui/core/InputLabel';

import { useMutation }              from '@apollo/react-hooks';
import { GLOBAL_MESSAGE }           from '../../../../resolvers/queries';
import { CREATE_CLIENT_ATTRIBUTE }  from './queries_and_mutations/queries';
import { GET_CLIENT_ATTRIBUTE }          from './queries_and_mutations/queries';
import { DESTROY_CLIENT_ATTRIBUTE }      from './queries_and_mutations/queries';
import { UPDATE_CLIENT_ATTRIBUTE }       from './queries_and_mutations/queries';

import { useEffect } from 'react';

import FormHelperText       from '@material-ui/core/FormHelperText';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  boxOutLined: {
    margin: theme.spacing(1),
    minWidth: 180,
  },
  margin: {
    margin: theme.spacing(0),
  },
}));

const attrList = (props)=> {
  const { removeFromList } = props
  const classes = useStyles();
  const inputsList = ["name", "style"]

  const [name, setName] = React.useState(props.name);
  const [style, setStyle] = React.useState(props.style);
  const [active, setActive] = React.useState(props.active);
  const [id, setId] = React.useState(props.id);
  const [pristine, setPristine] = React.useState(true)

  const [error, setError] = React.useState(false)
  const [loading, setLoading] = React.useState(false)

  const [destroyClientAttributeMutation, destroyProcessInfo] =
    useMutation(
      DESTROY_CLIENT_ATTRIBUTE, 
      {
        update(store, cacheData, id) {
          const clientAttrsData = store.readQuery({ query: GET_CLIENT_ATTRIBUTE });
          const deleteId = cacheData.data.destroyClientAttribute.clientAttribute.id

          let attr = clientAttrsData.clientAttributes
          let newArray = []
          for ( let i = 0; i < attr.length; i++) {
            if (parseInt(attr[i].id) != parseInt(deleteId)) { 
              newArray.push(attr[i]) 
            }
          }
          clientAttrsData.clientAttributes = newArray
          store.writeQuery({ query: GET_CLIENT_ATTRIBUTE, data: clientAttrsData });
          store.writeQuery({
            query: GLOBAL_MESSAGE,
            data: {
              globalMessage: {
                message: "Atributo Eliminado correctamente",
                type: "warning",
                __typename: "globalMessage"
              }
            }
          })
        }
      }
    )

  const setErrors = (apolloError) => {
    let errorsList = {}
    let errorAttrList = apolloError.graphQLErrors
    for ( let i = 0; i < errorAttrList.length; i++) {
      for( let n = 0; n < inputsList.length; n++) {
        if(errorAttrList[i].extensions.attribute === inputsList[n]){
          errorsList[inputsList[n]] = errorAttrList[i].message
        }
      }
    }
    setError(errorsList);//{name: "mensaje", style: "mensaje"} 
  }

  const [createClientAttributeMutation, createProcessInfo] =
    useMutation(
      CREATE_CLIENT_ATTRIBUTE,
      {
        onError(apolloError) {
          setErrors(apolloError)
        },
        update(store, cacheData) {
          setError(false)
          setPristine(true)
          const clientAttrsData = store.readQuery({ query: GET_CLIENT_ATTRIBUTE });
          clientAttrsData.clientAttributes.push(
            cacheData.data.createClientAttribute.clientAttribute 
          )
          store.writeQuery({ query: GET_CLIENT_ATTRIBUTE, data: clientAttrsData });
          setId(cacheData.data.createClientAttribute.clientAttribute.id)
          store.writeQuery(
            {
              query: GLOBAL_MESSAGE,
              data: {
                globalMessage: {
                  message: "Atributo creado correctamente",
                  type: "success",
                  __typename: "globalMessage"
                }
              }
            }
          )
         }
       }
     )

  const [updateClientAttributeMutation, updateProcessInfo] =
    useMutation(
      UPDATE_CLIENT_ATTRIBUTE,
      {
        onError(apolloError) {
          setErrors(apolloError)
        },
        update(store, cacheData) {
          setError(false)
          setPristine(true)
          const clientAttrsData = store.readQuery({ query: GET_CLIENT_ATTRIBUTE });
          store.writeQuery(
            {
              query: GLOBAL_MESSAGE,
              data: {
                globalMessage: {
                  message: "Atributo cactualizado correctamente",
                  type: "success",
                  __typename: "globalMessage"
                }
              }
            }
          )
        }
      }
    )

  const handleStyleChange = (event) => {
    setStyle(event.target.value);
    setPristine(false)
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
    setPristine(false)
  };

  const handleActiveChange = (event) => {
    setActive(event.target.checked);
    updateClientAttributeMutation({ variables: { id: id, name: name, style: style, active: event.target.checked }})
  };

  const deleteAttrClick = () => {
    removeFromList(props.arrayIndex, destroyClientAttributeMutation, { variables: { id: id } }, id )
  }

  const updateAttribute = (event) => {
    updateClientAttributeMutation({ variables: { id: id, name: name, style: style, active: active }})
  }

  const createNewAttribute = (event) => {
    createClientAttributeMutation({ variables: { name: name, style: style, active: true } })
  }

  const loadingAttr = pristine || updateProcessInfo.loading || createProcessInfo.loading

  return(
    <Grid container item>
      <Grid container item>
        <Grid item xs={4}>
        <TextField 
          label="Nombre"
          value={ name }
          variant="outlined"
          className={ classes.boxOutLined }
          onChange={ handleNameChange }
          error={ !!error["name"] && true }
          errorskey={ "name" }
          name='name'
          helperText={error["name"] || " "}
        />
        </Grid>
        <Grid item xs={4}>
          <FormControl variant="outlined" className={classes.boxOutLined} error={ !!error["style"] && true }>
            <InputLabel id="demo-simple-select-outlined-label">Seleccionar</InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              value={ style }
              onChange={ handleStyleChange }
              error={ !!error["style"] && true }
              errorskey={ "style" }
              name='style'
            >
              <MenuItem key='string' value={'string'}>Texto</MenuItem>
              <MenuItem key='number' value={'number'}>Numerico</MenuItem>
            </Select>
            <FormHelperText>{ error["style"] || " " }</FormHelperText>
          </FormControl>
        </Grid>
        <Grid container item xs={3}>
          <DotsMenu 
            pristine={ pristine }
            loadingAttr={ loadingAttr }
            createNewAttribute={ createNewAttribute }
            updateAttribute={ updateAttribute }
            handleActiveChange={ handleActiveChange }
            deleteAttrClick={ deleteAttrClick }
            active={ active }
            id={ id }
            />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default attrList;