import React from 'react';
import { useQuery }                 from '@apollo/client';
import { STATISTICS_QUERY }         from '../queries/queries';
import CircularProgress             from '@material-ui/core/CircularProgress';
import Typography                   from '@material-ui/core/Typography';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LabelList } from 'recharts';


const moneyFormatter = new Intl.NumberFormat('es-MX', {
  style: 'currency',
  currency: 'MXN',
});


const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{ backgroundColor: 'white', padding: '10px' }}>
        {
          payload.map((payload_item) => {
            return(
              <p key={`${payload_item.dataKey}`} style={{ color: payload_item.color }}>{`${payload_item.name} : ${moneyFormatter.format(payload_item.value)}`}</p>
            )
          })
        }
      </div>
    );
  }

  return null;
};


export default (props) => {

  const {
    switchIncome,
    switchTotal,
    switchPaid,
    switchDebt,
    initDate,
    endDate,
    timeFrame,
    graphStatus
  } = props;

  const { data, loading, refetch } = useQuery(
    STATISTICS_QUERY,
    {
      variables: {
        startDate: initDate,
        endDate: endDate,
        timeFrame: timeFrame,
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        status: graphStatus
      },
      fetchPolicy: 'network-only'
    }
  )

  return(
    <>
      { loading && <CircularProgress/> }
      { !loading && !data && <Typography>Sin datos</Typography> }
      {
        data &&
          <ResponsiveContainer aspect={4.0/2.0} width='100%'>
            <BarChart data={data.statistics} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip content={<CustomTooltip />}/>
              <Legend />
              <LabelList dataKey="name" position="top" />
              { switchTotal && <Bar isAnimationActive={false} type="monotone" name='Total a Pagar' dataKey="total" fill="#141414" fillOpacity={1}  />}
              { switchIncome && <Bar isAnimationActive={false} type="monotone" name='Ingresos' dataKey="income" fill="#3f952b" fillOpacity={1}  /> }
              { switchPaid && <Bar isAnimationActive={false} type="monotone" name='Egresos' dataKey="paid" fill="#ff0000" fillOpacity={1}  />}
              { switchDebt && <Bar isAnimationActive={false} type="monotone" name='Saldo' dataKey="debt" fill="#1727ff" fillOpacity={1}  /> }
            </BarChart>
          </ResponsiveContainer>
      }
    </>
  )
}