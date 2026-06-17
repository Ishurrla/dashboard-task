interface StatCardProps {
  label: string
  value: string
  change: string
  trend: 'up' | 'down'
  empty?: boolean
}

function getEmptyValue(value: string): string {
  if (value.startsWith('₦')) return '₦0'
  if (value.includes('%')) return '0%'
  return '0'
}

function getEmptyChange(change: string, isUp: boolean): string {
  if (isUp) {
    return change
      .replace(/[\d.]+(?=%)/g, '0')
      .replace(/[\d.]+(?=k)/g, '0')
      .replace(/\+[\d.]+(?= )/g, '+0.0')
  }
  return change
    .replace(/[\d.]+(?=%)/g, '0')
    .replace(/-[\d.]+(?= )/g, '-0')
}

export default function StatCard({ label, value, change, trend, empty }: StatCardProps) {
  const isUp = trend === 'up'
  const displayValue = empty ? getEmptyValue(value) : value
  const displayChange = empty ? getEmptyChange(change, isUp) : change

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-3.5 flex flex-col gap-1.5 min-w-0">
      <p className="text-xs text-gray-400 truncate">{label}</p>
      <p className="text-lg font-bold text-[#3E1C96] truncate">{displayValue}</p>
      <div className={`flex items-center gap-1 text-xs font-medium ${isUp ? 'text-green-600' : 'text-red-500'}`}>
        {isUp ? (
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M6 9.5V2.5M6 2.5L2.5 6M6 2.5L9.5 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ) : (
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M6 2.5V9.5M6 9.5L2.5 6M6 9.5L9.5 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
        <span className="truncate">{displayChange}</span>
      </div>
    </div>
  )
}
