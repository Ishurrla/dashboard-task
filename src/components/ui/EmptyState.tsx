import noDataIcon from '../../assets/icon-no-data.svg'

interface EmptyStateProps {
  message?: string
}

export default function EmptyState({ message = 'Check back later' }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 gap-3">
      <img src={noDataIcon} alt="" aria-hidden="true" className="w-24 h-24" />
      <p className="text-base font-semibold text-gray-800">
        No <span className="text-orange-500 underline decoration-orange-500">Data</span>
      </p>
      <p className="text-sm text-gray-400">{message}</p>
    </div>
  )
}
