import React, { useState, useRef }  from 'react'
import { withStyles }       from '@material-ui/core/styles';
import { styles }           from '../../styles';
import Button               from '@material-ui/core/Button';
import Menu                 from '@material-ui/core/Menu';
import MenuItem             from '@material-ui/core/MenuItem';
import Grid                 from '@material-ui/core/Grid';
import Divider              from '@material-ui/core/Divider';
import ArrowDropDownIcon    from '@material-ui/icons/ArrowDropDown';
import Typography           from '@material-ui/core/Typography';
import Paper                from '@material-ui/core/Paper';
import CommentsList         from './comments_list/comments_list';
import AuditLog             from './audit_log';
import GeneralInformation   from './general_information';
import Tabs                 from '@material-ui/core/Tabs';
import Tab                  from '@material-ui/core/Tab';


const Activities = (props) => {
  const { procedure } = props
  const [activity, setActivity] = useState(0)

  const  renderActivitiesMenu = () => {
    switch (activity) {
      case 0 :
        return(<GeneralInformation procedure={procedure}/>)
      case 1 :
        return(<CommentsList procedure={procedure}/>)
      case 2 :
        return(<AuditLog procedure={procedure}/>)
    }
  }

  const handleChange = (event, newValue) => {
    setActivity(newValue)
  }

  return(
    <Grid container direction="column" justifyContent="flex-start" alignItems="stretch" style={{ height: '100%' }}>
      <Divider />
      <Grid item>
        <Tabs variant="fullWidth" value={activity} indicatorColor='primary' textColor='primary' onChange={handleChange}>
          <Tab label='General'/>
          <Tab label='Comentarios'/>
          <Tab label='Historial'/>
        </Tabs>
      </Grid>
      <Grid item container justifyContent='flex-start' style={{ flexGrow: '1', paddingLeft: "20px", paddingTop: "20px",paddingRight: "20px"}}>
        { renderActivitiesMenu() }
      </Grid>
    </Grid>
  )
}

export default withStyles(styles)(Activities);
