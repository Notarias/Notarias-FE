import React                                from 'react';
import { styles }                           from '../styles';
import { withStyles }                       from '@material-ui/core/styles';
import ListItem                             from '@material-ui/core/ListItem';
import ListItemText                         from '@material-ui/core/ListItemText';

const TemplateSelectOption = (props) => {
  const [template] = React.useState(props.template)
  const {classes} = props

  const clickHandler = () => {
    const ejemp = props.setProcedureSelectedOptions([template])
    console.log(ejemp, "select")
  }

  console.log(props.procedureSelectedOptions, "id")
  return(
    <ListItem
      button
      data-item-id={template.id}
      onClick={ clickHandler }
      key={template.id + "-template"}
      selected={props.procedureSelectedOptions && props.procedureSelectedOptions.id == template.id}
    >
      <ListItemText primary={template.name} />
    </ListItem>
  )
}

export default withStyles(styles)(TemplateSelectOption);
