
import React, { useEffect }                       from 'react';
import { styles }                   from '../styles';
import { withStyles }               from '@material-ui/core/styles';
import Typography                   from '@material-ui/core/Typography';
import Grid                         from '@material-ui/core/Grid';
import Button                       from '@material-ui/core/Button';
import IconButton                   from '@material-ui/core/IconButton';
import Menu                         from '@material-ui/core/Menu';
import MenuItem                     from '@material-ui/core/MenuItem';
import MoreVertIcon                 from '@material-ui/icons/MoreVert';
import TextField                    from '@material-ui/core/TextField';
import SaveIcon                           from '@material-ui/icons/Save';
import CreateIcon                         from '@material-ui/icons/Create'
import { useMutation }                    from '@apollo/react-hooks';
import { GET_PROCEDURES_TEMPLATE_TABS }         from '../queries_and_mutations/queries'
import { UPDATE_PROCEDURES_TEMPLATE_TAB }     from '../queries_and_mutations/queries'
import Divider                      from '@material-ui/core/Divider';
import DeleteForeverIcon              from '@material-ui/icons/DeleteForever';
import StatusRadioButton              from '../index/statusRadioButton';




//TODO: hacer el refetch del update mutation


const TabMenu = (props) => {
  const { classes, proceduresTemplateId, selected, active } = props;
  const [id, setId] = React.useState(props.id);
  const [name, setName] = React.useState(props.name);
  const [editing, setEditing] =  React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  // const [status, setStatus] = React.useState(procedureTemplate.active);

  // useEffect(
  //   () => {
  //     setName(templateData.name)
  //   },
  //   [templateData]
  // )

  const [updateProceduresTemplateTabMutation, updateProcessInfo] =
  useMutation(
    UPDATE_PROCEDURES_TEMPLATE_TAB,
    {
      // onError(apolloError) {
      //   setErrors(apolloError)
      // },
      onCompleted(cacheData) {
        // setError(false)
        // setEditing(!editing)
      },
      refetchQueries: [{
        query: GET_PROCEDURES_TEMPLATE_TABS,
        variables: { "proceduresTemplateId": proceduresTemplateId },
      }],
    }
  )

  // const statusTemplate = () => { 
  //   return status ? "Desactivar" : "Activar"
  // }


  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  };

  const handleClose = () => {
    setAnchorEl(null)
  };

  let open = Boolean(anchorEl);

  const changeTittle = () => {
    setEditing(!editing)
  }

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const updateTab = (event) => {
    updateProceduresTemplateTabMutation(
      { 
        variables: { id: id , name: name},
        fetchPolicy: "no-cache"
      }
    )
    setEditing(!editing)
  }

  const changeStatus = (event) => {
    updateProceduresTemplateTabMutation(
      { 
        variables: { id: id , active: !active},
        fetchPolicy: "no-cache"
      }
    )
  }



  const loadingTab = updateProcessInfo.loading

  const renderTittleTextTab = () => {

    return(
      <>
        <Button
          // className={ classes.templateTittleButton }
          onClick={ changeTittle }
        >
          <CreateIcon />
        </Button>
        <Typography variant="overline" >
            { name }
        </Typography>
      </>
    )
  }

  
  const renderTittleInputTab = () => {

    return(
      <>
        <Button
          onClick={ updateTab }
          color="primary"
          disabled={ loadingTab }
        >
          <SaveIcon/>
        </Button>
        <TextField
          id="standard-basic" 
          label="Nombre"
          value={ name }
          onChange={ handleNameChange }
        />
      </>
    )
  }

  const markStatus = () => {
    if(!active) {
      return  classes.statusTemplateRow 
    }
  }



  return (
    <Grid className={ markStatus() } container alignItems="center" justify="flex-start">
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        disabled={ !selected }
        onClick={ handleClick }
        className={ selected ? classes.activeMenuTab : classes.menuTabDefault }
      >
      <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        keepMounted
        anchorEl={ anchorEl }
        open={ open }
        onClose={ handleClose }
      >
      <MenuItem className={ classes.tittleTabMenu }>
        { editing ? renderTittleTextTab() : renderTittleInputTab() }
      </MenuItem>
      <Divider/>
      <MenuItem>
        <Button>
          <DeleteForeverIcon/> 
        </Button>
        <Typography variant="overline" >
            Borrar
        </Typography>
      </MenuItem>
      <Divider/>
      <MenuItem>
      <Grid container item alignItems="center" >
        <StatusRadioButton
            active={ active }
            changeStatus= { changeStatus }
          />
      </Grid>
      </MenuItem>
    </Menu>
  </Grid>
  )
}

export default withStyles(styles)(TabMenu);
