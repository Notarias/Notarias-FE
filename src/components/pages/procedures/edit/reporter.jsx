import React, { useState, useEffect } from 'react';
import Typography                     from '@material-ui/core/Typography';
import Grid                           from '@material-ui/core/Grid';
import Avatar                         from '@material-ui/core/Avatar';
import Button                         from '@material-ui/core/Button';

export default (props) => {

  const { reporterData } = props

  const [reporter, setReporter] = useState(reporterData)

  useEffect(() => {
    setReporter(reporterData)
  }, [!!reporterData])

  return(
    <Grid container direction="row">
      <Button fullWidth style={{ padding: '10px' }}>
        <Grid container alignItems="center" justifyContent='flex-start'>
          <Grid item xs={3} md={2} lg={1}>
            <Avatar
              src={reporter ? reporter.avatarThumbUrl : "/broken-image.jpg" }
              size="small"
            />
          </Grid> 
          <Grid item xs={9} md={10} lg={11}>
            <Typography noWrap align='left' style={{ paddingLeft: "10px", paddingRight: "10px" }}>
              <strong>{reporter && reporter.firstName} {reporter && reporter.lastName}</strong>
            </Typography>
          </Grid>
        </Grid>
      </Button>
    </Grid>
  )
}