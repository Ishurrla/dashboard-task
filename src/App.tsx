import { useState, useEffect } from 'react'
import Sidebar from './components/layout/Sidebar'
import TopBar from './components/layout/TopBar'
import SubscriptionOverview from './components/dashboard/SubscriptionOverview'
import DataInsight from './components/dashboard/DataInsight'
import ProductAdoption from './components/dashboard/ProductAdoption'
import UsageDistribution from './components/dashboard/UsageDistribution'
import ProductMetrics from './components/dashboard/ProductMetrics'
import DashboardSkeleton from './components/ui/DashboardSkeleton'

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [hasData, setHasData] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        <TopBar
          onMenuClick={() => setSidebarOpen(true)}
          hasData={hasData}
          onToggleData={() => setHasData(prev => !prev)}
        />

        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {loading ? (
            <DashboardSkeleton />
          ) : (
            <div className="flex flex-col gap-4 max-w-7xl mx-auto animate-[fadeIn_0.4s_ease-in]">
              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <SubscriptionOverview hasData={hasData} />
                <DataInsight hasData={hasData} />
              </div>
              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <ProductAdoption hasData={hasData} />
                <UsageDistribution hasData={hasData} />
              </div>
              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <ProductMetrics hasData={hasData} />
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
