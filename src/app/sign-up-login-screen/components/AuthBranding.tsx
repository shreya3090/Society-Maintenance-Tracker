import React from 'react';
import AppLogo from '@/components/ui/AppLogo';
import { Shield, Clock, Bell, CheckCircle2 } from 'lucide-react';

const features = [
  {
    id: 'feature-complaints',
    icon: <CheckCircle2 size={16} />,
    title: 'Complaint Tracking',
    desc: 'Raise and track maintenance issues with full status history',
    color: 'rgba(52,211,153,0.8)',
    bg: 'rgba(52,211,153,0.08)',
    border: 'rgba(52,211,153,0.15)',
  },
  {
    id: 'feature-overdue',
    icon: <Clock size={16} />,
    title: 'Overdue Alerts',
    desc: 'Automatic detection of complaints past resolution threshold',
    color: 'rgba(251,191,36,0.8)',
    bg: 'rgba(251,191,36,0.08)',
    border: 'rgba(251,191,36,0.15)',
  },
  {
    id: 'feature-notices',
    icon: <Bell size={16} />,
    title: 'Notice Board',
    desc: 'Stay updated with society announcements and important notices',
    color: 'rgba(79,142,247,0.8)',
    bg: 'rgba(79,142,247,0.08)',
    border: 'rgba(79,142,247,0.15)',
  },
  {
    id: 'feature-secure',
    icon: <Shield size={16} />,
    title: 'Role-Based Access',
    desc: 'Separate portals for residents and society administrators',
    color: 'rgba(167,139,250,0.8)',
    bg: 'rgba(167,139,250,0.08)',
    border: 'rgba(167,139,250,0.15)',
  },
];

export default function AuthBranding() {
  return (
    <div
      className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 relative overflow-hidden"
      style={{
        background: 'linear-gradient(145deg, #060a10 0%, #0a1628 40%, #0d1f3c 70%, #080c18 100%)',
      }}
    >
      {/* Background grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30" />
      {/* Glow orbs */}
      <div
        className="absolute rounded-full orb-float"
        style={{
          width: 500,
          height: 500,
          top: '-15%',
          right: '-15%',
          background: 'radial-gradient(circle, rgba(79,142,247,0.2) 0%, rgba(79,142,247,0.05) 40%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />
      <div
        className="absolute rounded-full orb-float-delayed"
        style={{
          width: 350,
          height: 350,
          bottom: '-10%',
          left: '-10%',
          background: 'radial-gradient(circle, rgba(124,58,237,0.18) 0%, rgba(124,58,237,0.04) 40%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />
      <div
        className="absolute rounded-full"
        style={{
          width: 250,
          height: 250,
          top: '45%',
          left: '25%',
          background: 'radial-gradient(circle, rgba(6,182,212,0.1) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />
      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(79,142,247,0.5), rgba(124,58,237,0.3), transparent)' }}
      />
      {/* Logo */}
      <div className="flex items-center gap-3 relative z-10">
        <div className="relative">
          <div
            className="absolute inset-0 rounded-xl blur-md"
            style={{ background: 'rgba(79,142,247,0.4)' }}
          />
          <div className="relative">
            <AppLogo size={42} />
          </div>
        </div>
        <div>
          <span className="text-white font-800 text-xl tracking-tight block leading-tight">SocietyDesk</span>
          <span className="text-[11px] font-500 tracking-wide" style={{ color: 'rgba(79,142,247,0.7)' }}>Resident Management Platform</span>
        </div>
      </div>
      {/* Hero text */}
      <div className="relative z-10 space-y-7">
        <div>
          <h1 className="text-4xl font-800 text-white leading-tight tracking-tight">
            Your society,<br />
            <span
              style={{
                background: 'linear-gradient(135deg, #7eb3ff 0%, #4f8ef7 40%, #a78bfa 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              managed smarter.
            </span>
          </h1>
          <p className="mt-4 text-base leading-relaxed" style={{ color: 'rgba(148,163,184,0.8)' }}>
            A unified platform for apartment communities to handle maintenance
            complaints, track resolutions, and keep everyone informed.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-2.5">
          {features?.map((f) => (
            <div
              key={f?.id}
              className="flex items-start gap-3 rounded-xl px-4 py-3 transition-all"
              style={{
                background: f?.bg,
                border: `1px solid ${f?.border}`,
                backdropFilter: 'blur(8px)',
              }}
            >
              <span
                className="mt-0.5 flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center"
                style={{ background: `${f?.bg}`, color: f?.color, border: `1px solid ${f?.border}` }}
              >
                {f?.icon}
              </span>
              <div>
                <p className="text-white font-600 text-sm leading-tight">{f?.title}</p>
                <p className="text-xs mt-0.5 leading-relaxed" style={{ color: 'rgba(148,163,184,0.7)' }}>{f?.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Footer */}
      <div className="relative z-10 flex items-center justify-between">
        <p className="text-xs" style={{ color: 'rgba(79,142,247,0.5)' }}>
          © 2026 SocietyDesk
        </p>
        <p className="text-xs" style={{ color: 'rgba(148,163,184,0.4)' }}>
          Trusted by 120+ residential societies
        </p>
      </div>
    </div>
  );
}
