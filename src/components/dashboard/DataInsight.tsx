import { useState } from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import EmptyState from '../ui/EmptyState'
import { mrrData, churnRateData } from '../../data/mockData'
import DateFilterButton from '../ui/DateFilterButton'

const tabs = ['Monthly recurring revenue (MRR)', 'Churn rate'] as const
type Tab = typeof tabs[number]

interface DataInsightProps {
  hasData: boolean
}

export default function DataInsight({ hasData }: DataInsightProps) {
  const [activeTab, setActiveTab] = useState<Tab>('Monthly recurring revenue (MRR)')

  const chartData = activeTab === 'Monthly recurring revenue (MRR)' ? mrrData : churnRateData
  const yLabel = activeTab === 'Monthly recurring revenue (MRR)' ? 'MRR in Million Naira (₦)' : 'Churn Rate (%)'

  return (
    <div className="border border-[#D0D5DD] rounded-xl p-5">
      {/* Header */}
      <div className="flex items-start justify-between mb-5">
        <h2 className="text-base font-bold text-gray-900">Data Insight</h2>
        <DateFilterButton />
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-gray-100 mb-4 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={`text-xs pb-2 border-b-2 transition-colors whitespace-nowrap ${
              activeTab === tab
                ? 'border-orange-500 text-orange-500 font-medium'
                : 'border-transparent text-gray-400 hover:text-gray-600'
            }`}
          >
            <span className="sm:hidden">
              {tab === 'Monthly recurring revenue (MRR)' ? 'MRR' : 'Churn Rate'}
            </span>
            <span className="hidden sm:inline">{tab}</span>
          </button>
        ))}
      </div>

      {/* Chart or Empty */}
      {hasData ? (
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 5, right: 16, left: 0, bottom: 20 }}>
              <CartesianGrid strokeDasharray="4 4" stroke="#F3F4F6" vertical={false} />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 11, fill: '#9CA3AF' }}
                axisLine={false}
                tickLine={false}
                label={{
                  value: 'Year, 2025',
                  position: 'insideBottom',
                  offset: -10,
                  style: { fontSize: 11, fill: '#9CA3AF' },
                }}
              />
              <YAxis
                tick={{ fontSize: 11, fill: '#9CA3AF' }}
                axisLine={false}
                tickLine={false}
                label={{
                  value: yLabel,
                  angle: -90,
                  position: 'insideLeft',
                  style: { fontSize: 10, fill: '#9CA3AF' },
                  dx: 10,
                  dy: 60,
                }}
                width={50}
              />
              <Tooltip
                contentStyle={{
                  fontSize: 12,
                  borderRadius: 8,
                  border: '1px solid #E5E7EB',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                }}
              />
              <Line
                type="linear"
                dataKey="value"
                stroke="#E8622A"
                strokeWidth={2}
                dot={{ r: 4, fill: '#E8622A', strokeWidth: 0 }}
                activeDot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <EmptyState />
      )}
    </div>
  )
}
