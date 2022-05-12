import React, { useState }        from 'react';
import Divider                    from '@material-ui/core/Divider';
import Breadcrumbs                from '../../ui/breadcrumbs';
import MonitorDisplay             from './monitor_display';
import TabletDisplay              from './tablet_display';
import { Hidden } from '@material-ui/core';

const BREADCRUMBS = [
  { name: "Perfil", path: "/" },
]

const ProfilePanel = (props) => {
  const { currentUser } = props

  const [panelStatus, setPanelStatus] = useState(false);

  const switchPanelStatus = () => {
    setPanelStatus(!panelStatus);
  }

  return(
    <>
      <Breadcrumbs breadcrumbs={ BREADCRUMBS }/>
      <Divider style={{marginBottom: '50px'}}/>
      <Hidden smDown>
        <MonitorDisplay currentUser={currentUser} panelStatus={panelStatus} switchPanelStatus={switchPanelStatus}/>
      </Hidden>
      <Hidden mdUp>
        <TabletDisplay currentUser={currentUser} panelStatus={panelStatus} switchPanelStatus={switchPanelStatus}/>
      </Hidden>
    </>
  )
}

export default ProfilePanel;
