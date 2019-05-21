import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MoreVertIcon from '@material-ui/icons/MoreVert';
// import { withStyles } from '@material-ui/core/styles';

const ITEM_HEIGHT = 48;

export default class GenericDropdownMenu extends React.Component {
  state = {
    anchorEl: null,
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;
    const { children, user } = this.props;

    const open = Boolean(anchorEl);

    return (
      <div>
        <IconButton
          aria-label="More"
          aria-owns={open ? 'long-menu' : undefined}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="long-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={this.handleClose}
          PaperProps={{
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: 200,
            },
          }}
        >
          {children.map(child => (
            React.cloneElement(
              child,
              {
                onClick: () => {
                  child.props.onClick(user);
                  this.handleClose();
                }
              }
            )
          ))}
        </Menu>
      </div>
    );
  }
}

// export default withStyles(theme => ({
//   dropdownSelectedElement: {
//     '&:focus': {
//       backgroundColor: theme.palette.primary.main,
//       '& $primary, & $icon': {
//         color: theme.palette.common.white,
//       }
//     }
//   },
//   primary: {},
//   icon: {},
// }))(GenericDropdownMenu)

