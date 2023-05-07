import React from 'react'
import { Area, AreaChart, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300
  }
]

export default function RechartGraph() {
  return (
    <ResponsiveContainer>
      <AreaChart data={data}>
        <Line type="monotone" dataKey="uv" stroke="#ff8e4c" />
        {/* <CartesianGrid strokeDasharray="3 3" /> */}
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#ff8e4c" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#ff8e4c" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis style={{ fontSize: '12px' }} />
        <YAxis style={{ fontSize: '12px' }} />
        <Tooltip
          wrapperStyle={{
            outline: '0px solid transparent'
          }}
          contentStyle={{
            border: '0px solid transparent',
            background: 'rgba(255, 255, 255, 0.5)',
            backdropFilter: 'blur(10px)',
            borderRadius: '5px',
            minWidth: '150px',
            padding: '20px'
          }}
        />
        <Area type="monotone" dataKey="uv" stroke="#ff8e4c" fillOpacity={1} fill="url(#colorUv)" />
        <Area type="monotone" dataKey="pv" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
      </AreaChart>
    </ResponsiveContainer>
  )
}
