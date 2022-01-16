import React, { useState }  from 'react'
import { withStyles }       from '@material-ui/core/styles';
import { styles }           from '../../styles';
import Grid                 from '@material-ui/core/Grid';
import Divider              from '@material-ui/core/Divider';
import CommentsList         from './comments_list/comments_list';
import AuditLog             from './audit_log';
import GeneralInformation   from './general_information';
import Tabs                 from '@material-ui/core/Tabs';
import Tab                  from '@material-ui/core/Tab';


const Activities = (props) => {
  const { budget } = props
  const [activity, setActivity] = useState(0)

  const  renderActivitiesMenu = () => {
    switch (activity) {
      case 0 :
        return(<GeneralInformation budget={budget}/>)
      case 1 :
        return(<CommentsList budget={budget}/>)
      case 2 :
        return(<AuditLog budget={budget}/>)
      default :
        return(<></>)
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
