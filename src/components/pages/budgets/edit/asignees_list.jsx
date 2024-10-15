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
import { useQuery }                   from '@apollo/client';
import { useMutation }                from '@apollo/client';
import { LOAD_USERS }                 from '../queries_and_mutations/queries';
import { UPDATE_BUDGET }              from '../queries_and_mutations/queries';
import Fuse                           from 'fuse.js';
import { GET_BUDGET }                 from '../queries_and_mutations/queries';
import { GET_BUDGETS_AUDITLOG }       from '../queries_and_mutations/queries';
import Asignee                        from './asignee';


const defaultUser = {
  avatarThumbUrl: "/broken-image.jpg",
  firstName: "Añadir",
  lastName: "encargado"
}

const AsigneesList = (props) => {
  const { classes, asigneeData, budget }  = props
  const [open, setOpen]                     = useState(false);
  const [searchList, setSearchList]         = useState([]);
  const [initialized, setInitialized]       = useState();
  const [assigneToMutation, setAssigneToMutation] = useState();
  const [selectedIndex, setSelectedIndex]   = useState(1);
  const [asignee, setAsignee]               = useState();
  const [sortField]                         = useState("first_name");
  const [sortDirection]                     = useState("desc");
  const [searchField]                       = useState("first_name_or_last_name_or_email_cont");
  const [searchValue]                       = useState("");
  const [page]                              = useState(1);
  const [per]                               = useState(100);
  const [pristine, setPristine]             = useState(true);
  const [users, setUsers]                   = useState([]);
  const [fuzzySearcher, setFuzzySearcher]   = useState(new Fuse(users, { keys: ['firstName'] }));

  let variables = {
    page: page,
    per: per,
    searchField: searchField,
    searchValue: searchValue,
    sortDirection: sortDirection,
    sortField: sortField
  }

  const { data } = useQuery(
    LOAD_USERS, { variables: variables }
  );

  useEffect(() => {
    if (!initialized && data && data.users) {
      setUsers(data.users)
      setFuzzySearcher(new Fuse(data.users, { keys: ['firstName'] }))
      setSearchList(data.users)
      setInitialized(true) 
    }
  }, [data]);

  useEffect(() => {
    if (asigneeData) {
      setAsignee({
        avatarThumbUrl: asigneeData.avatarThumbUrl,
        firstName: asigneeData.firstName,
        lastName: asigneeData.lastName
      })
    } else {
      setAsignee(defaultUser)
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

  const [updateBudget, {loading: updateBudgetLoading}] =
  useMutation(
    UPDATE_BUDGET,
    {
      onCompleted(cacheData) {
        setOpen(false);
        setPristine(true);
      },
      refetchQueries: [
        {
          query: GET_BUDGET,
          variables: {"id": budget.id }
        },
        {
          query: GET_BUDGETS_AUDITLOG,  
          variables: { "budgetId": budget.id }
        }
      ],
      awaitRefetchQueries: true
    }
  )

  const assingUser = (event) => {
    updateBudget({
      variables:{
        "id": budget.id ,
        "asigneeId": assigneToMutation.id ,
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
    setPristine(false)
    setAssigneToMutation(obj);
  };

  return (
    <Grid container direction="row" alignItems="flex-start">
      <Button fullWidth style={{ padding: '10px' }}>
        <Grid container alignItems="center" justifyContent='flex-start' onClick={handleClickOpen}>
          <Grid item xs={3} md={2} lg={1}>
            <Avatar
              src={asignee ? asignee.avatarThumbUrl : "/broken-image.jpg" }
              size="small"
            />
          </Grid> 
          <Grid item xs={9} md={10} lg={11}>
            <Typography noWrap align='left' style={{ paddingLeft: "20px", paddingRight: "10px" }}>
              {
                asignee ?
                  <strong>{asignee && asignee.firstName} {asignee && asignee.lastName}</strong> :
                  "Asignar encargado"
              }
            </Typography>
          </Grid>
        </Grid>
      </Button>
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
            <List 
              component="nav" 
              aria-label="contacts" 
              disablePadding={true}>
              { 
                searchList.map(
                  (item) => {
                    let obj = item.item || item
                    return(
                      <Asignee
                        key={`${obj.id}-asignee-selector`}
                        asignee={obj}
                        handleListItemClick={handleListItemClick}
                        selectedIndex={selectedIndex}/>
                    )
                  }
                )
              }
            </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>
            Cancelar
          </Button>
          <Button 
            onClick={assingUser}
            disabled={pristine || updateBudgetLoading}
          >
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  )
}

export default withStyles(styles)(AsigneesList);
