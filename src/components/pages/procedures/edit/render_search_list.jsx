import React                          from 'react';
import Avatar                         from '@material-ui/core/Avatar';
import List                           from '@material-ui/core/List';
import ListItem                       from '@material-ui/core/ListItem';
import ListItemIcon                   from '@material-ui/core/ListItemIcon';
import ListItemText                   from '@material-ui/core/ListItemText';
import Divider                        from '@material-ui/core/Divider';

const RenderSearchList = (props) => {

  const { searchList, selectedIndex, handleListItemClick, haveThumbUrl } = props

  return(
    <List 
      component="nav" 
      aria-label="contacts" 
      disablePadding={true}
    >
      { 
        searchList.map(
          (item) => {
            let obj = item.item || item

            return(
              <React.Fragment key={`procedures-edit-RenderSearchList-${item.id}`}>
                <ListItem 
                  dense
                  button
                  selected={selectedIndex === obj.id}
                  onClick={() => {handleListItemClick(obj)}}
                >
                  <ListItemIcon>
                      <Avatar src={haveThumbUrl(obj)}/>
                  </ListItemIcon>
                    <ListItemText 
                    id={obj.id} 
                    primary={` ${ obj.firstName }  ${ obj.lastName }`} 
                    />
                </ListItem>
                <Divider/>
              </React.Fragment>
            )
          }
        )
      }
    </List>
  )
}

export default RenderSearchList;
