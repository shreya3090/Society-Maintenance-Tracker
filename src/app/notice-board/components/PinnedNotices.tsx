'use client';
import React, { useState } from 'react';
import { Pin, AlertCircle, ChevronDown, ChevronUp } from 'lucide-react';

const pinnedNotices = [
  {
    id: 'notice-001',
    title: 'Water Supply Shutdown — 03 Jul 2026 (6 AM to 2 PM)',
    body: 'Due to scheduled maintenance of the main water tank, water supply will be interrupted from 6:00 AM to 2:00 PM on Thursday, 03 July 2026. Please store adequate water in advance. We regret the inconvenience.',
    postedBy: 'Rajesh Agarwal',
    postedAt: '01 Jul 2026, 10:00 AM',
    category: 'Maintenance',
  },
  {
    id: 'notice-002',
    title: 'AGM Notice — Annual General Meeting on 15 Jul 2026',
    body: 'All residents are requested to attend the Annual General Meeting of Greenwood Apartments RWA on 15 July 2026 at 7:00 PM in the Community Hall. Agenda: FY2025-26 accounts review, election of new committee members, upcoming renovation proposals.',
    postedBy: 'Rajesh Agarwal',
    postedAt: '29 Jun 2026, 6:00 PM',
    category: 'Meeting',
  },
  {
    id: 'notice-003',
    title: 'Revised Maintenance Charges Effective 01 Aug 2026',
    body: 'The RWA committee has approved a revision in monthly maintenance charges from ₹2,800 to ₹3,200 per flat, effective 01 August 2026. This reflects increased costs for security personnel, housekeeping, and lift maintenance contracts. Detailed breakdown available at the office.',
    postedBy: 'Rajesh Agarwal',
    postedAt: '25 Jun 2026, 3:30 PM',
    category: 'Finance',
  },
];

const categoryColors: Record<string, string> = {
  Maintenance: 'bg-blue-50 text-blue-600',
  Meeting: 'bg-purple-50 text-purple-600',
  Finance: 'bg-emerald-50 text-emerald-600',
  Security: 'bg-red-50 text-red-600',
  General: 'bg-slate-100 text-slate-600',
  Event: 'bg-pink-50 text-pink-600',
};

export default function PinnedNotices() {
  const [expanded, setExpanded] = useState<string | null>('notice-001');

  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <Pin size={14} className="text-accent" />
        <h2 className="text-sm font-700 text-foreground uppercase tracking-wider">
          Pinned Notices
        </h2>
        <span className="text-[10px] font-600 bg-accent/10 text-accent px-1.5 py-0.5 rounded-full">
          {pinnedNotices.length} important
        </span>
      </div>

      <div className="space-y-3">
        {pinnedNotices.map((notice) => {
          const isExpanded = expanded === notice.id;
          return (
            <div
              key={notice.id}
              className="notice-pinned rounded-xl border border-amber-200 overflow-hidden card-elevated"
            >
              <button
                onClick={() => setExpanded(isExpanded ? null : notice.id)}
                className="w-full text-left px-5 py-4 flex items-start justify-between gap-3 hover:bg-amber-50/50 transition-colors"
              >
                <div className="flex items-start gap-3 min-w-0">
                  <AlertCircle size={16} className="text-accent flex-shrink-0 mt-0.5" />
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span
                        className={`text-[10px] font-700 uppercase tracking-wide px-1.5 py-0.5 rounded-md ${
                          categoryColors[notice.category] || categoryColors['General']
                        }`}
                      >
                        {notice.category}
                      </span>
                      <span className="text-[10px] font-600 badge-important px-1.5 py-0.5 rounded-full">
                        Important
                      </span>
                    </div>
                    <p className="text-sm font-700 text-foreground leading-snug">{notice.title}</p>
                    <p className="text-[11px] text-muted-foreground mt-1">
                      Posted by {notice.postedBy} · {notice.postedAt}
                    </p>
                  </div>
                </div>
                <span className="text-muted-foreground flex-shrink-0 mt-0.5">
                  {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </span>
              </button>

              {isExpanded && (
                <div className="px-5 pb-4 fade-in">
                  <div className="border-t border-amber-200 pt-3">
                    <p className="text-sm text-foreground leading-relaxed">{notice.body}</p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
