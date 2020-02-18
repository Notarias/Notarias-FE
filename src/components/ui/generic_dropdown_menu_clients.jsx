import React        from 'react';
import IconButton   from '@material-ui/core/IconButton';
import Menu         from '@material-ui/core/Menu';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import MenuItem from '@material-ui/core/MenuItem';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import BudgetsIcon          from './../../icons/presupuestos.svg';
import AppointmentsIcon     from './../../icons/calendario.svg';
import ReportsIcon          from './../../icons/reportes.svg';
import FormsIcon            from './../../icons/tramites.svg';
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
          <MenuItem>
            <VisibilityOutlinedIcon/>
            <span style={{ paddingLeft: "10px" }}>
              Detalles
            </span>
          </MenuItem>
          <MenuItem>
            <img alt={"presupuestos"} src={BudgetsIcon} style={{ width: "25px", height: "25px"}}/>
            <span style={{paddingLeft: "10px"}}>
              Presupuestos
            </span>
          </MenuItem>
          <MenuItem>
            <img alt={"Agenda"} src={AppointmentsIcon} style={{ width: "26px", height: "26px"}}/>
            <span style={{paddingLeft: "10px"}}>
              Agenda
            </span>
          </MenuItem>
          <MenuItem>
            <img alt={"Reporte"} src={ReportsIcon} style={{ width: "25px", height: "25px"}}/>
            <span style={{paddingLeft: "10px"}}>
              Reporte
            </span>
          </MenuItem>
          <MenuItem>
          <img alt={"Trámites"} src={FormsIcon} style={{ width: "25px", height: "25px", paddingRight: "3px"}}/>
            <span style={{paddingLeft: "10px"}}>
              Trámites
            </span>
          </MenuItem>
        </Menu>
      </div>
    );
  }
}
