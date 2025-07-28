import React, { useState } from 'react';
import CampaignSidebar from './CampaignSidebar';
import CampaignHeader from './CampaignHeader';
import CampaignSearch from './CampaignSearch';
import EmptyState from './EmptyState';
import CampaignTable from './CampaignTable';
import campaignsData from '@/data/campaigns.json';

interface Campaign {
  name: string;
  date: string;
  visibility: string;
  manager: {
    name: string;
    email: string;
  };
  total_customers: number;
  revenue: {
    amount: number;
    change: string;
    compared_to: string;
  };
}

const CampaignLayout = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const campaigns: Campaign[] = campaignsData;

  return (
    <div className="flex h-screen bg-gray-50">
      <CampaignSidebar />
      <div className="flex-1 flex flex-col">
        <CampaignHeader />
        <CampaignSearch searchTerm={searchTerm} onSearchChange={setSearchTerm} />
        <main className="flex-1 p-6">
          {campaigns.length === 0 ? (
            <EmptyState />
          ) : (
            <CampaignTable campaigns={campaigns} searchTerm={searchTerm} />
          )}
        </main>
      </div>
    </div>
  );
};

export default CampaignLayout;
