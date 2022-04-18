import React  from 'react';
import Tab    from '@material-ui/core/Tab';


const BudgetTemplateTab = (props) => {

  const [tab] = React.useState(props.tab)


 
  const onClick = () => {
    props.setCurrentTab(tab)
    props.setValue(props.index)
  }

  let styles = !tab.calculable ? { backgroundColor: '#fff', color: '#3f51b5' } : {}

  return(
    <Tab key={tab.id + "-tab"} label={tab.name} style={styles} onClick={onClick}/>
  )
}


export default BudgetTemplateTab;
