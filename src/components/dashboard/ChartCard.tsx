import EmptyState from '../ui/EmptyState'
import DateFilterButton from '../ui/DateFilterButton'

interface ChartCardProps {
  title: string
  subtitle?: string
  hasData: boolean
  headerBorder?: boolean
  children: React.ReactNode
}

export default function ChartCard({ title, subtitle, hasData, headerBorder, children }: ChartCardProps) {
  return (
    <div className="border border-[#D0D5DD] rounded-xl p-5">
      <div className={`flex items-start justify-between mb-4 ${headerBorder ? 'pb-4 border-b border-[#EAECF0]' : ''}`}>
        <div>
          <h3 className="text-sm font-bold text-gray-900">{title}</h3>
          {subtitle && <p className="text-xs text-gray-400 mt-0.5">{subtitle}</p>}
        </div>
        <DateFilterButton />
      </div>

      {hasData ? children : <EmptyState />}
    </div>
  )
}
