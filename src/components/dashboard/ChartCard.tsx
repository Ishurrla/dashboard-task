import EmptyState from '../ui/EmptyState'
import DateFilterButton from '../ui/DateFilterButton'
import type { DateFilter } from '../../api/dashboard'

interface ChartCardProps {
  title: string
  subtitle?: string
  hasData: boolean
  headerBorder?: boolean
  children: React.ReactNode
  dateFilter: DateFilter
  onDateFilterChange: (value: DateFilter) => void
}

export default function ChartCard({ title, subtitle, hasData, headerBorder, children, dateFilter, onDateFilterChange }: ChartCardProps) {
  return (
    <div className="border border-[#D0D5DD] rounded-xl p-5 min-w-0 overflow-hidden">
      <div className={`flex items-start justify-between mb-4 ${headerBorder ? 'pb-4 border-b border-[#EAECF0]' : ''}`}>
        <div>
          <h3 className="text-sm font-bold text-gray-900">{title}</h3>
          {subtitle && <p className="text-xs text-gray-400 mt-0.5">{subtitle}</p>}
        </div>
        <DateFilterButton value={dateFilter} onChange={onDateFilterChange} />
      </div>

      {hasData ? children : <EmptyState />}
    </div>
  )
}
