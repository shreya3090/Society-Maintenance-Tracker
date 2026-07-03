'use client';
import React, { useState } from 'react';
import { Search, X, ChevronDown, ChevronUp, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

interface Notice {
  id: string;
  title: string;
  body: string;
  postedBy: string;
  postedAt: string;
  category: string;
  isImportant: boolean;
}

const initialNotices: Notice[] = [
  {
    id: 'notice-004',
    title: 'Pest Control Treatment — 05 Jul 2026 (All Floors)',
    body: 'A comprehensive pest control treatment will be conducted on 05 July 2026 between 9:00 AM and 1:00 PM. Residents are advised to vacate their flats during the treatment period and return after 3:00 PM. Please cover all food items and utensils before leaving.',
    postedBy: 'Rajesh Agarwal',
    postedAt: '30 Jun 2026, 11:00 AM',
    category: 'Maintenance',
    isImportant: false,
  },
  {
    id: 'notice-005',
    title: 'Gym Renovation Complete — Reopening 02 Jul 2026',
    body: 'We are pleased to announce that the society gymnasium has been fully renovated with new equipment. The gym will reopen on 02 July 2026. New timings: 5:30 AM to 10:00 PM daily. A fresh booking schedule will be shared shortly.',
    postedBy: 'Rajesh Agarwal',
    postedAt: '29 Jun 2026, 4:00 PM',
    category: 'Event',
    isImportant: false,
  },
  {
    id: 'notice-006',
    title: 'Parking Slot Reallocation — Deadline 10 Jul 2026',
    body: 'Residents who wish to request a change in their assigned parking slot must submit a written application to the RWA office by 10 July 2026. Reallocation will be done on a first-come, first-served basis based on availability. No requests will be accepted after the deadline.',
    postedBy: 'Rajesh Agarwal',
    postedAt: '28 Jun 2026, 2:00 PM',
    category: 'General',
    isImportant: false,
  },
  {
    id: 'notice-007',
    title: 'Gate 1 CCTV Upgrade — Temporary Access Disruption',
    body: 'The CCTV system at Gate 1 will be upgraded on 02 July 2026 between 10:00 AM and 12:00 PM. During this period, the boom barrier will be operated manually by security personnel. Please cooperate with the security team and carry your resident ID.',
    postedBy: 'Rajesh Agarwal',
    postedAt: '27 Jun 2026, 9:30 AM',
    category: 'Security',
    isImportant: false,
  },
  {
    id: 'notice-008',
    title: 'Independence Day Celebration — 15 Aug 2026',
    body: 'The RWA is organizing an Independence Day celebration on 15 August 2026 at 8:00 AM in the society garden. Flag hoisting will be followed by cultural performances by resident children and a community breakfast. All residents are warmly invited.',
    postedBy: 'Rajesh Agarwal',
    postedAt: '25 Jun 2026, 5:00 PM',
    category: 'Event',
    isImportant: false,
  },
  {
    id: 'notice-009',
    title: 'Reminder: No Dumping of Construction Debris in Parking',
    body: 'It has been observed that some residents undertaking interior renovation work are dumping construction debris in the parking area and stairwells. This is strictly prohibited as per society bye-laws. Offenders will be fined ₹2,000 per instance. Please arrange for debris removal through licensed contractors.',
    postedBy: 'Rajesh Agarwal',
    postedAt: '22 Jun 2026, 10:00 AM',
    category: 'General',
    isImportant: false,
  },
  {
    id: 'notice-010',
    title: 'Swimming Pool Maintenance — Closed 01–03 Jul 2026',
    body: 'The swimming pool will be closed for annual cleaning and chemical treatment from 01 July to 03 July 2026. The pool will reopen on 04 July 2026. We apologize for the inconvenience and thank residents for their understanding.',
    postedBy: 'Rajesh Agarwal',
    postedAt: '20 Jun 2026, 3:00 PM',
    category: 'Maintenance',
    isImportant: false,
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

export default function NoticeList() {
  const [notices, setNotices] = useState<Notice[]>(initialNotices);
  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [expanded, setExpanded] = useState<string | null>(null);

  const categories = Array.from(new Set(initialNotices.map((n) => n.category)));

  const filtered = notices.filter((n) => {
    const q = search.toLowerCase();
    const matchSearch = !q || n.title.toLowerCase().includes(q) || n.body.toLowerCase().includes(q);
    const matchCat = filterCategory === 'all' || n.category === filterCategory;
    return matchSearch && matchCat;
  });

  const handleDelete = (id: string, title: string) => {
    setNotices((prev) => prev.filter((n) => n.id !== id));
    // BACKEND INTEGRATION: DELETE /api/notices/:id
    toast.success(`Notice deleted: "${title.slice(0, 40)}..."`);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-3 gap-3 flex-wrap">
        <h2 className="text-sm font-700 text-foreground uppercase tracking-wider">
          All Notices
          <span className="ml-2 text-[10px] font-600 text-muted-foreground normal-case tracking-normal">
            ({filtered.length} of {notices.length})
          </span>
        </h2>
        <div className="flex items-center gap-2 flex-wrap">
          <div className="relative">
            <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search notices…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-7 pr-7 py-1.5 rounded-lg border border-input bg-card text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring w-44 transition-all"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X size={12} />
              </button>
            )}
          </div>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="text-xs border border-input rounded-lg px-2.5 py-1.5 bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="all">All Categories</option>
            {categories.map((c) => (
              <option key={`cat-filter-${c}`} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="bg-card border border-border rounded-xl px-5 py-12 text-center">
          <div className="flex flex-col items-center gap-2">
            <Search size={28} className="text-muted-foreground opacity-40" />
            <p className="text-sm font-600 text-foreground">No notices match your search</p>
            <p className="text-xs text-muted-foreground">
              Try adjusting your search terms or category filter
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map((notice) => {
            const isExpanded = expanded === notice.id;
            return (
              <div
                key={notice.id}
                className="bg-card border border-border rounded-xl overflow-hidden card-elevated card-hover"
              >
                <div className="flex items-start gap-0">
                  <button
                    onClick={() => setExpanded(isExpanded ? null : notice.id)}
                    className="flex-1 text-left px-5 py-4 flex items-start justify-between gap-3 hover:bg-muted/30 transition-colors"
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1.5">
                        <span
                          className={`text-[10px] font-700 uppercase tracking-wide px-1.5 py-0.5 rounded-md ${
                            categoryColors[notice.category] || categoryColors['General']
                          }`}
                        >
                          {notice.category}
                        </span>
                      </div>
                      <p className="text-sm font-600 text-foreground leading-snug">{notice.title}</p>
                      <p className="text-[11px] text-muted-foreground mt-1.5">
                        Posted by{' '}
                        <span className="font-600 text-secondary-foreground">{notice.postedBy}</span>
                        {' · '}
                        {notice.postedAt}
                      </p>
                    </div>
                    <span className="text-muted-foreground flex-shrink-0 mt-0.5">
                      {isExpanded ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                    </span>
                  </button>
                  <div className="flex items-center pr-3 pt-4">
                    <button
                      onClick={() => handleDelete(notice.id, notice.title)}
                      title="Delete this notice"
                      className="p-1.5 rounded-lg text-muted-foreground hover:text-red-500 hover:bg-red-50 transition-all btn-press"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>

                {isExpanded && (
                  <div className="px-5 pb-4 fade-in">
                    <div className="border-t border-border pt-3">
                      <p className="text-sm text-foreground leading-relaxed">{notice.body}</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
