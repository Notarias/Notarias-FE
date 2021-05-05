import React, { useState }                  from 'react';
import Tab from '@material-ui/core/Tab';


const BudgetTemplateTab = (props) => {

  const [tab] = React.useState(props.tab)


 
  const onClick = () => {
    props.setCurrentTab(tab)
    props.setValue(props.index)
  }

  return(
    <Tab key={tab.id + "-tab"} label={tab.name} onClick={onClick}/>
  )
}


export default BudgetTemplateTab;
