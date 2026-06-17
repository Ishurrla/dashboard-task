import StatCard from './StatCard'
import { subscriptionStats, totalClient } from '../../data/mockData'
import DateFilterButton from '../ui/DateFilterButton'
import clientIcon from '../../assets/client-icon.svg'

interface SubscriptionOverviewProps {
  hasData: boolean
}

export default function SubscriptionOverview({ hasData }: SubscriptionOverviewProps) {
  return (
    <div className="mb-6">
      {/* Header */}
      <div className="flex items-start justify-between pb-4 mb-6 border-b border-[#EAECF0]">
        <div>
          <h2 className="text-base font-bold text-gray-900">Subscription Overview</h2>
          <p className="text-xs text-gray-400 mt-0.5">An insight into users subscription overtime</p>
        </div>
        <DateFilterButton />
      </div>

      {/* Total client summary */}
      <div className="flex items-center gap-4 mb-6">
        <img src={clientIcon} alt="" aria-hidden="true" className="w-10 h-10 shrink-0" />
        <div>
          <p className="text-xs text-gray-400 mb-0.5">Total Client</p>
          <p className="text-2xl font-bold leading-none text-[#3E1C96]">{totalClient.count}</p>
          <p className="text-xs text-green-600 mt-1">
            + {totalClient.inactive} inactive{' '}
            <span className="text-red-500">({totalClient.inactivePercent})</span>
          </p>
        </div>
      </div>

      {/* Stat cards — always show grid, zero out values when no data */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 text-[#3E1C96]">
        {subscriptionStats.map((stat) => (
          <StatCard key={stat.label} {...stat} empty={!hasData} />
        ))}
      </div>
    </div>
  )
}
