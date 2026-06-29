import ClientDateFilterButton from '../ui/ClientDateFilterButton'
import type { ClientDateFilter } from '../../api/clientManagement'

interface StatItem {
  label: string
  count: number
  change: number
}

interface ClientStatCardsProps {
  data?: {
    total_clients: { count: number; change: number }
    active_clients: { count: number; change: number }
    inactive_clients: { count: number; change: number }
    suspended_clients: { count: number; change: number }
  }
  isLoading: boolean
  dateFilter: ClientDateFilter
  onDateFilterChange: (value: ClientDateFilter) => void
}

export default function ClientStatCards({ data, isLoading, dateFilter, onDateFilterChange }: ClientStatCardsProps) {
  const stats: StatItem[] = [
    { label: 'Total Clients', count: data?.total_clients.count ?? 0, change: data?.total_clients.change ?? 0 },
    { label: 'Active Clients', count: data?.active_clients.count ?? 0, change: data?.active_clients.change ?? 0 },
    { label: 'Inactive Clients', count: data?.inactive_clients.count ?? 0, change: data?.inactive_clients.change ?? 0 },
    { label: 'Suspended Clients', count: data?.suspended_clients.count ?? 0, change: data?.suspended_clients.change ?? 0 },
  ]

  return (
    <div>
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h1 className="text-base font-bold text-gray-900">Client Management</h1>
          <p className="text-xs text-gray-400 mt-0.5">An insight into clients subscription overtime</p>
        </div>
        <ClientDateFilterButton value={dateFilter} onChange={onDateFilterChange} />
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {isLoading
          ? (['s1', 's2', 's3', 's4'] as const).map((id) => (
              <div key={id} className="border border-gray-200 rounded-xl p-4 animate-pulse">
                <div className="h-3 bg-gray-200 rounded w-24 mb-3" />
                <div className="h-7 bg-gray-200 rounded w-16 mb-2" />
                <div className="h-3 bg-gray-200 rounded w-32" />
              </div>
            ))
          : stats.map((stat) => {
              const isUp = stat.change >= 0
              return (
                <div key={stat.label} className="border border-gray-200 rounded-xl p-4">
                  <p className="text-xs text-gray-400 mb-2">{stat.label}</p>
                  <p className="text-2xl font-bold text-[#3E1C96]">
                    {stat.count.toLocaleString()}
                  </p>
                  <p className={`text-xs font-medium mt-1 ${isUp ? 'text-green-600' : 'text-red-500'}`}>
                    {isUp ? '+' : ''}{stat.change}% increase vs last month
                  </p>
                </div>
              )
            })}
      </div>
    </div>
  )
}
