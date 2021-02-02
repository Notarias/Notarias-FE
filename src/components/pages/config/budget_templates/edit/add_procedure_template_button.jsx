import React, { useEffect }               from 'react'
// import Button                             from '@material-ui/core/Button';
import Dialog                             from '@material-ui/core/Dialog';
import DialogContent                      from '@material-ui/core/DialogContent';
import DialogTitle                        from '@material-ui/core/DialogTitle';
import DialogActions                      from '@material-ui/core/DialogActions';
import ListToLinkOfProcedures             from './list_to_link_of-procedures';
import { styles }                         from '../styles';
import { withStyles }                     from '@material-ui/core/styles';
import { useMutation }                    from '@apollo/react-hooks';
import { UPDATE_BUDGETING_TEMPLATE }      from '../queries_and_mutations/queries';
import { GET_BUDGETING_TEMPLATE }         from '../queries_and_mutations/queries';
import Divider                            from '@material-ui/core/Divider';
import InputBase                          from '@material-ui/core/InputBase';
import SearchIcon                         from '@material-ui/icons/Search';
import CircularProgress                   from '@material-ui/core/CircularProgress';



import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';

const AddProcedureTemplateButton = (props) => {

  const { classes, proceduresTemplateData }= props
  const id = props.id
  const [procedureTemplate, setProcedureTemplate] = React.useState()
  const [openDialog, setOpenDialog] = React.useState(false)
  const [procedureSelectedOption, setProcedureSelectedOption] = React.useState()
  // const [disableButton, setDisableButton] = React.useState(false)
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const [searchLoading, setSearchLoading] = React.useState(false);

  useEffect(() => {
    setProcedureTemplate(proceduresTemplateData)
  }, [proceduresTemplateData])

  const [updateBudgetingTemplateMutation, updateProcessInfo] =
    useMutation(
      UPDATE_BUDGETING_TEMPLATE,
      {
        update(store, cacheData) {
          setOpen(false)
          setOpenDialog(false)
        },
        refetchQueries: [{
          query: GET_BUDGETING_TEMPLATE,
          variables: { "id": id },
        }],
        awaitRefetchQueries: true
      }
    )

  const updateLinkedProcedureTemplate = (event) => {
    updateBudgetingTemplateMutation({ variables: {"id": id, "proceduresTemplateId": procedureSelectedOption.id}})
  }

  const updateUnlinkProcedureTemplate = (event) => {
    updateBudgetingTemplateMutation({ variables: {"id": id, "proceduresTemplateId": null}})
  }

  const handleClickOpenDialog = () => {
    setOpenDialog(true)
    setProcedureSelectedOption(false)
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
    // setDisableButton(false)
  }

  const procedureSelected = () => {
    return (
      procedureTemplate ? "No." + procedureTemplate.serialNumber : "+ Tramite"
    ) 
  }

  const handleClick = () => {
    // console.info(`You clicked ${options[selectedIndex]}`);
    console.log("hola")
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  return(
    <Grid container direction="column" alignItems="center">
      <Grid item xs={12}>
        <ButtonGroup variant="contained" color="primary" ref={anchorRef} aria-label="split button">
          <Button onClick={handleClick} disabled={ !procedureTemplate }>
            { procedureSelected() }
          </Button>
          <Button
            color="primary"
            size="small"
            aria-controls={open ? 'split-button-menu' : undefined}
            aria-expanded={open ? 'true' : undefined}
            aria-label="select merge strategy"
            aria-haspopup="menu"
            onClick={handleToggle}
          >
            <ArrowDropDownIcon />
          </Button>
        </ButtonGroup>
        <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList id="split-button-menu">
                    <MenuItem
                      onClick={ handleClickOpenDialog }
                    >
                      { procedureTemplate ? "Cambiar tramite" : "Añadir tramite" }
                    </MenuItem>
                    <Divider/>
                    <MenuItem
                      onClick={ updateUnlinkProcedureTemplate }
                      disabled={ !procedureTemplate }
                    >
                      Desvincular
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
        <Dialog open={ openDialog } onClose={ handleCloseDialog } >
          <DialogTitle>
            Selecciona un Trámite para vincularlo
          </DialogTitle>
          <DialogContent>
            {/* <div className={classes.search}>
              <div className={classes.searchIcon}>
                { 
                  searchLoading ?
                  <CircularProgress size={25} /> :
                  <SearchIcon /> 
                }
              </div>
            </div> */}
            <ListToLinkOfProcedures
              procedureSelectedOption={ procedureSelectedOption }
              setProcedureSelectedOption={ setProcedureSelectedOption }
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={ handleCloseDialog }
            >
              Cancelar
            </Button>
            <Button
              onClick={ updateLinkedProcedureTemplate }
              disabled={ !procedureSelectedOption }
            >
              Aceptar
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
    </Grid>
    // <>
    //   <Button onClick={ handleClickOpen }>
    //     { procedureSelected() }
    //   </Button>
    //   <Dialog open={ openb } onClose={ handleCloseb } >
    //     <DialogTitle>
    //       Selecciona un Trámite para vincularlo
    //     </DialogTitle>
    //     <DialogContent>
    //       <ListToLinkOfProcedures
    //         procedureLinked={ procedureLinked }
    //         procedureIdSelected={ procedureIdSelected }
    //       />
    //     </DialogContent>
    //     <DialogActions>
    //       <Button
    //         onClick={ handleClose }
    //       >
    //         Cancelar
    //       </Button>
    //       <Button
    //         onClick={ updateLinkedProcedureTemplate }
    //         disabled={ !procedureIdSelected }
    //       >
    //         Aceptar
    //       </Button>
    //     </DialogActions>
    //   </Dialog>
    // </>
  )
}

export default withStyles(styles)(AddProcedureTemplateButton);
