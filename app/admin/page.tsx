import Header from '@/components/sections/header';
import Footer from '@/components/sections/footer';

export default function AdminDashboard() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-16 container mx-auto px-4 py-8">
        <div className="bg-black/30 backdrop-blur-lg p-8 rounded-lg border border-white/10">
          <h1 className="text-3xl font-bold mb-6 text-[#FFD700]">Admin Dashboard</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="bg-white/5 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-2 text-[#FFD700]">Total Users</h2>
              <p className="text-3xl">0</p>
            </div>
            <div className="bg-white/5 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-2 text-[#FFD700]">Total Leads</h2>
              <p className="text-3xl">0</p>
            </div>
            <div className="bg-white/5 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-2 text-[#FFD700]">Conversion Rate</h2>
              <p className="text-3xl">0%</p>
            </div>
          </div>
          
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-[#FFD700]">Recent Leads</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-white/10">
                    <th className="p-3 text-left">Name</th>
                    <th className="p-3 text-left">Email</th>
                    <th className="p-3 text-left">Phone</th>
                    <th className="p-3 text-left">Created At</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-white/10">
                    <td colSpan={4} className="p-4 text-center text-gray-400">No leads found</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          
          <div>
            <h2 className="text-2xl font-bold mb-4 text-[#FFD700]">Performance</h2>
            <div className="h-64 bg-white/5 rounded-lg flex items-center justify-center">
              <p className="text-gray-400">Chart will be implemented here</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}