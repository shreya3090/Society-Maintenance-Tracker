'use client';
import React from 'react';
import dynamic from 'next/dynamic';

const CategoryBarChart = dynamic(() => import('./CategoryBarChart'), { ssr: false });
const VolumeAreaChart = dynamic(() => import('./VolumeAreaChart'), { ssr: false });

export default function DashboardCharts() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2 gap-4">
      <div
        className="rounded-2xl p-5 card-hover"
        style={{
          background: 'linear-gradient(135deg, rgba(13,20,32,0.95) 0%, rgba(10,16,26,0.9) 100%)',
          border: '1px solid rgba(255,255,255,0.06)',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.03)',
        }}
      >
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="text-base font-700 text-foreground">Complaints by Category</h3>
            <p className="text-xs text-muted-foreground mt-0.5">Last 30 days · All statuses</p>
          </div>
          <span
            className="text-xs text-muted-foreground px-2.5 py-1 rounded-lg font-500"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}
          >
            Jun 2026
          </span>
        </div>
        <CategoryBarChart />
      </div>
      <div
        className="rounded-2xl p-5 card-hover"
        style={{
          background: 'linear-gradient(135deg, rgba(13,20,32,0.95) 0%, rgba(10,16,26,0.9) 100%)',
          border: '1px solid rgba(255,255,255,0.06)',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.03)',
        }}
      >
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="text-base font-700 text-foreground">Complaint Volume — Last 30 Days</h3>
            <p className="text-xs text-muted-foreground mt-0.5">Open vs Resolved daily trend</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <span
                className="w-2 h-2 rounded-full inline-block"
                style={{ background: '#4f8ef7', boxShadow: '0 0 6px rgba(79,142,247,0.5)' }}
              />
              Open
            </span>
            <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <span
                className="w-2 h-2 rounded-full inline-block"
                style={{ background: '#34d399', boxShadow: '0 0 6px rgba(52,211,153,0.5)' }}
              />
              Resolved
            </span>
          </div>
        </div>
        <VolumeAreaChart />
      </div>
    </div>
  );
}
