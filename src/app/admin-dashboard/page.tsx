import React from 'react';
import DashboardHeader from './components/DashboardHeader';
import MetricsBentoGrid from './components/MetricsBentoGrid';
import DashboardCharts from './components/DashboardCharts';
import ComplaintsTable from './components/ComplaintsTable';

export default function AdminDashboardPage() {
  return (
  <div className="px-6 lg:px-8 xl:px-10 py-6 max-w-screen-2xl mx-auto space-y-6">
    <DashboardHeader />
    <MetricsBentoGrid />
    <DashboardCharts />
    <ComplaintsTable />
  </div>
);
 
