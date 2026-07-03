import React from 'react';

type Status = 'Open' | 'In Progress' | 'Resolved';
type Priority = 'Low' | 'Medium' | 'High';

interface StatusBadgeProps {
  status: Status;
  size?: 'sm' | 'md';
}

interface PriorityBadgeProps {
  priority: Priority;
  size?: 'sm' | 'md';
}

export function StatusBadge({ status, size = 'md' }: StatusBadgeProps) {
  const classMap: Record<Status, string> = {
    Open: 'badge-open',
    'In Progress': 'badge-inprogress',
    Resolved: 'badge-resolved',
  };
  const dotMap: Record<Status, string> = {
    Open: 'bg-blue-500',
    'In Progress': 'bg-amber-500',
    Resolved: 'bg-emerald-500',
  };
  const sizeClass = size === 'sm' ? 'text-[10px] px-1.5 py-0.5' : 'text-xs px-2 py-0.5';
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full font-600 ${sizeClass} ${classMap[status]}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${dotMap[status]}`} />
      {status}
    </span>
  );
}

export function PriorityBadge({ priority, size = 'md' }: PriorityBadgeProps) {
  const classMap: Record<Priority, string> = {
    Low: 'badge-low',
    Medium: 'badge-medium',
    High: 'badge-high',
  };
  const sizeClass = size === 'sm' ? 'text-[10px] px-1.5 py-0.5' : 'text-xs px-2 py-0.5';
  return (
    <span className={`inline-flex items-center rounded-full font-600 ${sizeClass} ${classMap[priority]}`}>
      {priority}
    </span>
  );
}
