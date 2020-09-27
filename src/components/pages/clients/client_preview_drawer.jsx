import React, { useEffect }         from 'react';
import Drawer                       from '@material-ui/core/Drawer';
import clsx                         from 'clsx';
import { styles }                   from './styles';
import Button                       from '@material-ui/core/Button';
import List                         from '@material-ui/core/List';
import ListItem                     from '@material-ui/core/ListItem';
import ListItemIcon                 from '@material-ui/core/ListItemIcon';
import ListItemText                 from '@material-ui/core/ListItemText';
import CloseIcon                    from '@material-ui/icons/Close';
import VisibilityIcon               from '@material-ui/icons/Visibility';
import Typography                   from '@material-ui/core/Typography';
import { useQuery }                 from '@apollo/react-hooks';
import { GET_CLIENT }               from './clients_queries_and_mutations/queries';
import PersonIcon                   from '@material-ui/icons/Person';
import MailOutlineIcon              from '@material-ui/icons/MailOutline';
import PhoneRoundedIcon             from '@material-ui/icons/PhoneRounded';
import BusinessIcon                 from '@material-ui/icons/Business';
import EmojiTransportationIcon      from '@material-ui/icons/EmojiTransportation';
import AssignmentIndIcon            from '@material-ui/icons/AssignmentInd';
import Link                         from '@material-ui/core/Link';
import { withStyles }               from '@material-ui/core/styles';


const clientPreviewDrawer = (props) => {

  const { classes, match } = props
  const [id, setId] = React.useState(props.id);
  const { loading, error, data } = useQuery(GET_CLIENT, { variables: { "id": id } });

  const [state, setState] = React.useState({ right: false });

  const toggleDrawer = (anchor, open) => {
    return (
      (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
          return;
        }
        setState({ ...state, [anchor]: open });
      }
    )
  }

  const serial = data && data.client.serialNumber
  const folioNumber = (serial) => {
    if(serial) {
      return serial.toString().padStart(5, "0")
    }
  }


  const list = (anchor) => (
    <div>
      <div
        className={clsx(classes.list, {
          [classes.fullList]: anchor === 'top' || anchor === 'bottom',
        })}
        role="presentation"
        onClick={toggleDrawer(anchor, false)}
        onKeyDown={toggleDrawer(anchor, false)}
      >
        <List>
          <ListItem>
            <Button>
              <CloseIcon/>
            </Button>
          </ListItem>
          <ListItem>
            <div className={classes.infoAndSerialBox}>
              <div className={classes.serialNumberText}>
                <Typography variant="overline" display="inline" >
                  # { folioNumber(serial) }
                </Typography>
              </div>
              <div className={classes.informationText}>
                <Typography variant="h5" display="inline" >
                  Información
                </Typography>
              </div>
            </div>
          </ListItem>
          <ListItem>
            <ListItemIcon>  
              <PersonIcon/>
            </ListItemIcon>
            <ListItemText primary={ data && data.client.firstName + " " + data && data.client.lastName } />
          </ListItem>
          <ListItem>
            <ListItemIcon>  
              <MailOutlineIcon/>
            </ListItemIcon>
            <ListItemText primary={ data && data.client.email } />
          </ListItem>
          <ListItem>
            <ListItemIcon>  
              <PhoneRoundedIcon/>
            </ListItemIcon>
            <ListItemText primary={ data && data.client.phone } />
          </ListItem>
          <ListItem>
            <ListItemIcon>  
              <BusinessIcon/>
            </ListItemIcon>
            <ListItemText primary={ data && data.client.address } />
          </ListItem>
          <ListItem>
            <ListItemIcon>  
              <EmojiTransportationIcon/>
            </ListItemIcon>
            <ListItemText primary={ data && data.client.business } />
          </ListItem>
          <ListItem>
            <ListItemIcon>  
              <AssignmentIndIcon/>
            </ListItemIcon>
            <ListItemText primary={ data && data.client.category } />
          </ListItem>
        </List>
      </div>
      <div className={ classes.moreDetailsLink }>
        <Typography variant="overline" align="center" display='block' >
          <Link href={`/clients/${ data && data.client.id}`} >
            Ver más detalles
          </Link>
        </Typography>
      </div>
    </div>
  );

  return (
    <div>
        <React.Fragment key={"right"}>
          <Button onClick={toggleDrawer("right", true)}><VisibilityIcon/></Button>
          <Drawer anchor={"right"} open={state["right"]} onClose={toggleDrawer("right", false)}>
            {list("right")}
          </Drawer>
        </React.Fragment>
    </div>
  );
}

export default withStyles(styles)(clientPreviewDrawer);