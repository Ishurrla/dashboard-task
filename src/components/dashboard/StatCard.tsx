interface StatCardProps {
  label: string
  value: string
  change: string
  trend: 'up' | 'down'
  empty?: boolean
}

export default function StatCard({ label, value, change, trend, empty }: StatCardProps) {
  const isUp = trend === 'up'

  const displayValue = empty ? (value.startsWith('₦') ? '₦0' : value.includes('%') ? '0%' : '0') : value
  const displayChange = empty
    ? isUp
      ? change.replace(/[\d.]+(?=%)/g, '0').replace(/[\d.]+(?=k)/g, '0').replace(/\+[\d.]+(?= )/g, '+0.0')
      : change.replace(/[\d.]+(?=%)/g, '0').replace(/-[\d.]+(?= )/g, '-0')
    : change

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-3.5 flex flex-col gap-1.5 min-w-0">
      <p className="text-xs text-gray-400 truncate">{label}</p>
      <p className="text-lg font-bold text-[#1a1f5e] truncate">{displayValue}</p>
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
