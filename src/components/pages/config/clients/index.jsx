import React, { useEffect}         from 'react';
import { makeStyles }              from '@material-ui/core/styles';
import Paper                       from '@material-ui/core/Paper';
import Button                      from '@material-ui/core/Button';
import Grid                        from '@material-ui/core/Grid';
import AttrList                    from './attr_list';
import Breadcrumbs                 from '../../../ui/breadcrumbs'
import Typography                  from '@material-ui/core/Typography';
import { useQuery }                from '@apollo/client';
import { GET_CLIENT_ATTRIBUTES }   from './queries_and_mutations/queries';


const BREADCRUMBS = [
  { name: "Inicio", path: "/" },
  { name: "Atributos de Clientes", path: null }
]

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: 'left',
    color: theme.palette.text.secondary,
  },
  gridPadding:{
    padding: '30px',
  },
  gridPadding2:{
    padding: '30px',
    justifyContent: 'flex-end',
  },
  gridMargin:{
    margin: '20px',
  },
}));

const ConfigClientsIndex  = ()=> {

  const { loading, data } = useQuery(GET_CLIENT_ATTRIBUTES, {fetchPolicy: 'no-cache'})
  const [attrList, setAttrList] = React.useState(data ? data.clientAttributes : [])

  useEffect(() => {
    data && setAttrList(data.clientAttributes);
  }, [data])

  const addNewAttr = (event) => {
    setAttrList(attrList.concat([{ active: true }]))
  }

  const removeFromList = (index, mutation, variables, id) => {
    if(id){
      mutation(variables)
    }
    attrList.splice(index, 1)
    let newArray = attrList.slice()
    setAttrList(newArray)
  }

  const renderAttributes = () => {

    return(
      attrList.map(
        (attr, index) => {
          return (
            <AttrList 
              key={ index + '-attr'}
              arrayIndex={ index } 
              id={ attr.id } 
              name={ attr.name || "" }
              style={ attr.style || "" }
              active={ attr.active }
              removeFromList={ removeFromList }
            />
          )
        }
      )
    )
  }

  const classes = useStyles();

  return (
    <>
    <Breadcrumbs breadcrumbs={BREADCRUMBS}/>
    <Grid container justifyContent="center" className={classes.gridMargin}>
      <Grid item  xs={7}>
        <Paper>
          <Grid container justifyContent="flex-start" aling-item="right">
            <Grid item xs={4} className={classes.gridPadding}>
              <Typography variant="h4">
                Atributos
              </Typography>
            </Grid>
            <Grid item xs={4}>

            </Grid>
            <Grid item xs={4} container className={classes.gridPadding2}>
            <Grid item >
              <Button 
                variant="contained" 
                color="primary"
                onClick={addNewAttr}
              >
                Nuevo
              </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid container justifyContent="center">
            <Grid container item className={classes.gridPadding}>
              {
                loading ? 
                "cargando" :
                renderAttributes()
              }
            </Grid>
          </Grid>
          <Grid container justifyContent="center">
            <Grid item>
              Nuevo atributo de cliente
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
    </>
  );
};

export default ConfigClientsIndex;
