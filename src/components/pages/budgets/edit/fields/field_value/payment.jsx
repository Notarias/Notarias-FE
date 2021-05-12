import React, { useState }                  from 'react'
import ListItemText                         from '@material-ui/core/ListItemText';
import Dialog                               from '@material-ui/core/Dialog';
import DialogActions                        from '@material-ui/core/DialogActions';
import DialogContent                        from '@material-ui/core/DialogContent';
import DialogTitle                          from '@material-ui/core/DialogTitle';
import NumberFormat                         from 'react-number-format';
import PropTypes                            from 'prop-types';
import InputAdornment                       from '@material-ui/core/InputAdornment';
import Grid                                 from '@material-ui/core/Grid';
import TextField                            from '@material-ui/core/TextField';
import Button                               from '@material-ui/core/Button';
import Avatar                               from '@material-ui/core/Avatar';
import { Query }                            from '@apollo/react-components';
import { GET_CURRENT_USER }                 from '../../../../../../resolvers/queries';
import Typography                           from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';

function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
 
            value: values.value,
          },
        });
      }}
      thousandSeparator
      isNumericString
      decimalSeparator="."
      decimalScale={2}
      fixedDecimalScale

    />
  );
}

NumberFormatCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,

  onChange: PropTypes.func.isRequired,
};

const Payment = (props) => {
  const { initialFieldValue, totalDebt } = props


  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return(
    <>
      <ListItemText primary="Pagar" onClick={handleClickOpen}/>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>
          Agregar Pago
        </DialogTitle>
        <DialogContent>
          <Grid container >
            <Grid container item xs={6} alignItems="center" justify="center">
              <Typography variant="button" display="block" gutterBottom>
                Total a pagar  
              </Typography>
              <Typography variant="h6" gutterBottom>
                <NumberFormat 
                  value={totalDebt} 
                  displayType={'text'} 
                  thousandSeparator={true} 
                  prefix={'$ '}
                  decimalScale={2}
                />
              </Typography>
              {/* <TextField
                key={"payment"}
                value={initialFieldValue}
                label="Total"
                id="total"

                margin="none"
                InputProps={{
                  inputComponent: NumberFormatCustom,
                  startAdornment: <InputAdornment position="start">$</InputAdornment>
                }}
              /> */}
              {/* <InputBase
                value={initialFieldValue}
                label="Total"
                inputProps={{ 
                  inputComponent: NumberFormatCustom,
                  startAdornment: <InputAdornment position="start">$</InputAdornment>
              }}
              /> */}
              {/* <Typography>
                $ {initialFieldValue}
              </Typography> */}
            </Grid>
              <Grid  container item xs={6} alignItems="center" justify="center">
                <TextField
                  key={"payment"}
                  label="Abono"
                  autoFocus
                  id="margin-normal"
                  helperText="Cantidad"
                  margin="normal"
                  InputProps={{
                    inputComponent: NumberFormatCustom,
                    startAdornment: <InputAdornment position="start">$</InputAdornment>
                  }}
                />
              </Grid>
            </Grid>
            <Grid container >
              <Query
                query={GET_CURRENT_USER}
              >
                {({id, loading, error, data}) => {
                    return(
                      <Grid container direction="column" alignItems="flex-start">
                        <Avatar 
                          src={data && data.currentUser && data.currentUser.avatarThumbUrl} 
                          // className={classes.avatarInDialogToAddPayment}
                        />
                        <Typography variant="caption">{data.currentUser.firstName}</Typography>
                      </Grid>
                    )
                  }
                }
              </Query>
            </Grid>
          <Grid>
            <TextField
              fullWidth
              // onChange={handleNotePaymentChange}
              id="outlined-textarea"
              placeholder="Comentarios"
              multiline
              variant="outlined"
            />
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>
            Cancelar
          </Button>
          <Button>
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default Payment;