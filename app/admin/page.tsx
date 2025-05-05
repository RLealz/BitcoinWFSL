"use client";

import React from 'react';
import Header from '../components/sections/header';
import Footer from '../components/sections/footer';
import { Breadcrumb } from '../components/ui/breadcrumb';

export default function AdminDashboard() {
  const [stats, setStats] = React.useState({
    totalLeads: 0,
    totalUsers: 0,
    conversionRate: 0,
    lastUpdate: new Date().toLocaleString()
  });

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-20 pb-12">
        <div className="container mx-auto px-6">
          {/* Breadcrumb Navigation */}
          <Breadcrumb 
            items={[
              { href: '/admin', label: 'Admin', isCurrent: true }
            ]}
            className="mb-6"
          />
          
          <div className="bg-black/30 backdrop-blur-sm rounded-lg border border-white/10 p-6 mb-8">
            <h1 className="text-2xl font-bold mb-6 text-[#FFD700]">Admin Dashboard</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {/* Stats Cards */}
              <div className="bg-black/20 p-4 rounded-lg border border-white/10">
                <h3 className="text-lg text-white/80 mb-2">Total Leads</h3>
                <p className="text-2xl font-bold text-[#FFD700]">{stats.totalLeads}</p>
              </div>
              
              <div className="bg-black/20 p-4 rounded-lg border border-white/10">
                <h3 className="text-lg text-white/80 mb-2">Total Users</h3>
                <p className="text-2xl font-bold text-[#FFD700]">{stats.totalUsers}</p>
              </div>
              
              <div className="bg-black/20 p-4 rounded-lg border border-white/10">
                <h3 className="text-lg text-white/80 mb-2">Conversion Rate</h3>
                <p className="text-2xl font-bold text-[#FFD700]">{stats.conversionRate}%</p>
              </div>
              
              <div className="bg-black/20 p-4 rounded-lg border border-white/10">
                <h3 className="text-lg text-white/80 mb-2">Last Update</h3>
                <p className="text-sm text-white/70">{stats.lastUpdate}</p>
              </div>
            </div>
            
            {/* Recent Leads Table */}
            <div className="overflow-x-auto">
              <h2 className="text-xl font-semibold mb-4 text-[#FFD700]">Recent Leads</h2>
              <table className="w-full text-white/80">
                <thead className="text-[#FFD700] text-left">
                  <tr className="border-b border-white/10">
                    <th className="py-3 px-4">Name</th>
                    <th className="py-3 px-4">Email</th>
                    <th className="py-3 px-4">Phone</th>
                    <th className="py-3 px-4">Created At</th>
                    <th className="py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-white/5 hover:bg-white/5">
                    <td className="py-3 px-4">No data available</td>
                    <td className="py-3 px-4"></td>
                    <td className="py-3 px-4"></td>
                    <td className="py-3 px-4"></td>
                    <td className="py-3 px-4"></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          
          <div className="bg-black/30 backdrop-blur-sm rounded-lg border border-white/10 p-6">
            <h2 className="text-xl font-semibold mb-4 text-[#FFD700]">Admin Actions</h2>
            <div className="flex flex-wrap gap-4">
              <button className="px-4 py-2 bg-[#FFD700] text-black rounded hover:bg-[#E5C100] transition-colors">
                Refresh Data
              </button>
              <button className="px-4 py-2 bg-transparent border border-[#FFD700] text-[#FFD700] rounded hover:bg-[#FFD700]/10 transition-colors">
                Export Leads
              </button>
              <button className="px-4 py-2 bg-transparent border border-white/30 text-white/80 rounded hover:bg-white/10 transition-colors">
                Manage Users
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}