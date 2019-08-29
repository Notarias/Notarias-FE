import React          from 'react';
import Paper          from '@material-ui/core/Paper';
import Breadcrumbs    from '@material-ui/core/Breadcrumbs';
import Link           from '@material-ui/core/Link';
import Typography     from '@material-ui/core/Typography';
import store          from './../../store';

export default (props) => {
  const { styles } = props;
  let breadcrumbsList = store.getState().breadcrumbs.currentBreadcrumbs
  breadcrumbsList = breadcrumbsList.map((item, index) => {
    if (item.path) {
      return(
        <Link href={item.path} >
          {item.name}
        </Link>
      )
    } else {
      return(<Typography color="textPrimary">{item.name}</Typography>)
    }
  })
  return(
    <Paper className={styles.breadcrumbsPaper}>
      <Breadcrumbs aria-label="breadcrumb">
        {breadcrumbsList}
      </Breadcrumbs>
    </Paper>
  )
}