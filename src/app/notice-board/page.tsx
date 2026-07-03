import React from 'react';
import NoticeBoardHeader from './components/NoticeBoardHeader';
import PinnedNotices from './components/PinnedNotices';
import NoticeList from './components/NoticeList';
import PostNoticePanel from './components/PostNoticePanel';

export default function NoticeBoardPage() {
 return (
  <div className="px-6 lg:px-8 xl:px-10 py-6 max-w-screen-2xl mx-auto">
    <NoticeBoardHeader />

    <div className="mt-6 grid grid-cols-1 xl:grid-cols-3 2xl:grid-cols-3 gap-6">
      <div className="xl:col-span-2 2xl:col-span-2 space-y-5">
        <PinnedNotices />
        <NoticeList />
      </div>

      <div className="xl:col-span-1 2xl:col-span-1">
        <PostNoticePanel />
      </div>
    </div>
  </div>
);
}
