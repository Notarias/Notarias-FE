import React, { PureComponent } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default (props) => {

  const {
    data,
    switchIncome,
    switchTotal,
    switchPaid,
    switchDebt
  } = props;

  return(
    <ResponsiveContainer aspect={4.0/2.0} width='100%'>
      <AreaChart data={data}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <defs>
          { switchTotal && <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#aaaaaa" stopOpacity={1}/>
              <stop offset="95%" stopColor="#141414" stopOpacity={1}/>
            </linearGradient>}
          { switchIncome && <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3f952b" stopOpacity={0.6}/>
              <stop offset="95%" stopColor="#b0ffb2" stopOpacity={0.6}/>
            </linearGradient>}
          { switchPaid && <linearGradient id="colorPaid" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#ffb0b0" stopOpacity={0.6}/>
            <stop offset="95%" stopColor="#ff0000" stopOpacity={0.6}/>
          </linearGradient>}
          { switchDebt && <linearGradient id="colorDebt" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#1727ff" stopOpacity={0.6}/>
            <stop offset="95%" stopColor="#1727ff" stopOpacity={0.6}/>
          </linearGradient>}
        </defs>
        <XAxis dataKey="name" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        { switchTotal && <Area isAnimationActive={false} type="monotone" name='Total a Pagar' dataKey="total" stroke="#141414" fillOpacity={1} fill="url(#colorTotal)" />}
        { switchIncome && <Area isAnimationActive={false} type="monotone" name='Ingresos' dataKey="income" stroke="#3f952b" fillOpacity={1} fill="url(#colorIncome)" /> }
        { switchPaid && <Area isAnimationActive={false} type="monotone" name='Egresos' dataKey="paid" stroke="#ff0000" fillOpacity={1} fill="url(#colorPaid)" />}
        { switchDebt && <Area isAnimationActive={false} type="monotone" name='Saldo' dataKey="debt" stroke="#1727ff" fillOpacity={1} fill="url(#colorDebt)" /> }
      </AreaChart>
    </ResponsiveContainer>
  )
}