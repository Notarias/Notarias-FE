import React          from 'react';
import Paper          from '@material-ui/core/Paper';
import Breadcrumbs    from '@material-ui/core/Breadcrumbs';
import Link           from '@material-ui/core/Link';
import Typography     from '@material-ui/core/Typography';
import withStyles     from '@material-ui/core/styles/withStyles';

const styles = theme => {
  return({
    breadcrumbsContainer: {
      flexWrap: 'wrap',
    },
    breadcrumbsPaper: {
      padding: theme.spacing(1, 2),
      borderRadius: '0',
      height: "6%",
    },
  })
};

export default withStyles(styles)((props) => {
  const { classes, breadcrumbs } = props;
  let breadcrumbsHtml = breadcrumbs.map((item, index) => {
    if (item.path) {
      return(
        <Link key={item.name} href={item.path} >
          {item.name}
        </Link>
      )
    } else {
      return(<Typography key={item.name} color="textPrimary">{item.name}</Typography>)
    }
  })
  return(
    <Paper className={classes.breadcrumbsPaper} >
      <Breadcrumbs aria-label="breadcrumb">
        {breadcrumbsHtml}
      </Breadcrumbs>
    </Paper>
  )
})
