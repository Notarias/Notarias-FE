import React                                     from 'react';
import { styles }                                     from '../styles';
import { withStyles }                                 from '@material-ui/core/styles';

const TemplateSelectOption = (props) => {
  const [template] = React.useState(props.template)

  const clickHandler = () => {
    props.selectItem(template)
  }

  return(
    <div data-item-id={template.id} onClick={ clickHandler } key={template.id + "-template"}>
      {template.name}
      {props.selectedItem && props.selectedItem.id == template.id ? "elegido" : "" }
    </div>
  )
}

export default withStyles(styles)(TemplateSelectOption);