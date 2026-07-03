import React from 'react';
import {
  AlertTriangle,
  ClipboardList,
  Clock,
  CheckCircle2,
  TrendingUp,
  Layers,
} from 'lucide-react';

export default function MetricsBentoGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
      {/* Hero — Overdue (spans 2 cols) */}
      <div
        className="col-span-1 md:col-span-2 lg:col-span-2 xl:col-span-2 2xl:col-span-2 rounded-2xl p-5 card-hover flex flex-col justify-between gap-4 relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, rgba(42,15,15,0.95) 0%, rgba(30,10,10,0.9) 100%)',
          border: '1px solid rgba(248,113,113,0.2)',
          boxShadow: '0 0 0 1px rgba(248,113,113,0.1), 0 8px 32px rgba(248,113,113,0.08)',
        }}
      >
        {/* Background glow */}
        <div
          className="absolute top-0 right-0 w-48 h-48 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(248,113,113,0.12) 0%, transparent 70%)', transform: 'translate(30%, -30%)' }}
        />
        <div className="flex items-start justify-between relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span
                className="text-[10px] font-700 uppercase tracking-widest px-2 py-0.5 rounded-full"
                style={{ background: 'rgba(248,113,113,0.15)', color: '#f87171', border: '1px solid rgba(248,113,113,0.2)' }}
              >
                ⚠ Overdue
              </span>
            </div>
            <p className="text-5xl font-800 tabular-nums" style={{ color: '#f87171', textShadow: '0 0 24px rgba(248,113,113,0.4)' }}>7</p>
            <p className="text-sm mt-1.5" style={{ color: 'rgba(248,113,113,0.6)' }}>3 critical · 4 moderate</p>
          </div>
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
            style={{
              background: 'rgba(248,113,113,0.12)',
              border: '1px solid rgba(248,113,113,0.2)',
              color: '#f87171',
            }}
          >
            <AlertTriangle size={26} />
          </div>
        </div>
        <div className="flex items-center justify-between relative z-10">
          <div className="flex gap-4">
            {[
              { val: '3', label: 'High Priority' },
              { val: '4', label: 'Medium Priority' },
              { val: '12d', label: 'Max Days Open' },
            ]?.map((item, i) => (
              <React.Fragment key={item?.label}>
                {i > 0 && <div className="w-px" style={{ background: 'rgba(248,113,113,0.2)' }} />}
                <div className="text-center">
                  <p className="text-lg font-700 tabular-nums" style={{ color: '#f87171' }}>{item?.val}</p>
                  <p className="text-[10px] font-500" style={{ color: 'rgba(248,113,113,0.5)' }}>{item?.label}</p>
                </div>
              </React.Fragment>
            ))}
          </div>
          <span
            className="text-xs font-600 px-2.5 py-1 rounded-lg"
            style={{ background: 'rgba(248,113,113,0.12)', color: '#f87171', border: '1px solid rgba(248,113,113,0.2)' }}
          >
            +2 since yesterday
          </span>
        </div>
      </div>
      {/* Open */}
      <div
        className="rounded-2xl p-5 card-hover flex flex-col justify-between gap-3 relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, rgba(13,20,32,0.95) 0%, rgba(10,16,26,0.9) 100%)',
          border: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <div
          className="absolute top-0 right-0 w-32 h-32 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(79,142,247,0.08) 0%, transparent 70%)', transform: 'translate(30%, -30%)' }}
        />
        <div className="flex items-start justify-between relative z-10">
          <div>
            <p className="text-[10px] font-600 uppercase tracking-widest mb-2" style={{ color: 'rgba(79,142,247,0.6)' }}>Open</p>
            <p className="text-4xl font-800 text-foreground tabular-nums num-glow">14</p>
          </div>
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: 'rgba(79,142,247,0.1)', border: '1px solid rgba(79,142,247,0.2)', color: '#4f8ef7' }}
          >
            <ClipboardList size={20} />
          </div>
        </div>
        <div className="relative z-10">
          <p className="text-xs text-muted-foreground">Awaiting assignment</p>
          <span className="text-[11px] font-600 mt-0.5 block" style={{ color: '#f87171' }}>+3 today</span>
        </div>
      </div>
      {/* In Progress */}
      <div
        className="rounded-2xl p-5 card-hover flex flex-col justify-between gap-3 relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, rgba(13,20,32,0.95) 0%, rgba(10,16,26,0.9) 100%)',
          border: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <div
          className="absolute top-0 right-0 w-32 h-32 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(251,191,36,0.07) 0%, transparent 70%)', transform: 'translate(30%, -30%)' }}
        />
        <div className="flex items-start justify-between relative z-10">
          <div>
            <p className="text-[10px] font-600 uppercase tracking-widest mb-2" style={{ color: 'rgba(251,191,36,0.6)' }}>In Progress</p>
            <p className="text-4xl font-800 text-foreground tabular-nums">9</p>
          </div>
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: 'rgba(251,191,36,0.1)', border: '1px solid rgba(251,191,36,0.2)', color: '#fbbf24' }}
          >
            <Clock size={20} />
          </div>
        </div>
        <div className="relative z-10">
          <p className="text-xs text-muted-foreground">Actively being worked</p>
          <span className="text-[11px] font-600 mt-0.5 block" style={{ color: '#34d399' }}>Stable</span>
        </div>
      </div>
      {/* Resolved Today */}
      <div
        className="rounded-2xl p-5 card-hover flex flex-col justify-between gap-3 relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, rgba(13,20,32,0.95) 0%, rgba(10,16,26,0.9) 100%)',
          border: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <div
          className="absolute top-0 right-0 w-32 h-32 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(52,211,153,0.07) 0%, transparent 70%)', transform: 'translate(30%, -30%)' }}
        />
        <div className="flex items-start justify-between relative z-10">
          <div>
            <p className="text-[10px] font-600 uppercase tracking-widest mb-2" style={{ color: 'rgba(52,211,153,0.6)' }}>Resolved Today</p>
            <p className="text-4xl font-800 text-foreground tabular-nums">5</p>
          </div>
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: 'rgba(52,211,153,0.1)', border: '1px solid rgba(52,211,153,0.2)', color: '#34d399' }}
          >
            <CheckCircle2 size={20} />
          </div>
        </div>
        <div className="relative z-10">
          <p className="text-xs text-muted-foreground mb-1.5">Out of 11 daily target</p>
          <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(52,211,153,0.1)' }}>
            <div
              className="h-full rounded-full"
              style={{ width: '45%', background: 'linear-gradient(90deg, #34d399, #10b981)' }}
            />
          </div>
        </div>
      </div>
      {/* Total */}
      <div
        className="rounded-2xl p-5 card-hover flex flex-col justify-between gap-3 relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, rgba(13,20,32,0.95) 0%, rgba(10,16,26,0.9) 100%)',
          border: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[10px] font-600 uppercase tracking-widest mb-2" style={{ color: 'rgba(148,163,184,0.5)' }}>Total (30 days)</p>
            <p className="text-4xl font-800 text-foreground tabular-nums">142</p>
          </div>
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: 'rgba(148,163,184,0.08)', border: '1px solid rgba(148,163,184,0.15)', color: '#94a3b8' }}
          >
            <Layers size={20} />
          </div>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">vs last month</p>
          <span className="text-[11px] font-600 mt-0.5 block" style={{ color: '#f87171' }}>+18 complaints</span>
        </div>
      </div>
      {/* Avg Resolution — spans 2 cols */}
      <div
        className="col-span-1 md:col-span-2 lg:col-span-2 xl:col-span-2 2xl:col-span-2 rounded-2xl p-5 card-hover flex flex-col justify-between gap-3 relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, rgba(42,30,6,0.8) 0%, rgba(26,18,4,0.9) 100%)',
          border: '1px solid rgba(251,191,36,0.15)',
          boxShadow: '0 0 0 1px rgba(251,191,36,0.08), 0 8px 32px rgba(251,191,36,0.05)',
        }}
      >
        <div
          className="absolute top-0 right-0 w-48 h-48 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(251,191,36,0.1) 0%, transparent 70%)', transform: 'translate(30%, -30%)' }}
        />
        <div className="flex items-start justify-between relative z-10">
          <div>
            <p className="text-[10px] font-600 uppercase tracking-widest mb-2" style={{ color: 'rgba(251,191,36,0.6)' }}>Avg Resolution Time</p>
            <div className="flex items-end gap-2">
              <p className="text-4xl font-800 text-foreground tabular-nums">4.2</p>
              <span className="text-lg font-600 text-muted-foreground mb-0.5">days</span>
            </div>
          </div>
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: 'rgba(251,191,36,0.1)', border: '1px solid rgba(251,191,36,0.2)', color: '#fbbf24' }}
          >
            <TrendingUp size={20} />
          </div>
        </div>
        <div className="flex items-center gap-4 relative z-10">
          <div className="flex-1">
            <div className="flex justify-between text-[11px] text-muted-foreground mb-1.5">
              <span>Current: 4.2d</span>
              <span>Target: 3d</span>
            </div>
            <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgba(251,191,36,0.1)' }}>
              <div
                className="h-full rounded-full"
                style={{ width: '70%', background: 'linear-gradient(90deg, #fbbf24, #f59e0b)' }}
              />
            </div>
          </div>
          <span
            className="text-xs font-600 px-2.5 py-1 rounded-lg flex-shrink-0"
            style={{ background: 'rgba(251,191,36,0.1)', color: '#fbbf24', border: '1px solid rgba(251,191,36,0.2)' }}
          >
            1.2d above target
          </span>
        </div>
      </div>
    </div>
  );
}
