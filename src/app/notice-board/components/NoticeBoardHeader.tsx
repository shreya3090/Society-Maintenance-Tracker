import React from 'react';
import { Megaphone, Bell } from 'lucide-react';

export default function NoticeBoardHeader() {
  return (
    <div className="flex items-start justify-between gap-4 flex-wrap">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0 mt-0.5">
          <Megaphone size={20} />
        </div>
        <div>
          <h1 className="text-2xl font-700 text-foreground">Notice Board</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Greenwood Apartments · 10 notices · 3 important
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground bg-card border border-border rounded-lg px-3 py-2">
          <Bell size={13} />
          Residents are notified of important notices via email
        </div>
      </div>
    </div>
  );
}
