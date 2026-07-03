'use client';
import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';

const data = [
  { category: 'Plumbing', count: 34, color: '#3b82f6' },
  { category: 'Electrical', count: 28, color: '#f59e0b' },
  { category: 'Lift', count: 19, color: '#8b5cf6' },
  { category: 'Housekeeping', count: 22, color: '#10b981' },
  { category: 'Security', count: 15, color: '#ef4444' },
  { category: 'Parking', count: 12, color: '#6366f1' },
  { category: 'Intercom', count: 8, color: '#64748b' },
  { category: 'Other', count: 4, color: '#94a3b8' },
];

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: { value: number }[]; label?: string }) {
  if (!active || !payload || !payload.length) return null;
  return (
    <div className="bg-card border border-border rounded-lg px-3 py-2 shadow-md">
      <p className="text-xs font-600 text-foreground">{label}</p>
      <p className="text-sm font-700 text-primary tabular-nums">{payload[0].value} complaints</p>
    </div>
  );
}

export default function CategoryBarChart() {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={data} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
        <XAxis
          dataKey="category"
          tick={{ fontSize: 11, fill: 'var(--muted-foreground)', fontFamily: 'var(--font-sans)' }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tick={{ fontSize: 11, fill: 'var(--muted-foreground)', fontFamily: 'var(--font-sans)' }}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'var(--muted)', opacity: 0.5 }} />
        <Bar dataKey="count" radius={[4, 4, 0, 0]}>
          {data.map((entry) => (
            <Cell key={`cell-cat-${entry.category}`} fill={entry.color} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
