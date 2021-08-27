import React, { useEffect, useState } from 'react'
import Grid                           from '@material-ui/core/Grid';
import Paper                          from '@material-ui/core/Paper';
import { styles }                     from '../styles';
import { withStyles }                 from '@material-ui/core/styles';
import List                           from '@material-ui/core/List';
import ListItem                       from '@material-ui/core/ListItem';
import Divider                        from '@material-ui/core/Divider';
import Typography                     from '@material-ui/core/Typography';
import { useQuery }                   from '@apollo/react-hooks';
import { GET_BUDGETS }                from '../index_queries_and_mutations/queries';
import { Link }                       from 'react-router-dom';
import Avatar                         from '@material-ui/core/Avatar';
import Button                         from '@material-ui/core/Button';
import NumberFormat                   from 'react-number-format';
import PropTypes                      from 'prop-types';
import Chip                           from '@material-ui/core/Chip';

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


const DashboardBudgets = (props) => {
  const { classes } = props
  const [searchLoading, setSearchLoading] = useState(false);
  const [sortField, setSortField]         = useState("serial_number")
  const [sortDirection, setSortDirection] = useState("desc")
  const [timeout, setSetTimeout]          = useState(null)
  const [page, setPage]                   = useState(1)
  const [per, setPer]                     = useState(10)
  const [total_records, setTotalRecords]  = useState(0)

  let variables = {
    page: page,
    per: per,
    sortDirection: sortDirection,
    sortField: sortField,
    searchLoading: searchLoading
  }
  const  { loading, data, fetchMore, ...others} = useQuery(
    GET_BUDGETS, { variables: variables, fetchPolicy: "cache-and-network"  }
  );

  const [budgets, setBudgets] = React.useState([])

  useEffect( () =>{
    data && budgets.length == 0 && setBudgets(data.budgets)
  }, [data])


  let totalCount = data && data.budgetsCount

  return(
    <List className={classes.tabPanelWidth}>
      <ListItem>
        <Grid container item xs={12} direction="row">
          <Grid container item xs={2}  justifyContent="center" alignItems="center">
            <h3>A cargo</h3>
          </Grid>
          <Grid container item xs={2} justifyContent="center" alignItems="center">
            <h3>Estado</h3>
          </Grid>
          <Grid container item xs={2} direction="column" justifyContent="center" alignItems="center">
            <h3>Adeudo</h3>
          </Grid>
          <Grid container item xs={2} direction="column" justifyContent="center" alignItems="center">
            <h3>Capital</h3>
          </Grid>
          <Grid container item xs={2} direction="column" justifyContent="center" alignItems="center">
            <h3>Total</h3>
          </Grid>
          <Grid container item xs={2} direction="column" justifyContent="center" alignItems="center">
            <h3>Pagado</h3>
          </Grid>
        </Grid>
      </ListItem>
      {
        budgets.map((budget) => {
          return(
            <ListItem 
              key={budget.id + "-budget"} 
              button
              component={Link} 
              to={`/budgets/${ budget.id}/edit` }
            >
              <Grid container direction="row" >
                <Grid container item xs={2}  justifyContent="center" alignItems="center">
                  <Avatar 
                    src={(budget.asignee && budget.asignee.avatarThumbUrl) || "/broken-image.jpg"}
                  />
                </Grid>
                <Grid container item xs={2} justifyContent="center" alignItems="center">
                  { 
                    <Chip
                      size="small" label={ budget.completedAt ? "Completado" : "Incompleto" }
                      classes={{colorPrimary: classes.activeGreen}}
                      color={ budget.completedAt ? "primary" : "secondary"} 
                    />
                  }
                </Grid>
                <Grid container item xs={2} direction="column" justifyContent="center" alignItems="center">
                  <Typography>
                    <NumberFormat 
                      value={budget.total / 100} 
                      displayType={'text'} 
                      thousandSeparator={true} 
                      prefix={'$ '}
                      decimalScale={2}
                      className={classes.redColor}
                    />
                  </Typography>
                </Grid>
                <Grid container item xs={2} direction="column" justifyContent="center" alignItems="center">
                  <Typography>
                    <NumberFormat 
                      value={budget.totalCredit / 100} 
                      displayType={'text'} 
                      thousandSeparator={true} 
                      prefix={'$ '}
                      decimalScale={2}
                      className={classes.greenColor}
                    />
                  </Typography>
                </Grid>
                <Grid container item xs={2} direction="column" justifyContent="center" alignItems="center">
                  <Typography>
                    <NumberFormat 
                      value={budget.totalDebt / 100} 
                      displayType={'text'} 
                      thousandSeparator={true} 
                      prefix={'$ '}
                      decimalScale={2}
                      color="red"
                    />
                  </Typography>
                </Grid>
                <Grid container item xs={2} direction="column" justifyContent="center" alignItems="center">
                  <Typography>
                    <NumberFormat 
                      value={budget.totalPaid / 100} 
                      displayType={'text'} 
                      thousandSeparator={true} 
                      prefix={'$ '}
                      decimalScale={2}
                    />
                  </Typography>
                </Grid>
              </Grid>
            </ListItem>
          )
        })
      }
      {
        (loading ? (
            "Cargando"
          ) : (
            <Button
              onClick={async () => {
                let newPage = Number(page) + 1
                await fetchMore(
                  {
                  updateQuery: (previousResult, { fetchMoreResult }) => {
                    setBudgets([...budgets, ...fetchMoreResult.budgets])
                    setPage(newPage)
                    return Object.assign( {}, previousResult,  {
                      budgets: [...previousResult.budgets, ...fetchMoreResult.budgets]
                    })
                  },
                  variables: {
                    page: newPage,
                  }
                });
              }}
            >
              Mostrar más
            </Button>
          )
        )
      }
    </List>
  )
}

export default withStyles(styles)(DashboardBudgets);
