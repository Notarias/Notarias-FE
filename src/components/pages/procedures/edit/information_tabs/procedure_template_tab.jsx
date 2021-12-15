import React, { useState }                  from 'react';
import Tab from '@material-ui/core/Tab';

const ProcedureTemplateTab = (props) => {

  const [tab] = useState(props.tab)

  const onClick = () => {
    props.setCurrentTab(tab)
    props.setValue(props.index)
  }

  return(
    <Tab key={tab.id + "-tab"} label={tab.name} onClick={onClick}/>
  )
}

export default ProcedureTemplateTab;
