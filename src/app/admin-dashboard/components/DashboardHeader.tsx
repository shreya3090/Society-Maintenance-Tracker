'use client';
import React from 'react';
import { Settings, Download, RefreshCw } from 'lucide-react';

export default function DashboardHeader() {
  return (
    <div className="flex items-start justify-between gap-4 flex-wrap">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <div
            className="w-1.5 h-6 rounded-full"
            style={{ background: 'linear-gradient(180deg, #4f8ef7 0%, #7c3aed 100%)' }}
          />
          <h1 className="text-2xl font-800 text-foreground tracking-tight">Admin Dashboard</h1>
        </div>
        <p className="text-sm text-muted-foreground mt-0.5 ml-3.5">
          Greenwood Apartments
          <span className="mx-2 opacity-40">·</span>
          <span className="text-blue-400/70">Last updated: 01 Jul 2026, 1:51 PM</span>
        </p>
      </div>
      <div className="flex items-center gap-2 flex-shrink-0">
        <button className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-600 text-secondary-foreground hover:text-foreground transition-all btn-press header-btn-ghost">
          <RefreshCw size={14} />
          Refresh
        </button>
        <button className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-600 text-secondary-foreground hover:text-foreground transition-all btn-press header-btn-ghost">
          <Download size={14} />
          Export
        </button>
        <button
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-600 text-white transition-all btn-press btn-primary-glow"
          style={{
            background: 'linear-gradient(135deg, #4f8ef7 0%, #3b6fd4 100%)',
            boxShadow: '0 2px 12px rgba(79,142,247,0.3)',
          }}
        >
          <Settings size={14} />
          Configure
        </button>
      </div>
    </div>
  );
}
