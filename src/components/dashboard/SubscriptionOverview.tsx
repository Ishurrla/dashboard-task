import { IconCalendar } from '@tabler/icons-react'
import StatCard from './StatCard'
import { subscriptionStats, totalClient } from '../../data/mockData'
import EmptyState from '../ui/EmptyState'

interface SubscriptionOverviewProps {
  hasData: boolean
}

export default function SubscriptionOverview({ hasData }: SubscriptionOverviewProps) {
  return (
    <div className="mb-6">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="text-base font-bold text-gray-900">Subscription Overview</h2>
          <p className="text-xs text-gray-400 mt-0.5">An insight into users subscription overtime</p>
        </div>
        <button
          type="button"
          className="flex items-center gap-1.5 text-xs text-gray-500 border border-gray-200 rounded-full px-3 py-1.5 hover:bg-gray-50 transition-colors whitespace-nowrap"
        >
          Date: <span className="text-orange-500 font-medium">Last 6 Month</span>
          <IconCalendar size={13} className="text-gray-400" />
        </button>
      </div>

      {/* Total client summary */}
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center shrink-0">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="9" cy="7" r="3.5" fill="#7C3AED" opacity="0.7" />
            <circle cx="15" cy="6" r="2.5" fill="#7C3AED" opacity="0.4" />
            <path d="M2 19c0-3.314 3.134-6 7-6s7 2.686 7 6" stroke="#7C3AED" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
            <path d="M15 13c2.21 0 4 1.79 4 4" stroke="#7C3AED" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
          </svg>
        </div>
        <div>
          <p className="text-xs text-gray-400 mb-0.5">Total Client</p>
          <p className="text-2xl font-bold text-gray-900 leading-none">{totalClient.count}</p>
          <p className="text-xs text-green-600 mt-1">
            + {totalClient.inactive} inactive{' '}
            <span className="text-red-500">({totalClient.inactivePercent})</span>
          </p>
        </div>
      </div>

      {/* Stat cards — always show grid, zero out values when no data */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {subscriptionStats.map((stat) => (
          <StatCard key={stat.label} {...stat} empty={!hasData} />
        ))}
      </div>
    </div>
  )
}
