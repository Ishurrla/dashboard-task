import StatCard from './StatCard'
import DateFilterButton from '../ui/DateFilterButton'
import clientIcon from '../../assets/client-icon.svg'
import type { DateFilter } from '../../api/dashboard'

interface SubscriptionData {
  total_clients: {
    count: number
    inactive_count: number
    inactive_percent: number
  }
  active_clients: {
    count: number
    change_percent: number
    direction: string
  }
  mrr: {
    amount: number
    change_percent: number
    change_value: number
    direction: string
  }
  churn_rate: {
    rate: number
    change_percent: number
    direction: string
  }
  average_revenue_per_client: {
    amount: number
    change_percent: number
    direction: string
  }
  activity_rate: {
    rate: number
    change_percent: number
    direction: string
  }
}

interface SubscriptionOverviewProps {
  data?: SubscriptionData
  dateFilter: DateFilter
  onDateFilterChange: (value: DateFilter) => void
}

export default function SubscriptionOverview({ data, dateFilter, onDateFilterChange }: SubscriptionOverviewProps) {
  const isEmpty = !data || data.total_clients.count === 0

  const stats: { label: string; value: string; change: string; trend: 'up' | 'down' }[] = [
    {
      label: 'Active Clients',
      value: isEmpty ? '0' : data.active_clients.count.toLocaleString(),
      change: isEmpty ? '+0% MoM' : `${data.active_clients.change_percent}% MoM`,
      trend: data?.active_clients.direction === 'increase' ? 'up' : 'down',
    },
    {
      label: 'MRR',
      value: isEmpty ? '₦0' : `₦${(data.mrr.amount / 1000).toFixed(1)}k`,
      change: isEmpty ? '+₦0k MoM (+0%)' : `+₦${data.mrr.change_value} MoM (+${data.mrr.change_percent}%)`,
      trend: data?.mrr.direction === 'increase' ? 'up' : 'down',
    },
    {
      label: 'Churn Rate',
      value: isEmpty ? '0%' : `${data.churn_rate.rate}%`,
      change: isEmpty ? '-0% vs last 30day' : `-${data.churn_rate.change_percent}% vs last 30day`,
      trend: data?.churn_rate.direction === 'decrease' ? 'up' : 'down',
    },
    {
      label: 'Avg Revenue per Client',
      value: isEmpty ? '₦0' : `₦${data.average_revenue_per_client.amount.toLocaleString()}`,
      change: isEmpty ? '+0% MoM' : `+${data.average_revenue_per_client.change_percent}% MoM`,
      trend: data?.average_revenue_per_client.direction === 'increase' ? 'up' : 'down',
    },
    {
      label: 'Activity Rate',
      value: isEmpty ? '0%' : `${data.activity_rate.rate}%`,
      change: isEmpty ? '+0% MoM' : `+${data.activity_rate.change_percent}% MoM`,
      trend: data?.activity_rate.direction === 'increase' ? 'up' : 'down',
    },
  ]

  return (
    <div className="mb-6">
      {/* Header */}
      <div className="flex items-start justify-between pb-4 mb-6 border-b border-[#EAECF0]">
        <div>
          <h2 className="text-base font-bold text-gray-900">Subscription Overview</h2>
          <p className="text-xs text-gray-400 mt-0.5">An insight into users subscription overtime</p>
        </div>
        <DateFilterButton value={dateFilter} onChange={onDateFilterChange} />
      </div>

      {/* Total client summary */}
      <div className="flex items-center gap-4 mb-6">
        <img src={clientIcon} alt="" aria-hidden="true" className="w-10 h-10 shrink-0" />
        <div>
          <p className="text-xs text-gray-400 mb-0.5">Total Client</p>
          <p className="text-2xl font-bold leading-none text-[#3E1C96]">
            {data?.total_clients.count.toLocaleString() ?? '0'}
          </p>
          <p className="text-xs text-green-600 mt-1">
            + {data?.total_clients.inactive_count ?? 0} inactive{' '}
            <span className="text-red-500">
              ({data?.total_clients.inactive_percent ?? 0}%)
            </span>
          </p>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 text-[#3E1C96]">
        {stats.map((stat) => (
          <StatCard key={stat.label} {...stat} empty={isEmpty} />
        ))}
      </div>
    </div>
  )
}