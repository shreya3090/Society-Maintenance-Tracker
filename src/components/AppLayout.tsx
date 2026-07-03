import React from 'react';
import Sidebar from './Sidebar';

interface AppLayoutProps {
  children: React.ReactNode;
  activePath?: string;
}

export default function AppLayout({ children, activePath }: AppLayoutProps) {
  return (
    <div className="flex h-screen bg-background overflow-hidden relative">
      {/* Background effects */}
      <div className="pointer-events-none absolute inset-0 bg-grid-pattern opacity-60" />
      <div
        className="bg-glow-blue orb-float"
        style={{ width: 600, height: 600, top: '-10%', right: '10%', opacity: 0.6 }}
      />
      <div
        className="bg-glow-purple orb-float-delayed"
        style={{ width: 500, height: 500, bottom: '-5%', left: '15%', opacity: 0.7 }}
      />
      <div
        className="bg-glow-cyan"
        style={{ width: 300, height: 300, top: '40%', right: '30%', opacity: 0.5 }}
      />
      {/* Content */}
      <Sidebar activePath={activePath} />
      <main className="flex-1 overflow-y-auto min-w-0 relative z-10">
        {children}
      </main>
    </div>
  );
}
