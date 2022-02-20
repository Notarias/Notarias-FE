import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  {
    "name": "2022-01-04",
    "Ingresos": 4000,
    "Egresos": 2400,
    "CargosTotales": 2400,
    "PorSaldar": 3000
  },
  {
    "name": "2022-01-05",
    "Ingresos": 2000,
    "Egresos": 2300,
    "CargosTotales": 2400,
    "PorSaldar": 3000
  },
  {
    "name": "2022-01-06",
    "Ingresos": 3000,
    "Egresos": 2400,
    "Cargos Totales": 2400,
    "PorSaldar": 3000
  },
  {
    "name": "2022-01-07",
    "Ingresos": 4000,
    "Egresos": 2400,
    "Cargos Totales": 2400,
    "PorSaldar": 3000
  },
  {
    "name": "2022-01-08",
    "Ingresos": 4000,
    "Egresos": 2400,
    "CargosTotales": 2400,
    "PorSaldar": 3000
  },
]

export default (props) => {

  return(
    <ResponsiveContainer height={400} width='100%'>
      <AreaChart 
        data={data}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="colorIngresos" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
          </linearGradient>
          <linearGradient id="colorEgresos" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
          </linearGradient>
          <linearGradient id="colorCargosTotales" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
          </linearGradient>
          <linearGradient id="colorPorSaldar" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <XAxis dataKey="name" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Area type="monotone" dataKey="Ingresos" stroke="#8884d8" fillOpacity={1} fill="url(#colorIngresos)" />
        <Area type="monotone" dataKey="Egresos" stroke="#82ca9d" fillOpacity={1} fill="url(#colorEgresos)" />
      </AreaChart>
    </ResponsiveContainer>
  )
}