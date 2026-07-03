'use client';
import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  ChevronUp,
  ChevronDown,
  Eye,
  Edit2,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  X,
  SlidersHorizontal,
} from 'lucide-react';
import { StatusBadge, PriorityBadge } from '@/components/ui/StatusBadge';
import Modal from '@/components/ui/Modal';
import { toast } from 'sonner';

type Status = 'Open' | 'In Progress' | 'Resolved';
type Priority = 'Low' | 'Medium' | 'High';
type Category =
  | 'Plumbing' |'Electrical' |'Lift' |'Housekeeping' |'Security' |'Parking' |'Intercom' |'Other';

interface StatusHistoryEntry {
  id: string;
  status: Status;
  changedAt: string;
  actor: string;
  note?: string;
}

interface Complaint {
  id: string;
  flat: string;
  residentName: string;
  category: Category;
  subject: string;
  priority: Priority;
  daysOpen: number;
  status: Status;
  submitted: string;
  isOverdue: boolean;
  history: StatusHistoryEntry[];
}

const OVERDUE_THRESHOLD = 5; // days

const mockComplaints: Complaint[] = [
  {
    id: 'CMP-0041',
    flat: 'A-102',
    residentName: 'Priya Sharma',
    category: 'Plumbing',
    subject: 'Leaking pipe under kitchen sink causing water damage',
    priority: 'High',
    daysOpen: 12,
    status: 'Open',
    submitted: '19 Jun 2026',
    isOverdue: true,
    history: [
      { id: 'h-0041-1', status: 'Open', changedAt: '19 Jun 2026, 10:22 AM', actor: 'Priya Sharma', note: 'Complaint raised by resident' },
    ],
  },
  {
    id: 'CMP-0042',
    flat: 'C-301',
    residentName: 'Arjun Mehta',
    category: 'Electrical',
    subject: 'Power fluctuations tripping main circuit breaker repeatedly',
    priority: 'High',
    daysOpen: 9,
    status: 'In Progress',
    submitted: '22 Jun 2026',
    isOverdue: true,
    history: [
      { id: 'h-0042-1', status: 'Open', changedAt: '22 Jun 2026, 2:10 PM', actor: 'Arjun Mehta', note: 'Complaint raised' },
      { id: 'h-0042-2', status: 'In Progress', changedAt: '24 Jun 2026, 9:05 AM', actor: 'Rajesh Agarwal', note: 'Electrician scheduled for 25 Jun' },
    ],
  },
  {
    id: 'CMP-0043',
    flat: 'B-205',
    residentName: 'Kavitha Nair',
    category: 'Lift',
    subject: 'North wing lift making grinding noise, jerking on stop',
    priority: 'High',
    daysOpen: 7,
    status: 'In Progress',
    submitted: '24 Jun 2026',
    isOverdue: true,
    history: [
      { id: 'h-0043-1', status: 'Open', changedAt: '24 Jun 2026, 11:00 AM', actor: 'Kavitha Nair' },
      { id: 'h-0043-2', status: 'In Progress', changedAt: '25 Jun 2026, 8:30 AM', actor: 'Rajesh Agarwal', note: 'AMC vendor notified' },
    ],
  },
  {
    id: 'CMP-0044',
    flat: 'D-404',
    residentName: 'Suresh Pillai',
    category: 'Security',
    subject: 'Gate 2 CCTV camera offline for 3 days',
    priority: 'High',
    daysOpen: 6,
    status: 'Open',
    submitted: '25 Jun 2026',
    isOverdue: true,
    history: [
      { id: 'h-0044-1', status: 'Open', changedAt: '25 Jun 2026, 4:45 PM', actor: 'Suresh Pillai' },
    ],
  },
  {
    id: 'CMP-0045',
    flat: 'A-301',
    residentName: 'Deepa Krishnan',
    category: 'Housekeeping',
    subject: 'Stairwell on 3rd floor not cleaned for 5 days',
    priority: 'Medium',
    daysOpen: 6,
    status: 'Open',
    submitted: '25 Jun 2026',
    isOverdue: true,
    history: [
      { id: 'h-0045-1', status: 'Open', changedAt: '25 Jun 2026, 9:00 AM', actor: 'Deepa Krishnan' },
    ],
  },
  {
    id: 'CMP-0046',
    flat: 'B-102',
    residentName: 'Rahul Gupta',
    category: 'Parking',
    subject: 'Unauthorized vehicle occupying assigned spot P-24 for 2 days',
    priority: 'Medium',
    daysOpen: 4,
    status: 'In Progress',
    submitted: '27 Jun 2026',
    isOverdue: false,
    history: [
      { id: 'h-0046-1', status: 'Open', changedAt: '27 Jun 2026, 7:30 PM', actor: 'Rahul Gupta' },
      { id: 'h-0046-2', status: 'In Progress', changedAt: '28 Jun 2026, 10:00 AM', actor: 'Rajesh Agarwal', note: 'Security team notified, owner being traced' },
    ],
  },
  {
    id: 'CMP-0047',
    flat: 'C-108',
    residentName: 'Meena Iyer',
    category: 'Intercom',
    subject: 'Flat intercom unit not ringing, only static on line',
    priority: 'Low',
    daysOpen: 3,
    status: 'Open',
    submitted: '28 Jun 2026',
    isOverdue: false,
    history: [
      { id: 'h-0047-1', status: 'Open', changedAt: '28 Jun 2026, 3:00 PM', actor: 'Meena Iyer' },
    ],
  },
  {
    id: 'CMP-0048',
    flat: 'D-201',
    residentName: 'Vikram Singh',
    category: 'Plumbing',
    subject: 'Low water pressure in bathroom taps since last week',
    priority: 'Medium',
    daysOpen: 2,
    status: 'In Progress',
    submitted: '29 Jun 2026',
    isOverdue: false,
    history: [
      { id: 'h-0048-1', status: 'Open', changedAt: '29 Jun 2026, 8:00 AM', actor: 'Vikram Singh' },
      { id: 'h-0048-2', status: 'In Progress', changedAt: '29 Jun 2026, 2:00 PM', actor: 'Rajesh Agarwal', note: 'Plumber visit scheduled for 30 Jun' },
    ],
  },
  {
    id: 'CMP-0049',
    flat: 'A-404',
    residentName: 'Ananya Reddy',
    category: 'Electrical',
    subject: 'Corridor light on 4th floor flickering continuously',
    priority: 'Low',
    daysOpen: 1,
    status: 'Open',
    submitted: '30 Jun 2026',
    isOverdue: false,
    history: [
      { id: 'h-0049-1', status: 'Open', changedAt: '30 Jun 2026, 5:00 PM', actor: 'Ananya Reddy' },
    ],
  },
  {
    id: 'CMP-0050',
    flat: 'B-303',
    residentName: 'Sanjay Kapoor',
    category: 'Housekeeping',
    subject: 'Garbage chute on 3rd floor blocked, bad odour spreading',
    priority: 'High',
    daysOpen: 1,
    status: 'Resolved',
    submitted: '30 Jun 2026',
    isOverdue: false,
    history: [
      { id: 'h-0050-1', status: 'Open', changedAt: '30 Jun 2026, 9:00 AM', actor: 'Sanjay Kapoor' },
      { id: 'h-0050-2', status: 'In Progress', changedAt: '30 Jun 2026, 10:30 AM', actor: 'Rajesh Agarwal', note: 'Housekeeping team dispatched' },
      { id: 'h-0050-3', status: 'Resolved', changedAt: '30 Jun 2026, 1:00 PM', actor: 'Rajesh Agarwal', note: 'Chute cleared, area sanitized' },
    ],
  },
  {
    id: 'CMP-0051',
    flat: 'C-205',
    residentName: 'Lakshmi Venkat',
    category: 'Other',
    subject: 'Noise complaint — neighbours playing music past midnight',
    priority: 'Medium',
    daysOpen: 2,
    status: 'Open',
    submitted: '29 Jun 2026',
    isOverdue: false,
    history: [
      { id: 'h-0051-1', status: 'Open', changedAt: '29 Jun 2026, 11:00 PM', actor: 'Lakshmi Venkat' },
    ],
  },
  {
    id: 'CMP-0052',
    flat: 'D-102',
    residentName: 'Rohit Malhotra',
    category: 'Security',
    subject: 'Visitor entry log not being maintained at Gate 1',
    priority: 'Low',
    daysOpen: 0,
    status: 'Open',
    submitted: '01 Jul 2026',
    isOverdue: false,
    history: [
      { id: 'h-0052-1', status: 'Open', changedAt: '01 Jul 2026, 11:30 AM', actor: 'Rohit Malhotra' },
    ],
  },
];

