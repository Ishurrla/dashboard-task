import { IconCalendar } from '@tabler/icons-react'
import EmptyState from '../ui/EmptyState'

interface ChartCardProps {
  title: string
  subtitle?: string
  hasData: boolean
  children: React.ReactNode
}

export default function ChartCard({ title, subtitle, hasData, children }: ChartCardProps) {
  return (
    <div className="border border-[#D0D5DD] rounded-xl p-5">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-sm font-bold text-gray-900">{title}</h3>
          {subtitle && <p className="text-xs text-gray-400 mt-0.5">{subtitle}</p>}
        </div>
        <button
          type="button"
          className="flex items-center gap-1.5 text-xs text-gray-500 border border-gray-200 rounded-full px-3 py-1.5 hover:bg-gray-50 transition-colors whitespace-nowrap"
        >
          Date: <span className="text-orange-500 font-medium">Last 6 Month</span>
          <IconCalendar size={13} className="text-gray-400" />
        </button>
      </div>

      {hasData ? children : <EmptyState />}
    </div>
  )
}
