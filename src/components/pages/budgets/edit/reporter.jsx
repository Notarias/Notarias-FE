import React, { useState, useEffect } from 'react';
import { withStyles }                 from '@material-ui/core/styles';
import { styles }                     from '../styles';
import Typography                     from '@material-ui/core/Typography';
import Grid                           from '@material-ui/core/Grid';
import Avatar                         from '@material-ui/core/Avatar';
import Buttonbase                     from '@material-ui/core/ButtonBase';
import Button                         from '@material-ui/core/Button';
import Dialog                         from '@material-ui/core/Dialog';
import DialogActions                  from '@material-ui/core/DialogActions';
import DialogContent                  from '@material-ui/core/DialogContent';
import DialogTitle                    from '@material-ui/core/DialogTitle';
import TextField                      from '@material-ui/core/TextField';
import List                           from '@material-ui/core/List';
import ListItem                       from '@material-ui/core/ListItem';
import ListItemIcon                   from '@material-ui/core/ListItemIcon';
import ListItemText                   from '@material-ui/core/ListItemText';
import Divider                        from '@material-ui/core/Divider';
import { useQuery }                   from '@apollo/client';
import { useMutation }                from '@apollo/client';
import { LOAD_USERS }                 from '../queries_and_mutations/queries'
import { UPDATE_BUDGET }              from '../queries_and_mutations/queries'
import Fuse                           from 'fuse.js';
import { GET_BUDGET }                 from '../queries_and_mutations/queries'
import { GET_BUDGETS_AUDITLOG }       from '../queries_and_mutations/queries';

export default (props) => {

  const { classes, reporterData, budgetId } = props

  const [reporter, setReporter] = useState(reporterData)

  useEffect(() => {
    setReporter(reporterData)
  }, [!!reporterData])

  return(
    <Grid container direction="row" alignItems="left">
      <Button fullWidth style={{ }} >
        <Grid container xs={12} alignItems="center" justifyContent='flex-start' style={{ cursor: 'pointer' }}>
          <Grid item xs={3} md={2} lg={1}>
            <Avatar
              src={reporter ? reporter.avatarThumbUrl : "/broken-image.jpg" }
              size="small"
            />
          </Grid> 
          <Grid item xs={9} md={10} lg={11}>
            <Typography noWrap align='left' style={{ paddingLeft: "10px", paddingRight: "10px" }}>{reporter && reporter.firstName} {reporter && reporter.lastName}</Typography>
          </Grid>
        </Grid>
      </Button>
      {/* <Dialog open={open} onClose={handleClose}>
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
            className={classes.searchReporterInput}
          />
          {
            renderSearchList(searchList, classes,  selectedIndex, handleListItemClick, haveThumbUrl)
          }
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>
            Cancelar
          </Button>
          <Button 
            onClick={() => {assingUser()}}
            disabled={pristine || updateBudgetLoading}
          >
            Aceptar
          </Button>
        </DialogActions>
      </Dialog> */}
    </Grid>
  )
}