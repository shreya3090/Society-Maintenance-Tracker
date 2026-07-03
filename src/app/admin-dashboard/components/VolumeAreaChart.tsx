'use client';
import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const data = [
  { date: '02 Jun', open: 8, resolved: 5 },
  { date: '04 Jun', open: 12, resolved: 7 },
  { date: '06 Jun', open: 10, resolved: 9 },
  { date: '08 Jun', open: 15, resolved: 6 },
  { date: '10 Jun', open: 11, resolved: 11 },
  { date: '12 Jun', open: 9, resolved: 13 },
  { date: '14 Jun', open: 14, resolved: 8 },
  { date: '16 Jun', open: 18, resolved: 10 },
  { date: '18 Jun', open: 13, resolved: 12 },
  { date: '20 Jun', open: 16, resolved: 9 },
  { date: '22 Jun', open: 20, resolved: 7 },
  { date: '24 Jun', open: 17, resolved: 11 },
  { date: '26 Jun', open: 14, resolved: 14 },
  { date: '28 Jun', open: 19, resolved: 8 },
  { date: '30 Jun', open: 14, resolved: 5 },
];

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: { value: number; name: string }[]; label?: string }) {
  if (!active || !payload || !payload.length) return null;
  return (
    <div className="bg-card border border-border rounded-lg px-3 py-2 shadow-md">
      <p className="text-xs font-600 text-muted-foreground mb-1">{label}</p>
      {payload.map((p) => (
        <p key={`tip-${p.name}`} className="text-xs font-700 tabular-nums" style={{ color: p.name === 'open' ? '#3b82f6' : '#10b981' }}>
          {p.name === 'open' ? 'Open' : 'Resolved'}: {p.value}
        </p>
      ))}
    </div>
  );
}

export default function VolumeAreaChart() {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <AreaChart data={data} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
        <defs>
          <linearGradient id="gradOpen" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.25} />
            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.02} />
          </linearGradient>
          <linearGradient id="gradResolved" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#10b981" stopOpacity={0.25} />
            <stop offset="95%" stopColor="#10b981" stopOpacity={0.02} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
        <XAxis
          dataKey="date"
          tick={{ fontSize: 10, fill: 'var(--muted-foreground)', fontFamily: 'var(--font-sans)' }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tick={{ fontSize: 10, fill: 'var(--muted-foreground)', fontFamily: 'var(--font-sans)' }}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip content={<CustomTooltip />} />
        <Area type="monotone" dataKey="open" stroke="#3b82f6" strokeWidth={2} fill="url(#gradOpen)" />
        <Area type="monotone" dataKey="resolved" stroke="#10b981" strokeWidth={2} fill="url(#gradResolved)" />
      </AreaChart>
    </ResponsiveContainer>
  );
}
