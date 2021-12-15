import React, { useState, useEffect }           from 'react';
import Grid                                     from '@material-ui/core/Grid';
import TextField                                from '@material-ui/core/TextField';
import IconButton                               from '@material-ui/core/IconButton';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import Menu                                     from '@material-ui/core/Menu';
import MenuItem                                 from '@material-ui/core/MenuItem';
import Switch                                   from '@material-ui/core/Switch';
import SaveIcon                                 from '@material-ui/icons/Save';
import EditIcon                                 from '@material-ui/icons/Edit';
import ClearIcon                                from '@material-ui/icons/Clear';
import MoreVertIcon                             from '@material-ui/icons/MoreVert';
import { useQuery }                             from '@apollo/client';
import { GET_PROCEDURE_FIELD_GROUP_VALUES }     from '../../queries_and_mutations/queries';
import FieldsGroupsRows                         from './fields_group_rows';

const GroupsRows = (props) => {

  const { procedure, group } = props

  const [selected, setSelected] = useState(null);
  const [menuState, setMenuState] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [groupFieldsValues, setGroupFieldsValues] = useState();

  const {  loading, data, refetch } = useQuery(
    GET_PROCEDURE_FIELD_GROUP_VALUES,
    {
      variables: { "fieldGroupId": group.id, "procedureId": procedure.id },
      fetchPolicy: "no-cache"
    }
  );

  useEffect(() => {
    if(data && data.procedureFieldGroupValues) {
      setGroupFieldsValues(data.procedureFieldGroupValues);
    }
  }, [loading, data]);

  const openMenu = ( event ) => {
    setMenuState(true);
    setAnchorEl(event.currentTarget);
  }

  const closeMenu = () => {
    setMenuState(false);
    setAnchorEl(null);
  }

  const cancelMenu = () => {
    setSelected(null);
    setMenuState(false);
    setAnchorEl(null);
  }

  return (
    <Grid container item
      key={group.id + 'group-row'}
      style={{ flex: '1 1 auto' }}
      direction='column'
      alignItems="stretch"
      justifyContent="flex-start"
      style={{marginBottom: '15px', minHeight: '70px' }}
    >
      {
        <Card>
          <CardHeader
            avatar={
              <Typography color="textSecondary" style={{ justifyContent: "flex-end" }}>
                {group.name}
              </Typography>
            }
            action={
              <>
                <IconButton aria-label="settings" onClick={openMenu}>
                  <MoreVertIcon />
                </IconButton>
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={menuState}
                  onClose={cancelMenu}
                >
                  <MenuItem onClick={closeMenu}>My account</MenuItem>
                  <MenuItem onClick={closeMenu}>Logout</MenuItem> 
                </Menu>
              </>
            }
          />
          <CardContent>
            <Grid container item alignItems="stretch" justifyContent="flex-start">
            {
              groupFieldsValues && groupFieldsValues.map((groupFieldValue) => {
                return(
                  <FieldsGroupsRows key={groupFieldValue.id} groupFieldValue={groupFieldValue} procedure={procedure}/>
                )
              })
            }
            </Grid>
          </CardContent>
        </Card>
      }
    </Grid>
  )
}

export default GroupsRows;
