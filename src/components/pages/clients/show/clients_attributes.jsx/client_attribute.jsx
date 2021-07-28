import React from 'react';
import { withStyles }                       from '@material-ui/core/styles';
import { styles }                           from '../styles';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import { Grid }             from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import Button from '@material-ui/core/Button';

const ClientAttribute = (props) => {
  const {classes , attr} = props
  const [attributeValue, setAttributeValue] = React.useState("")
  const [pristine, setPristine] = React.useState(true)

  const type = (attr.style == "string" ? "Texto" : "Número" )

  const renderInputNumber = () => {
    return(
      <Grid container direction="row" alignItems="flex-end" justifyContent="flex-end">
        <Grid container item xs={8} direction="column">
          <ListItemText>{attr.name}</ListItemText>
          <TextField
            id="outlined-disabled"
            label="Numérico"
            value={attributeValue}
            onChange={ (event)=> {
              const onlyString = event.target.value.toString()
              const onlyNums = onlyString.replace(/[^0-9]/g, '');
              event.target.value = onlyNums
              setAttributeValue(Number(event.target.value))
              setPristine(false)
            }}
            variant="outlined"
            size="small"
          />
        </Grid>
        <Grid container item xs={2} direction="row">
          <Button style={{width:"30px"}} disabled={pristine} onClick={() => {
            setPristine(true) 
            setAttributeValue("") }}>
            <CancelIcon/>
          </Button>
        </Grid>
        <Grid container item xs={2} direction="row">
          <Button color="primary" style={{width:"30px"}} disabled={pristine} onClick={() => {setPristine(true)}}>
            <SaveIcon/>
          </Button>
        </Grid>
      </Grid>
    )
  }

  const renderInputString = () => {
    return(
      <Grid container direction="row" alignItems="flex-end" justifyContent="flex-end">
        <Grid container item xs={8} direction="column">
          <ListItemText>{attr.name}</ListItemText>
          <TextField
            id="outlined-disabled"
            label="Texto"
            value={attributeValue}
            onChange={ (event)=> {
              setAttributeValue(event.target.value)
              setPristine(false)
            }}
            variant="outlined"
            size="small"
          />
        </Grid>
        <Grid container item xs={2} direction="row">
          <Button style={{width:"30px"}} disabled={pristine} onClick={() => {
            setPristine(true) 
            setAttributeValue("") 
          }}
          >
            <CancelIcon/>
          </Button>
        </Grid>
        <Grid container item xs={2} direction="row">
          <Button color="primary" style={{width:"30px"}} disabled={pristine} onClick={() => {setPristine(true)}}>
            <SaveIcon/>
          </Button>
        </Grid>
      </Grid>
    )
  }

  return(
    <>
      {
        attr.style === "string" ? renderInputString() : renderInputNumber()
      }
    </>
  )
}

export default withStyles(styles)(ClientAttribute);