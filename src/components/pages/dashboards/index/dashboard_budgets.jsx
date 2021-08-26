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


const DashboardBudgets = (props) => {
  const { classes } = props
  const [searchLoading, setSearchLoading] = useState(false);
  const [sortField, setSortField]         = useState("serial_number")
  const [sortDirection, setSortDirection] = useState("desc")
  const [timeout, setSetTimeout]          = useState(null)
  const [page, setPage]                   = useState(0)
  const [per, setPer]                     = useState(10)
  const [total_records, setTotalRecords]  = useState(0)

  let variables = {
    page: page,
    per: per,
    sortDirection: sortDirection,
    sortField: sortField,
    searchLoading: searchLoading
  }

  const { loading, data, refetch } = useQuery(
    GET_BUDGETS, { variables: variables, fetchPolicy: "no-cache" }
  );

  const [budgets, setBudgets] = React.useState([])

  useEffect( () =>{
    data && setBudgets(data.budgets)
  }, [data])

// const query = client.watchQuery({
//   query: gql`
//     query Posts($cursor: String) {
//       feed {
//         nextCursor
//         entries(cursor: $cursor) {
//           id
//           title
//           content
//           author {
//             name
//           }
//         }
//       }
//     }
//   `,
//   // first fetch, no cursor provided
//   variables: { cursor: null },
// });


  console.log(budgets, "budg")
  return(
    <List fullWidth>
      <ListItem>
        <Grid container item xs={12} direction="row">
          <Grid container item xs={2}  justifyContent="center" alignItems="center">
            <Typography>A cargo</Typography>
          </Grid>
          <Grid container item xs={2} justifyContent="center" alignItems="center">
          <Typography>Presupuesto</Typography>
          </Grid>
          <Grid container item xs={2} direction="column" justifyContent="center" alignItems="center">
            <Typography>Adeudo</Typography>
          </Grid>
          <Grid container item xs={2} direction="column" justifyContent="center" alignItems="center">
            <Typography>Capital</Typography>
          </Grid>
          <Grid container item xs={2} direction="column" justifyContent="center" alignItems="center">
            <Typography>Total</Typography>
          </Grid>
          <Grid container item xs={2} direction="column" justifyContent="center" alignItems="center">
            <Typography>Distribuido</Typography>
          </Grid>
        </Grid>
      </ListItem>
      {       
        budgets.map((budget) => {
          const getCurrentDate = (separator='/') => {
            let newDate = new Date(Date.parse(budget.createdAt))
            let date = newDate.getDate();
            let month = newDate.getMonth() + 1;
            let year = newDate.getFullYear();
            return (`${year}${separator}${month<10?`0${month}`:`${month}`}${separator}${date}`)
          }
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
                    src={(budget.asignee.firstName && budget.asignee.avatarThumbUrl) || "/broken-image.jpg"}
                  />
                </Grid>
                <Grid container item xs={2} justifyContent="center" alignItems="center">
                  <Typography>Incompleto</Typography>
                </Grid>
                <Grid container item xs={2} direction="column" justifyContent="center" alignItems="center">
                <Typography>$ {budget.total / 100}</Typography>
                </Grid>
                <Grid container item xs={2} direction="column" justifyContent="center" alignItems="center">
                  <Typography>$ {budget.totalCredit / 100}</Typography>
                </Grid>
                <Grid container item xs={2} direction="column" justifyContent="center" alignItems="center">
                  <Typography>$ {budget.totalDebt / 100}</Typography>
                </Grid>
                <Grid container item xs={2} direction="column" justifyContent="center" alignItems="center">
                  <Typography>$ {budget.totalPaid / 100}</Typography>
                </Grid>
              </Grid>
            </ListItem>
          )
        })
      }
    </List>
  )
}

export default withStyles(styles)(DashboardBudgets);
