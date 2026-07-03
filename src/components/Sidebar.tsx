'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import AppLogo from '@/components/ui/AppLogo';
import {
  LayoutDashboard,
  ClipboardList,
  Megaphone,
  Settings,
  ChevronLeft,
  ChevronRight,
  Bell,
  LogOut,
  Users,
  AlertTriangle,
} from 'lucide-react';

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  badge?: number;
  group?: string;
}

const navItems: NavItem[] = [
  { label: 'Dashboard', href: '/admin-dashboard', icon: <LayoutDashboard size={18} />, group: 'main' },
  { label: 'Complaints', href: '/admin-dashboard', icon: <ClipboardList size={18} />, badge: 7, group: 'main' },
  { label: 'Overdue', href: '/admin-dashboard', icon: <AlertTriangle size={18} />, badge: 3, group: 'main' },
  { label: 'Notice Board', href: '/notice-board', icon: <Megaphone size={18} />, group: 'community' },
  { label: 'Residents', href: '/admin-dashboard', icon: <Users size={18} />, group: 'community' },
  { label: 'Notifications', href: '/admin-dashboard', icon: <Bell size={18} />, badge: 2, group: 'system' },
  { label: 'Settings', href: '/admin-dashboard', icon: <Settings size={18} />, group: 'system' },
];

const groupLabels: Record<string, string> = {
  main: 'Operations',
  community: 'Community',
  system: 'System',
};

interface SidebarProps {
  activePath?: string;
}

export default function Sidebar({ activePath }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  const groups = ['main', 'community', 'system'];

  return (
    <aside
      className={`relative flex flex-col h-full sidebar-transition flex-shrink-0 ${
        collapsed ? 'w-16' : 'w-60'
      }`}
      style={{
        background: 'linear-gradient(180deg, #0a1020 0%, #080c18 100%)',
        borderRight: '1px solid rgba(255,255,255,0.05)',
      }}
    >
      {/* Top glow accent */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(79,142,247,0.4), transparent)' }}
      />

      {/* Logo */}
      <div
        className={`flex items-center h-16 px-4 flex-shrink-0 ${collapsed ? 'justify-center' : 'gap-3'}`}
        style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}
      >
        <div className="relative flex-shrink-0">
          <div className="absolute inset-0 rounded-lg blur-sm" style={{ background: 'rgba(79,142,247,0.3)' }} />
          <div className="relative"><AppLogo size={30} /></div>
        </div>
        {!collapsed && (
          <div>
            <span className="font-800 text-sm text-white tracking-tight block leading-tight">SocietyDesk</span>
            <span className="text-[10px] font-500 tracking-wide" style={{ color: 'rgba(79,142,247,0.7)' }}>Admin Portal</span>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-5">
        {groups.map((group) => {
          const items = navItems.filter((n) => n.group === group);
          return (
            <div key={`group-${group}`}>
              {!collapsed && (
                <p className="text-[9px] font-700 uppercase tracking-[0.15em] px-3 mb-2" style={{ color: 'rgba(79,142,247,0.5)' }}>
                  {groupLabels[group]}
                </p>
              )}
              {collapsed && (
                <div className="mx-2 mb-2" style={{ height: '1px', background: 'rgba(255,255,255,0.05)' }} />
              )}
              <div className="space-y-0.5">
                {items.map((item) => {
                  const isActive = activePath === item.href;
                  return (
                    <Link
                      key={`nav-${item.label}`}
                      href={item.href}
                      title={collapsed ? item.label : undefined}
                      className={`flex items-center rounded-lg px-2.5 py-2.5 text-sm font-500 sidebar-item group relative ${
                        isActive ? 'sidebar-item-active' : 'text-secondary-foreground hover:text-foreground sidebar-item-hover'
                      } ${collapsed ? 'justify-center' : 'gap-3'}`}
                    >
                      <span className={`flex-shrink-0 transition-colors ${isActive ? 'text-blue-400' : 'text-muted-foreground group-hover:text-blue-400/70'}`}>
                        {item.icon}
                      </span>
                      {!collapsed && <span className="flex-1 truncate">{item.label}</span>}
                      {!collapsed && item.badge !== undefined && (
                        <span
                          className="ml-auto text-[10px] font-700 rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1 tabular-nums"
                          style={{
                            background: isActive ? 'rgba(79,142,247,0.3)' : 'rgba(248,113,113,0.15)',
                            color: isActive ? '#7eb3ff' : '#f87171',
                            border: `1px solid ${isActive ? 'rgba(79,142,247,0.3)' : 'rgba(248,113,113,0.2)'}`,
                          }}
                        >
                          {item.badge}
                        </span>
                      )}
                      {collapsed && item.badge !== undefined && (
                        <span
                          className="absolute top-1 right-1 text-[9px] font-700 rounded-full min-w-[14px] h-[14px] flex items-center justify-center px-0.5 tabular-nums"
                          style={{ background: 'rgba(248,113,113,0.2)', color: '#f87171' }}
                        >
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
      </nav>

      {/* User */}
      <div className="p-3 flex-shrink-0" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        {!collapsed ? (
          <div
            className="flex items-center gap-3 px-2 py-2 rounded-xl"
            style={{ background: 'rgba(79,142,247,0.06)', border: '1px solid rgba(79,142,247,0.1)' }}
          >
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-700 flex-shrink-0"
              style={{ background: 'linear-gradient(135deg, #4f8ef7 0%, #7c3aed 100%)', boxShadow: '0 0 12px rgba(79,142,247,0.4)' }}
            >
              RA
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-600 text-foreground truncate leading-tight">Rajesh Agarwal</p>
              <p className="text-[11px] truncate font-500" style={{ color: 'rgba(79,142,247,0.7)' }}>Administrator</p>
            </div>
            <button
              suppressHydrationWarning
              className="text-muted-foreground hover:text-red-400 transition-colors btn-press p-1.5 rounded-lg hover:bg-red-400/10"
              title="Log out"
            >
              <LogOut size={14} />
            </button>
          </div>
        ) : (
          <div className="flex justify-center">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-700"
              style={{ background: 'linear-gradient(135deg, #4f8ef7 0%, #7c3aed 100%)', boxShadow: '0 0 12px rgba(79,142,247,0.4)' }}
            >
              RA
            </div>
          </div>
        )}
      </div>

      {/* Collapse toggle */}
      <button
        suppressHydrationWarning
        onClick={() => setCollapsed((c) => !c)}
        className="absolute -right-3.5 top-20 w-7 h-7 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground transition-all z-10 btn-press"
        style={{
          background: 'linear-gradient(135deg, #0f1828 0%, #0a1020 100%)',
          border: '1px solid rgba(79,142,247,0.2)',
          boxShadow: '0 2px 8px rgba(0,0,0,0.5)',
        }}
        title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
      </button>
    </aside>
  );
}
