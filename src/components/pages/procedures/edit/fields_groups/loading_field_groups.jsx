import React, { useState }                  from 'react'
import Grid                                 from '@material-ui/core/Grid';
import Skeleton                             from '@material-ui/lab/Skeleton';
import Card                                 from '@material-ui/core/Card';
import CardHeader                           from '@material-ui/core/CardHeader';
import CardContent                          from '@material-ui/core/CardContent';

const LoadingFieldGroups = () => {

  const [array] = useState([1,2,3,4]);

  return(
    <Grid container item direction='row' >
      <Grid item xs={12}>
        <Card  variant='outlined' >
          <CardHeader
            title={
              <Skeleton variant='rect' width='40%' height={40}/>
            }

            action={
              <Skeleton variant='circle' width={40} height={40} />
            }
          />
          <CardContent>
            <Grid container item justifyContent='flex-start'>
            {
              array.map((index) => {
                return(
                  <Grid key={`${index}-loadindFieldGroup`} container direction='row' justifyContent='center' style={{marginTop: '10px'}}>
                    <Grid container item xs={10} justifyContent='flex-start' alignItems='center'>
                      <Grid item xs>
                        <Skeleton variant='rect' width='100%' height={40}/>
                      </Grid>
                    </Grid>
                    <Grid container item xs justifyContent='center'>
                      <Grid item>
                        <Skeleton variant='circle' width={40} height={40} />
                      </Grid>
                    </Grid>
                    <Grid container item xs justifyContent='center'>
                      <Grid item>
                        <Skeleton variant='circle' width={40} height={40} />
                      </Grid>
                    </Grid>
                  </Grid>
                )
              })
            }
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default LoadingFieldGroups;
