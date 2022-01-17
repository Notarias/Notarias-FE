import React        from 'react';
import ListItem     from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider      from '@material-ui/core/Divider';
import Avatar       from '@material-ui/core/Avatar';

export default (props) => {

  const { selectedIndex, asignee, handleListItemClick } = props;

  const haveThumbUrl = (asignee) => {
    if(asignee.avatarThumbUrl === null){
      return("/broken-image.jpg")
    } else {
      return(asignee.avatarThumbUrl)
    }
  }

  const handleSelect = () => {
    handleListItemClick(asignee)
  }

  return(
    <React.Fragment key={asignee.id + "fragment"}>
      <ListItem 
        key={asignee.id} 
        dense
        button
        selected={selectedIndex === asignee.id}
        onClick={handleSelect}
      >
        <ListItemIcon>
          <Avatar src={haveThumbUrl(asignee)}/>
        </ListItemIcon>
          <ListItemText 
            id={asignee.id} 
            primary={` ${ asignee.firstName }  ${ asignee.lastName }`} 
          />
      </ListItem>
      <Divider/>
    </React.Fragment>
  )
}