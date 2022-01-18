import React      from 'react';
import Grid       from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button     from '@material-ui/core/Button';

export default (props) => {
  const { budget } = props

  return(
    <Grid container item xs={12} alignItems='center'>
      <Grid item xs={3}>
        <Typography align='left'>Escritura:</Typography>
      </Grid>
      <Grid item xs={9}>
        <Button fullWidth style={{ padding: '10px' }}>
          <Grid container alignItems="center" justifyContent='flex-start'>
            <Typography noWrap align='left' style={{ paddingRight: "10px", fontWeight: 600 }}>
              {
                (budget && budget.writing_number) || 'Agregar No. de Escritura'
              }
            </Typography>
          </Grid>
        </Button>
      </Grid>
    </Grid>
  )
}
