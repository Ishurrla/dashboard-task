import {
  PieChart, Pie, Tooltip, ResponsiveContainer,
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
} from 'recharts'
import ClientDateFilterButton from '../ui/ClientDateFilterButton'
import type { ClientDateFilter } from '../../api/clientManagement'

interface RegionItem {
  country: string
  count: number
}

interface MonthlyItem {
  label: string
  active: number
  expired: number
  inactive: number
}

interface SubscriptionData {
  year: number
  active_subscribers: number
  expired_subscribers: number
  inactive_subscribers: number
  monthly_data: MonthlyItem[]
}

interface ClientDistributionProps {
  data?: {
    clients_by_region: RegionItem[]
    clients_by_subscription: SubscriptionData
  }
  isLoading: boolean
  dateFilter: ClientDateFilter
  onDateFilterChange: (value: ClientDateFilter) => void
}

const REGION_COLORS = ['#22C55E', '#EAB308', '#EF4444', '#3B82F6', '#8B5CF6']
const REGION_DOT_CLASSES = ['bg-green-500', 'bg-yellow-400', 'bg-red-500', 'bg-blue-500', 'bg-violet-500']

const axisStyle = { fontSize: 10, fill: '#9CA3AF' }
const tooltipStyle = {
  fontSize: 11,
  borderRadius: 8,
  border: '1px solid #E5E7EB',
  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
}

export default function ClientDistribution({ data, isLoading, dateFilter, onDateFilterChange }: ClientDistributionProps) {
  if (isLoading) {
    return <div className="h-64 animate-pulse bg-gray-100 rounded-xl" />
  }

  const regionData = (data?.clients_by_region ?? []).map((r, i) => ({
    ...r,
    fill: REGION_COLORS[i % REGION_COLORS.length],
  }))
  const totalRegion = regionData.reduce((sum, r) => sum + r.count, 0)

  const subscriptionData = data?.clients_by_subscription
  const topCount = subscriptionData?.active_subscribers ?? 0

  const chartData = (subscriptionData?.monthly_data ?? []).map(item => ({
    month: item.label.slice(0, 3),
    active: item.active,
    expired: item.expired,
    inactive: item.inactive,
  }))

  return (
    <div>
      {/* Section header */}
      <div className="flex items-start justify-between mb-5 pb-4 border-b border-[#EAECF0]">
        <div>
          <h2 className="text-base font-bold text-gray-900">
            <span className="text-orange-500">Clients</span> by Plan and Region Distribution
          </h2>
          <p className="text-xs text-gray-400 mt-0.5">
            A graphical breakdown of clients by subscription plan and geographic region.
          </p>
        </div>
        <ClientDateFilterButton value={dateFilter} onChange={onDateFilterChange} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {/* Clients by Region */}
        <div className="border border-[#D0D5DD] rounded-xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-6 h-6 rounded bg-purple-100 flex items-center justify-center shrink-0">
              <div className="w-3 h-3 rounded-sm bg-purple-400" />
            </div>
            <h3 className="text-sm font-semibold text-gray-900">Clients by Region</h3>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            {/* Legend */}
            <div className="flex flex-row flex-wrap gap-x-4 gap-y-2 sm:flex-col sm:gap-4 shrink-0 sm:min-w-22.5">
              {regionData.map((region, i) => (
                <div key={region.country} className="flex items-start gap-1.5">
                  <div className={`w-2 h-2 rounded-full shrink-0 mt-1 ${REGION_DOT_CLASSES[i % REGION_DOT_CLASSES.length]}`} />
                  <div>
                    <p className="text-xs text-gray-500">{region.country}</p>
                    <p className="text-lg font-bold text-gray-900 leading-tight">{region.count.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Pie chart */}
            <div className="flex-1 min-h-0">
              {regionData.length > 0 ? (
                <ResponsiveContainer width="100%" height={176}>
                  <PieChart margin={{ top: 16, right: 16, bottom: 16, left: 16 }}>
                    <Pie
                      data={regionData}
                      dataKey="count"
                      nameKey="country"
                      cx="50%"
                      cy="50%"
                      outerRadius="38%"
                      label={({ percent }) => percent == null ? '' : `${Math.round(percent * 100)}%`}
                      labelLine={false}
                    />
                    <Tooltip
                      contentStyle={tooltipStyle}
                      formatter={(value, name) => [value, name]}
                    />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex items-center justify-center h-full text-xs text-gray-400">
                  No region data
                </div>
              )}
            </div>
          </div>

          {regionData.length > 0 && (
            <p className="text-xs text-gray-400 mt-2 text-center">
              Total: {totalRegion.toLocaleString()} clients
            </p>
          )}
        </div>

        {/* Clients by Subscription */}
        <div className="border border-[#D0D5DD] rounded-xl p-5">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 rounded bg-orange-100 flex items-center justify-center shrink-0">
              <div className="w-3 h-3 rounded-sm bg-orange-400" />
            </div>
            <h3 className="text-sm font-semibold text-gray-900">Clients by subscription status</h3>
          </div>

          <p className="text-xs text-gray-400 mb-0.5">
            Subscription plan with the highest subscriptions ~{' '}
            <span className="text-orange-500 font-medium">Flat plan</span>
          </p>
          <p className="text-2xl font-bold text-[#3E1C96] mb-3">
            {topCount.toLocaleString()}
          </p>

          <div className="flex flex-wrap gap-x-4 gap-y-1 mb-2 text-[10px]">
            <span className="flex items-center gap-1 text-gray-500"><span className="w-2 h-2 rounded-full bg-green-500 shrink-0" />Active subscribers</span>
            <span className="flex items-center gap-1 text-gray-500"><span className="w-2 h-2 rounded-full bg-yellow-400 shrink-0" />Trial Users</span>
            <span className="flex items-center gap-1 text-gray-500"><span className="w-2 h-2 rounded-full bg-red-500 shrink-0" />Expired subscribers</span>
          </div>
          <div className="h-44 min-h-0">
            <ResponsiveContainer width="100%" height={176}>
              <AreaChart data={chartData} margin={{ top: 5, right: 5, left: 10, bottom: 20 }}>
                <defs>
                  <linearGradient id="colorActive" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22C55E" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#22C55E" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorInactive" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#EAB308" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#EAB308" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorExpired" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#EF4444" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#EF4444" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="4 4" stroke="#F3F4F6" vertical={false} />
                <XAxis
                  dataKey="month"
                  tick={axisStyle}
                  axisLine={false}
                  tickLine={false}
                  label={{ value: 'Subscription Plan', position: 'insideBottom', offset: -10, style: { fontSize: 10, fill: '#9CA3AF' } }}
                />
                <YAxis
                  tick={axisStyle}
                  axisLine={false}
                  tickLine={false}
                  label={{ value: 'NO OF SUBSCRIPTIONS', angle: -90, position: 'insideLeft', style: { fontSize: 9, fill: '#9CA3AF' }, dx: -5, dy: 70 }}
                  width={50}
                />
                <Tooltip contentStyle={tooltipStyle} />
<Area type="monotone" dataKey="active" name="Active subscribers" stroke="#22C55E" strokeWidth={1.5} fill="url(#colorActive)" dot={false} />
                <Area type="monotone" dataKey="inactive" name="Trial Users" stroke="#EAB308" strokeWidth={1.5} fill="url(#colorInactive)" dot={false} />
                <Area type="monotone" dataKey="expired" name="Expired subscribers" stroke="#EF4444" strokeWidth={1.5} fill="url(#colorExpired)" dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  )
}
