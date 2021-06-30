import React, { useState, useEffect } from 'react';
import { withStyles }                 from '@material-ui/core/styles';
import { styles }                     from '../styles';
import Typography                     from '@material-ui/core/Typography';
import Grid                           from '@material-ui/core/Grid';
import Avatar                         from '@material-ui/core/Avatar';
import Dialog                         from '@material-ui/core/Dialog';
import DialogActions                  from '@material-ui/core/DialogActions';
import DialogContent                  from '@material-ui/core/DialogContent';
import DialogTitle                    from '@material-ui/core/DialogTitle';
import Button                         from '@material-ui/core/Button';
import TextField                      from '@material-ui/core/TextField';
import List                           from '@material-ui/core/List';
import ListItem                       from '@material-ui/core/ListItem';
import ListItemIcon                   from '@material-ui/core/ListItemIcon';
import ListItemText                   from '@material-ui/core/ListItemText';
import Divider                        from '@material-ui/core/Divider';
import { useQuery }                   from '@apollo/react-hooks';
import { useMutation }                from '@apollo/react-hooks';
import { LOAD_USERS }                 from '../queries_and_mutations/queries'
import { UPDATE_BUDGET }              from '../queries_and_mutations/queries'
import Fuse                           from 'fuse.js';
import { GET_BUDGET }                 from '../queries_and_mutations/queries'
import { GET_BUDGETS_AUDITLOG }       from '../queries_and_mutations/queries';


const renderSearchList = (searchList, classes, selectedIndex, handleListItemClick, haveThumbUrl) => {
  return(
    <List 
      component="nav" 
      aria-label="contacts" 
      disablePadding={true}
    >
      { 
        searchList.map(
          (item) => {
            let obj = item.item || item
            return(
              <React.Fragment key={obj.id + "fragment"}>
                <ListItem 
                  key={obj.id} 
                  dense
                  button
                  selected={selectedIndex === obj.id}
                  onClick={() => {handleListItemClick(obj)}}
                >
                  <ListItemIcon>
                      <Avatar src={haveThumbUrl(obj)}/>
                  </ListItemIcon>
                    <ListItemText 
                    id={obj.id} 
                    primary={` ${ obj.firstName }  ${ obj.lastName }`} 
                    />
                </ListItem>
                <Divider/>
              </React.Fragment>
            )
          }
        )
      }
    </List>
  )
}

const Asignee = (props) => {
  const { classes, asigneeData, budgetId }  = props
  const [open, setOpen]                     = React.useState(false)
  const [searchList, setSearchList]         = React.useState([])
  const [fuzzySearcher, setFuzzySearcher]   = React.useState(new Fuse(users, { keys: ['firstName'] }))
  const [initialized, setInitialized]       = React.useState()

  const [selectedIndex, setSelectedIndex]   = React.useState(1);
  const [asignee, setAsignee]               = React.useState()
  const [sortField, setSortField]           = useState("first_name")
  const [sortDirection, setSortDirection]   = useState("desc")
  const [searchField]                       = useState("first_name_or_last_name_or_email_cont")
  const [searchValue, setSearchValue]       = useState("")
  const [timeout, setSetTimeout]            = useState(null)
  const [page, setPage]                     = useState(1)
  const [per, setPer]                       = useState(100)
  const [total_records, setTotalRecords]    = useState(0)

  let variables = {
    page: page,
    per: per,
    searchField: searchField,
    searchValue: searchValue,
    sortDirection: sortDirection,
    sortField: sortField
  }

  const defaultUser = {
    avatarThumbUrl: "/broken-image.jpg",
    firstName: "Añadir",
    lastName: "encargado"
  }

  const { loading, data, refetch } = useQuery(
    LOAD_USERS, { variables: variables }
  );

  const [users, setUsers] = React.useState([])

  useEffect(() => {

    if (!initialized && data && data.users) {
      setAsignee(defaultUser)
      setUsers(data.users)
      setFuzzySearcher(new Fuse(data.users, { keys: ['firstName'] }))
      setSearchList(data.users)
      setInitialized(true) 
      setTotalRecords(data.usersCount)
    }
  }, [data]);

  useEffect(() => {
    if (asigneeData) {
      setAsignee({
        avatarThumbUrl: asigneeData.avatarThumbUrl,
        firstName: asigneeData.firstName,
        lastName: asigneeData.lastName
      })
    }
  },[asigneeData]);

  function changeSearch(event) {
    let result = fuzzySearcher.search(event.target.value)
    if (event.target.value.length === 0){
      setSearchList(users)
    } else {
      setSearchList(result)
    }
  }

  const [updateBudgetMutation, updateBudgetProcessInfo] =
  useMutation(
    UPDATE_BUDGET,
    {
      onError(apolloError) {
        // setErrors(apolloError)

      },
      onCompleted(cacheData) {
        setOpen(false);
      },
      refetchQueries: [
        {
          query: GET_BUDGET,
          variables: {"id": budgetId }
        },
        {
          query: GET_BUDGETS_AUDITLOG,  
            variables: {"budgetId":budgetId}
        }
      ],
      awaitRefetchQueries: true
    }
  )

  const assingUser = (event) => {
    updateBudgetMutation({
       variables:{
        "id": budgetId ,
        "asigneeId": asignee.id ,
       }
    })
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSearchList(users)
  };

  const handleListItemClick = (obj) => {
    setSelectedIndex(obj.id);
    setAsignee(obj);
  };

  const haveThumbUrl = (obj) => {
    if(obj.avatarThumbUrl === null){
      return("/broken-image.jpg")
    } else {
      return(obj.avatarThumbUrl)
    }
  }

  return (
    <Grid container direction="row" alignItems="center">
      <a href="#" className={classes.aWithoutDecoration} onClick={handleClickOpen}>
        <Grid container direction="row" alignItems="center">
          <Avatar 
            src={asignee ? asignee.avatarThumbUrl : "/broken-image.jpg" }
            className={classes.avatarOfInCharge}
            size="small"
          />
          <Typography variant="caption">{asignee && asignee.firstName} {asignee && asignee.lastName}</Typography>
        </Grid>
      </a>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          Asignar encargado
        </DialogTitle>
        <DialogContent>
          <TextField
            onChange={ changeSearch }
            id="fuse-basic"
            label="Buscar"
            variant="outlined"
            fullWidth
            className={classes.searchAsigneeInput}
          />
          {
            renderSearchList(searchList, classes,  selectedIndex, handleListItemClick, haveThumbUrl)
          }
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>
            Cancelar
          </Button>
          <Button onClick={() => {assingUser()}}>
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  )
}

export default withStyles(styles)(Asignee);