const CATEGORIES: Category[] = [
  'Plumbing', 'Electrical', 'Lift', 'Housekeeping', 'Security', 'Parking', 'Intercom', 'Other',
];
const STATUSES: Status[] = ['Open', 'In Progress', 'Resolved'];
const PRIORITIES: Priority[] = ['Low', 'Medium', 'High'];
const PAGE_SIZE_OPTIONS = [5, 10, 20];

type SortKey = 'daysOpen' | 'submitted' | 'priority' | 'status' | 'flat';
type SortDir = 'asc' | 'desc';

const priorityOrder: Record<Priority, number> = { High: 3, Medium: 2, Low: 1 };

export default function ComplaintsTable() {
  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterPriority, setFilterPriority] = useState<string>('all');
  const [sortKey, setSortKey] = useState<SortKey>('daysOpen');
  const [sortDir, setSortDir] = useState<SortDir>('desc');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [complaints, setComplaints] = useState<Complaint[]>(mockComplaints);
  const [statusDropdownId, setStatusDropdownId] = useState<string | null>(null);
  const [priorityDropdownId, setPriorityDropdownId] = useState<string | null>(null);
  const [historyModal, setHistoryModal] = useState<Complaint | null>(null);
  const [updateModal, setUpdateModal] = useState<Complaint | null>(null);
  const [updateNote, setUpdateNote] = useState('');
  const [updateStatus, setUpdateStatus] = useState<Status>('Open');
  const [updatePriority, setUpdatePriority] = useState<Priority>('Medium');
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let result = complaints.filter((c) => {
      const q = search.toLowerCase();
      const matchSearch =
        !q ||
        c.id.toLowerCase().includes(q) ||
        c.flat.toLowerCase().includes(q) ||
        c.residentName.toLowerCase().includes(q) ||
        c.subject.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q);
      const matchCat = filterCategory === 'all' || c.category === filterCategory;
      const matchStatus = filterStatus === 'all' || c.status === filterStatus;
      const matchPriority = filterPriority === 'all' || c.priority === filterPriority;
      return matchSearch && matchCat && matchStatus && matchPriority;
    });

    result.sort((a, b) => {
      // Overdue always first
      if (a.isOverdue && !b.isOverdue) return -1;
      if (!a.isOverdue && b.isOverdue) return 1;

      let cmp = 0;
      if (sortKey === 'daysOpen') cmp = a.daysOpen - b.daysOpen;
      else if (sortKey === 'priority') cmp = priorityOrder[a.priority] - priorityOrder[b.priority];
      else if (sortKey === 'status') cmp = a.status.localeCompare(b.status);
      else if (sortKey === 'flat') cmp = a.flat.localeCompare(b.flat);
      else if (sortKey === 'submitted') cmp = a.id.localeCompare(b.id);
      return sortDir === 'desc' ? -cmp : cmp;
    });
    return result;
  }, [complaints, search, filterCategory, filterStatus, filterPriority, sortKey, sortDir]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paged = filtered.slice((page - 1) * pageSize, page * pageSize);

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    else { setSortKey(key); setSortDir('desc'); }
    setPage(1);
  };

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    const pageIds = paged.map((c) => c.id);
    const allSelected = pageIds.every((id) => selectedIds.includes(id));
    if (allSelected) setSelectedIds((prev) => prev.filter((id) => !pageIds.includes(id)));
    else setSelectedIds((prev) => [...new Set([...prev, ...pageIds])]);
  };

  const handleStatusChange = (complaintId: string, newStatus: Status) => {
    setComplaints((prev) =>
      prev.map((c) => {
        if (c.id !== complaintId) return c;
        const newEntry: StatusHistoryEntry = {
          id: `h-${complaintId}-${c.history.length + 1}`,
          status: newStatus,
          changedAt: '01 Jul 2026, 1:51 PM',
          actor: 'Rajesh Agarwal',
          note: 'Status updated by admin',
        };
        // BACKEND INTEGRATION: PATCH /api/complaints/:id/status { status: newStatus, note, actor }
        return {
          ...c,
          status: newStatus,
          isOverdue: newStatus !== 'Resolved' && c.daysOpen >= OVERDUE_THRESHOLD,
          history: [...c.history, newEntry],
        };
      })
    );
    setStatusDropdownId(null);
    toast.success(`${complaintId} → ${newStatus}`);
  };

  const handlePriorityChange = (complaintId: string, newPriority: Priority) => {
    setComplaints((prev) =>
      prev.map((c) => (c.id === complaintId ? { ...c, priority: newPriority } : c))
    );
    setPriorityDropdownId(null);
    // BACKEND INTEGRATION: PATCH /api/complaints/:id/priority { priority: newPriority }
    toast.success(`Priority updated to ${newPriority}`);
  };

  const handleUpdateSubmit = () => {
    if (!updateModal) return;
    setComplaints((prev) =>
      prev.map((c) => {
        if (c.id !== updateModal.id) return c;
        const newEntry: StatusHistoryEntry = {
          id: `h-${c.id}-${c.history.length + 1}`,
          status: updateStatus,
          changedAt: '01 Jul 2026, 1:51 PM',
          actor: 'Rajesh Agarwal',
          note: updateNote || undefined,
        };
        return {
          ...c,
          status: updateStatus,
          priority: updatePriority,
          isOverdue: updateStatus !== 'Resolved' && c.daysOpen >= OVERDUE_THRESHOLD,
          history: [...c.history, newEntry],
        };
      })
    );
    toast.success(`${updateModal.id} updated successfully`);
    setUpdateModal(null);
    setUpdateNote('');
  };

  const SortIcon = ({ col }: { col: SortKey }) =>
    sortKey === col ? (
      sortDir === 'desc' ? <ChevronDown size={13} className="text-primary" /> : <ChevronUp size={13} className="text-primary" />
    ) : (
      <ChevronDown size={13} className="text-muted-foreground opacity-40" />
    );

  const pageNumbers = Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
    if (totalPages <= 5) return i + 1;
    if (page <= 3) return i + 1;
    if (page >= totalPages - 2) return totalPages - 4 + i;
    return page - 2 + i;
  });

  return (
    <div className="bg-card border border-border rounded-xl card-elevated">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-border gap-4 flex-wrap">
        <div>
          <h3 className="text-base font-600 text-foreground">All Complaints</h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            {filtered.length} complaint{filtered.length !== 1 ? 's' : ''} · {complaints.filter((c) => c.isOverdue).length} overdue
          </p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {/* Search */}
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search complaints…"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              className="pl-8 pr-3 py-2 rounded-lg border border-input bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring w-52 transition-all"
            />
            {search && (
              <button onClick={() => setSearch('')} className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                <X size={13} />
              </button>
            )}
          </div>
          <button
            onClick={() => setShowFilters((v) => !v)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg border text-sm font-600 transition-all btn-press ${
              showFilters || filterCategory !== 'all' || filterStatus !== 'all' || filterPriority !== 'all' ?'border-primary bg-primary/5 text-primary' :'border-border bg-card text-secondary-foreground hover:bg-muted'
            }`}
          >
            <SlidersHorizontal size={14} />
            Filters
            {(filterCategory !== 'all' || filterStatus !== 'all' || filterPriority !== 'all') && (
              <span className="bg-primary text-primary-foreground text-[9px] rounded-full w-4 h-4 flex items-center justify-center tabular-nums">
                {[filterCategory, filterStatus, filterPriority].filter((f) => f !== 'all').length}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Filter row */}
      {showFilters && (
        <div className="flex items-center gap-3 px-5 py-3 bg-muted/30 border-b border-border flex-wrap fade-in">
          <div className="flex items-center gap-1.5">
            <Filter size={13} className="text-muted-foreground" />
            <span className="text-xs font-600 text-muted-foreground">Filter by:</span>
          </div>
          <select
            value={filterCategory}
            onChange={(e) => { setFilterCategory(e.target.value); setPage(1); }}
            className="text-xs border border-input rounded-lg px-2.5 py-1.5 bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="all">All Categories</option>
            {CATEGORIES.map((c) => <option key={`opt-cat-${c}`} value={c}>{c}</option>)}
          </select>
          <select
            value={filterStatus}
            onChange={(e) => { setFilterStatus(e.target.value); setPage(1); }}
            className="text-xs border border-input rounded-lg px-2.5 py-1.5 bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="all">All Statuses</option>
            {STATUSES.map((s) => <option key={`opt-stat-${s}`} value={s}>{s}</option>)}
          </select>
          <select
            value={filterPriority}
            onChange={(e) => { setFilterPriority(e.target.value); setPage(1); }}
            className="text-xs border border-input rounded-lg px-2.5 py-1.5 bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="all">All Priorities</option>
            {PRIORITIES.map((p) => <option key={`opt-pri-${p}`} value={p}>{p}</option>)}
          </select>
          {(filterCategory !== 'all' || filterStatus !== 'all' || filterPriority !== 'all') && (
            <button
              onClick={() => { setFilterCategory('all'); setFilterStatus('all'); setFilterPriority('all'); setPage(1); }}
              className="text-xs text-red-500 hover:text-red-600 font-600 flex items-center gap-1 transition-colors"
            >
              <X size={12} /> Clear filters
            </button>
          )}
        </div>
      )}

      {/* Bulk action bar */}
      {selectedIds.length > 0 && (
        <div className="flex items-center justify-between px-5 py-2.5 bg-primary/5 border-b border-primary/20 fade-in">
          <span className="text-sm font-600 text-primary">
            {selectedIds.length} complaint{selectedIds.length > 1 ? 's' : ''} selected
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setComplaints((prev) =>
                  prev.map((c) =>
                    selectedIds.includes(c.id) ? { ...c, status: 'In Progress' as Status } : c
                  )
                );
                toast.success(`${selectedIds.length} complaints → In Progress`);
                setSelectedIds([]);
              }}
              className="text-xs font-600 text-primary bg-primary/10 hover:bg-primary/20 px-3 py-1.5 rounded-lg transition-all btn-press"
            >
              Mark In Progress
            </button>
            <button
              onClick={() => setSelectedIds([])}
              className="text-xs font-600 text-muted-foreground hover:text-foreground px-2 py-1.5 rounded-lg transition-all btn-press"
            >
              <X size={13} />
            </button>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px]">
          <thead>
            <tr className="border-b border-border">
              <th className="px-4 py-3 w-8">
                <input
                  type="checkbox"
                  checked={paged.length > 0 && paged.every((c) => selectedIds.includes(c.id))}
                  onChange={toggleSelectAll}
                  className="w-4 h-4 rounded border-input accent-primary"
                />
              </th>
              <th className="px-3 py-3 text-left text-[11px] font-600 uppercase tracking-wider text-muted-foreground whitespace-nowrap">
                ID
              </th>
              <th
                className="px-3 py-3 text-left text-[11px] font-600 uppercase tracking-wider text-muted-foreground cursor-pointer hover:text-foreground transition-colors whitespace-nowrap"
                onClick={() => toggleSort('flat')}
              >
                <span className="flex items-center gap-1">Flat <SortIcon col="flat" /></span>
              </th>
              <th className="px-3 py-3 text-left text-[11px] font-600 uppercase tracking-wider text-muted-foreground whitespace-nowrap">
                Category
              </th>
              <th className="px-3 py-3 text-left text-[11px] font-600 uppercase tracking-wider text-muted-foreground">
                Subject
              </th>
              <th
                className="px-3 py-3 text-left text-[11px] font-600 uppercase tracking-wider text-muted-foreground cursor-pointer hover:text-foreground transition-colors whitespace-nowrap"
                onClick={() => toggleSort('priority')}
              >
                <span className="flex items-center gap-1">Priority <SortIcon col="priority" /></span>
              </th>
              <th
                className="px-3 py-3 text-left text-[11px] font-600 uppercase tracking-wider text-muted-foreground cursor-pointer hover:text-foreground transition-colors whitespace-nowrap"
                onClick={() => toggleSort('daysOpen')}
              >
                <span className="flex items-center gap-1">Days Open <SortIcon col="daysOpen" /></span>
              </th>
              <th
                className="px-3 py-3 text-left text-[11px] font-600 uppercase tracking-wider text-muted-foreground cursor-pointer hover:text-foreground transition-colors whitespace-nowrap"
                onClick={() => toggleSort('status')}
              >
                <span className="flex items-center gap-1">Status <SortIcon col="status" /></span>
              </th>
              <th className="px-3 py-3 text-left text-[11px] font-600 uppercase tracking-wider text-muted-foreground whitespace-nowrap">
                Submitted
              </th>
              <th className="px-3 py-3 text-left text-[11px] font-600 uppercase tracking-wider text-muted-foreground">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {paged.length === 0 ? (
              <tr>
                <td colSpan={10} className="px-5 py-12 text-center">
                  <div className="flex flex-col items-center gap-2">
                    <ClipboardList size={32} className="text-muted-foreground opacity-40" />
                    <p className="text-sm font-600 text-foreground">No complaints match your filters</p>
                    <p className="text-xs text-muted-foreground">Try adjusting your search or filter criteria</p>
                  </div>
                </td>
              </tr>
            ) : (
              paged.map((complaint) => (
                <tr
                  key={`row-${complaint.id}`}
                  className={`border-b border-border last:border-0 row-hover hover:bg-muted/40 ${
                    complaint.isOverdue ? 'overdue-row' : ''
                  }`}
                >
                  <td className="px-4 py-3.5">
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(complaint.id)}
                      onChange={() => toggleSelect(complaint.id)}
                      className="w-4 h-4 rounded border-input accent-primary"
                    />
                  </td>
                  <td className="px-3 py-3.5">
                    <div className="flex items-center gap-1.5">
                      {complaint.isOverdue && (
                        <AlertTriangle size={12} className="text-red-500 flex-shrink-0" />
                      )}
                      <span className="text-xs font-700 text-foreground tabular-nums">{complaint.id}</span>
                    </div>
                  </td>
                  <td className="px-3 py-3.5">
                    <div>
                      <p className="text-sm font-600 text-foreground">{complaint.flat}</p>
                      <p className="text-[11px] text-muted-foreground truncate max-w-[80px]">{complaint.residentName}</p>
                    </div>
                  </td>
                  <td className="px-3 py-3.5">
                    <span className="text-xs font-500 text-secondary-foreground bg-secondary px-2 py-0.5 rounded-md whitespace-nowrap">
                      {complaint.category}
                    </span>
                  </td>
                  <td className="px-3 py-3.5 max-w-[200px]">
                    <p className="text-sm text-foreground truncate" title={complaint.subject}>
                      {complaint.subject}
                    </p>
                  </td>
                  <td className="px-3 py-3.5">
                    <div className="relative">
                      <button
                        onClick={() => setPriorityDropdownId(priorityDropdownId === complaint.id ? null : complaint.id)}
                        className="hover:opacity-80 transition-opacity btn-press"
                      >
                        <PriorityBadge priority={complaint.priority} size="sm" />
                      </button>
                      {priorityDropdownId === complaint.id && (
                        <div className="absolute z-20 top-full mt-1 left-0 bg-card border border-border rounded-lg shadow-lg py-1 min-w-[100px] scale-in">
                          {PRIORITIES.map((p) => (
                            <button
                              key={`pdrop-${complaint.id}-${p}`}
                              onClick={() => handlePriorityChange(complaint.id, p)}
                              className={`w-full text-left px-3 py-1.5 text-xs font-500 hover:bg-muted transition-colors ${complaint.priority === p ? 'text-primary font-700' : 'text-foreground'}`}
                            >
                              {p}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-3 py-3.5">
                    <span className={`text-sm font-700 tabular-nums ${complaint.isOverdue ? 'text-red-500' : 'text-foreground'}`}>
                      {complaint.daysOpen}d
                    </span>
                    {complaint.isOverdue && (
                      <span className="ml-1 text-[9px] font-600 text-red-400 uppercase">overdue</span>
                    )}
                  </td>
                  <td className="px-3 py-3.5">
                    <div className="relative">
                      {complaint.status === 'Resolved' ? (
                        <StatusBadge status={complaint.status} size="sm" />
                      ) : (
                        <button
                          onClick={() => setStatusDropdownId(statusDropdownId === complaint.id ? null : complaint.id)}
                          className="hover:opacity-80 transition-opacity btn-press"
                        >
                          <StatusBadge status={complaint.status} size="sm" />
                        </button>
                      )}
                      {statusDropdownId === complaint.id && complaint.status !== 'Resolved' && (
                        <div className="absolute z-20 top-full mt-1 left-0 bg-card border border-border rounded-lg shadow-lg py-1 min-w-[120px] scale-in">
                          {STATUSES.filter((s) => s !== complaint.status).map((s) => (
                            <button
                              key={`sdrop-${complaint.id}-${s}`}
                              onClick={() => handleStatusChange(complaint.id, s)}
                              className="w-full text-left px-3 py-1.5 text-xs font-500 hover:bg-muted transition-colors text-foreground"
                            >
                              → {s}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-3 py-3.5">
                    <span className="text-xs text-muted-foreground whitespace-nowrap">{complaint.submitted}</span>
                  </td>
                  <td className="px-3 py-3.5">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => setHistoryModal(complaint)}
                        title="View status history"
                        className="p-1.5 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all btn-press"
                      >
                        <Eye size={14} />
                      </button>
                      <button
                        onClick={() => {
                          setUpdateModal(complaint);
                          setUpdateStatus(complaint.status);
                          setUpdatePriority(complaint.priority);
                          setUpdateNote('');
                        }}
                        title="Update complaint"
                        className="p-1.5 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all btn-press"
                      >
                        <Edit2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between px-5 py-3 border-t border-border flex-wrap gap-3">
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">Rows per page:</span>
          <select
            value={pageSize}
            onChange={(e) => { setPageSize(Number(e.target.value)); setPage(1); }}
            className="text-xs border border-input rounded-md px-2 py-1 bg-card text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
          >
            {PAGE_SIZE_OPTIONS.map((s) => <option key={`ps-${s}`} value={s}>{s}</option>)}
          </select>
          <span className="text-xs text-muted-foreground">
            {Math.min((page - 1) * pageSize + 1, filtered.length)}–{Math.min(page * pageSize, filtered.length)} of {filtered.length}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="p-1.5 rounded-lg border border-border text-muted-foreground hover:bg-muted hover:text-foreground transition-all btn-press disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ChevronLeft size={14} />
          </button>
          {pageNumbers.map((n) => (
            <button
              key={`page-${n}`}
              onClick={() => setPage(n)}
              className={`w-7 h-7 rounded-lg text-xs font-600 transition-all btn-press ${
                page === n
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground border border-border'
              }`}
            >
              {n}
            </button>
          ))}
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="p-1.5 rounded-lg border border-border text-muted-foreground hover:bg-muted hover:text-foreground transition-all btn-press disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ChevronRight size={14} />
          </button>
        </div>
      </div>

      {/* History Modal */}
      <Modal
        open={historyModal !== null}
        onClose={() => setHistoryModal(null)}
        title={`Status History — ${historyModal?.id}`}
        size="md"
      >
        {historyModal && (
          <div className="space-y-3">
            <div className="bg-muted/50 rounded-lg px-4 py-3 text-sm">
              <p className="font-600 text-foreground">{historyModal.subject}</p>
              <p className="text-xs text-muted-foreground mt-1">
                {historyModal.flat} · {historyModal.residentName} · {historyModal.category}
              </p>
            </div>
            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-px bg-border" />
              <div className="space-y-4 pl-10">
                {historyModal.history.map((entry) => (
                  <div key={entry.id} className="relative">
                    <div className="absolute -left-6 top-1 w-3 h-3 rounded-full border-2 border-card bg-primary" />
                    <div className="bg-card border border-border rounded-lg px-3 py-2.5">
                      <div className="flex items-center justify-between gap-2 flex-wrap">
                        <StatusBadge status={entry.status} size="sm" />
                        <span className="text-[11px] text-muted-foreground">{entry.changedAt}</span>
                      </div>
                      <p className="text-xs text-secondary-foreground mt-1.5">
                        By <span className="font-600 text-foreground">{entry.actor}</span>
                      </p>
                      {entry.note && (
                        <p className="text-xs text-muted-foreground mt-1 italic">"{entry.note}"</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Update Modal */}
      <Modal
        open={updateModal !== null}
        onClose={() => setUpdateModal(null)}
        title={`Update Complaint — ${updateModal?.id}`}
        size="md"
      >
        {updateModal && (
          <div className="space-y-4">
            <div className="bg-muted/50 rounded-lg px-4 py-3">
              <p className="text-sm font-600 text-foreground">{updateModal.subject}</p>
              <p className="text-xs text-muted-foreground mt-1">
                {updateModal.flat} · {updateModal.residentName}
              </p>
            </div>

            <div>
              <label className="block text-sm font-600 text-foreground mb-1.5">Status</label>
              <div className="flex gap-2">
                {STATUSES.map((s) => (
                  <button
                    key={`ustatus-${s}`}
                    type="button"
                    onClick={() => setUpdateStatus(s)}
                    disabled={updateModal.status === 'Resolved'}
                    className={`flex-1 py-2 rounded-lg text-xs font-600 border transition-all btn-press disabled:opacity-50 ${
                      updateStatus === s
                        ? 'bg-primary text-primary-foreground border-primary'
                        : 'bg-card text-secondary-foreground border-border hover:border-primary/50'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
              {updateModal.status === 'Resolved' && (
                <p className="text-xs text-muted-foreground mt-1.5">Resolved complaints cannot be reopened.</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-600 text-foreground mb-1.5">Priority</label>
              <div className="flex gap-2">
                {PRIORITIES.map((p) => (
                  <button
                    key={`upri-${p}`}
                    type="button"
                    onClick={() => setUpdatePriority(p)}
                    className={`flex-1 py-2 rounded-lg text-xs font-600 border transition-all btn-press ${
                      updatePriority === p
                        ? 'bg-primary text-primary-foreground border-primary'
                        : 'bg-card text-secondary-foreground border-border hover:border-primary/50'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-600 text-foreground mb-1.5">
                Note <span className="text-muted-foreground font-400">(optional)</span>
              </label>
              <p className="text-xs text-muted-foreground mb-1.5">
                Add context about this status change — visible in complaint history
              </p>
              <textarea
                rows={3}
                value={updateNote}
                onChange={(e) => setUpdateNote(e.target.value)}
                placeholder="e.g. Plumber scheduled for tomorrow morning, parts ordered..."
                className="w-full px-3.5 py-2.5 rounded-lg border border-input bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all resize-none"
              />
            </div>

            <div className="flex gap-2 pt-1">
              <button
                onClick={() => setUpdateModal(null)}
                className="flex-1 py-2.5 rounded-lg border border-border text-sm font-600 text-secondary-foreground hover:bg-muted transition-all btn-press"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateSubmit}
                className="flex-1 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-600 hover:bg-primary/90 transition-all btn-press"
              >
                Save Update
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

// ClipboardList import for empty state
import { ClipboardList } from 'lucide-react'
;
