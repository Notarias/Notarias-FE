import React from 'react'
import { withStyles }                       from '@material-ui/core/styles';
import { styles }                           from './styles';
import { Grid }             from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import Typography                           from '@material-ui/core/Typography';

const ClientsBudgets = (props) => {
  const { classes }  = props

  return(
    <Paper style={{width:"90%"}}>
      <List>
        <ListItem>
          <Grid container direction="row" style={{marginRight:"10px"}}>
            <Grid container item xs={1}  justifyContent="center" alignItems="center">
            </Grid>
            <Grid container item xs={3} justifyContent="center" alignItems="center">
            <Typography>Presupuesto</Typography>
            </Grid>
            <Grid container item xs={2} direction="column" justifyContent="center" alignItems="center">
              <Typography>A cargo</Typography>
            </Grid>
            <Grid container item xs={3} direction="column" justifyContent="center" alignItems="center">
              <Typography>Total</Typography>
            </Grid>
            <Grid container item xs={3} direction="column" justifyContent="center" alignItems="center">
              <Typography>Adeudo</Typography>
            </Grid>
          </Grid>
        </ListItem>
        <ListItem button>
          <Grid container direction="row" style={{marginRight:"10px"}}>
            <Grid container item xs={1}  justifyContent="center" alignItems="center">
                <Avatar style={{width:"30px", height: "30px", margin: "10px 10px 5px 5px"}}>
                  <ImageIcon />
                </Avatar>
            </Grid>
            <Grid container item xs={3} justifyContent="center" alignItems="center">
              <Typography>dd/mm/aa</Typography>
            </Grid>
            <Grid container item xs={2} direction="column" justifyContent="center" alignItems="center">
              <Avatar style={{width:"30px", height: "30px", margin: "10px 5px 5px 5px"}}>
                <ImageIcon />
              </Avatar>
            </Grid>
            <Grid container item xs={3} direction="column" justifyContent="center" alignItems="center">
              <Typography style={{color: "green"}}>$ 300,000</Typography>
            </Grid>
            <Grid container item xs={3} direction="column" justifyContent="center" alignItems="center">
              <Typography  style={{color: "red"}}>$ 100,000</Typography>
            </Grid>
          </Grid>
        </ListItem>
        <ListItem button>
          <Grid container direction="row" style={{marginRight:"10px"}}>
            <Grid container item xs={1}  justifyContent="center" alignItems="center">
                <Avatar style={{width:"30px", height: "30px", margin: "10px 10px 5px 5px"}}>
                  <ImageIcon />
                </Avatar>
            </Grid>
            <Grid container item xs={3} justifyContent="center" alignItems="center">
              <Typography>dd/mm/aa</Typography>
            </Grid>
            <Grid container item xs={2} direction="column" justifyContent="center" alignItems="center">
              <Avatar style={{width:"30px", height: "30px", margin: "10px 5px 5px 5px"}}>
                <ImageIcon />
              </Avatar>
            </Grid>
            <Grid container item xs={3} direction="column" justifyContent="center" alignItems="center">
              <Typography style={{color: "green"}}>$ 500,000</Typography>
            </Grid>
            <Grid container item xs={3} direction="column" justifyContent="center" alignItems="center">
              <Typography style={{color: "red"}}>$ 230,000</Typography>
            </Grid>
          </Grid>
        </ListItem>
      </List>
    </Paper>
  )
}

export default withStyles(styles)(ClientsBudgets);