import React          from 'react'
import { withStyles } from '@material-ui/core/styles';
import { styles }     from '../styles';
import { Grid }       from '@material-ui/core';
import Avatar         from '@material-ui/core/Avatar';
import ImageIcon      from '@material-ui/icons/Image';
import Typography     from '@material-ui/core/Typography';

const ClientBudget = (props) => {
  const { classes, match, budget }  = props


  const getCurrentDate = (separator='/') => {
                    
    let newDate = new Date(Date.parse(budget.createdAt))
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();

    return (`${year}${separator}${month<10?`0${month}`:`${month}`}${separator}${date}`)
    }

  return(
    <>
      <Grid container direction="row" style={{marginRight:"10px"}}>
        <Grid container item xs={1}  justifyContent="center" alignItems="center">
          <Avatar style={{width:"30px", height: "30px", margin: "10px 10px 5px 5px"}}>
            <ImageIcon />
          </Avatar>
        </Grid>
        <Grid container item xs={3} justifyContent="center" alignItems="center">
          <Typography>{getCurrentDate()}</Typography>
        </Grid>
        <Grid container item xs={2} direction="column" justifyContent="center" alignItems="center">
          <Avatar 
            style={{width:"30px", height: "30px", margin: "10px 5px 5px 5px"}}
            src={(budget.asignee && budget.asignee.avatarThumbUrl) || "/broken-image.jpg"}
          />
        </Grid>
        <Grid container item xs={3} direction="column" justifyContent="center" alignItems="center">
          <Typography style={{color: "green"}}>$ {budget.total / 100}</Typography>
        </Grid>
        <Grid container item xs={3} direction="column" justifyContent="center" alignItems="center">
          <Typography style={{color: "red"}}>$ {budget.totalDebt / 100}</Typography>
        </Grid>
      </Grid>
    </>
  )
}

export default withStyles(styles)(ClientBudget);
