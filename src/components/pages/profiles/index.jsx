import React, { Component } from 'react';
import GeneralPanel from './general_panel';
import { withStyles }       from '@material-ui/core/styles';

const styles = {
  columsWraper:{
    height: '100%',
    backgroundColor: "white",
  }
}

class ProfilesIndex extends Component {
  render() {
    return(
      <div style={ styles.columsWraper }>
        <GeneralPanel/>
      </div>
    )
  }
}
export default withStyles(()=>{})(ProfilesIndex);
