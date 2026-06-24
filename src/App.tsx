import { useState } from 'react'
import type { DateFilter } from './api/dashboard'
import Sidebar from './components/layout/Sidebar'
import TopBar from './components/layout/TopBar'
import SubscriptionOverview from './components/dashboard/SubscriptionOverview'
import DataInsight from './components/dashboard/DataInsight'
import ProductAdoption from './components/dashboard/ProductAdoption'
import UsageDistribution from './components/dashboard/UsageDistribution'
import ProductMetrics from './components/dashboard/ProductMetrics'
import DashboardSkeleton from './components/ui/DashboardSkeleton'
import { useDashboard } from './hooks/useDashboard'

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [dateFilter, setDateFilter] = useState<DateFilter>('3 months')
  const { data, isLoading, error } = useDashboard(dateFilter)

  function renderContent() {
    if (isLoading) return <DashboardSkeleton />

    if (error) {
      return (
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <p className="text-sm font-medium text-gray-900">Failed to load dashboard</p>
            <p className="text-xs text-gray-400 mt-1">Check your connection and try again</p>
          </div>
        </div>
      )
    }   

    return (
      <div className="flex flex-col gap-4 max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <SubscriptionOverview data={data?.subscription_overview} dateFilter={dateFilter} onDateFilterChange={setDateFilter} />
          <DataInsight data={data?.subscription_overview?.data_insight} dateFilter={dateFilter} onDateFilterChange={setDateFilter} />
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <ProductAdoption data={data?.product_adoption} dateFilter={dateFilter} onDateFilterChange={setDateFilter} />
          <UsageDistribution data={data?.product_adoption?.usage_distribution} />
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <ProductMetrics data={data?.product_metrics} dateFilter={dateFilter} onDateFilterChange={setDateFilter} />
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        <TopBar onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex-1 overflow-y-auto p-4 md:p-6">
{renderContent()}
        </main>
      </div>
    </div>
  )
}