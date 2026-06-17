import { Badge } from '@mantine/core'
import { IconMenu2 } from '@tabler/icons-react'
import companyLogo from '../../assets/Company Logo-paysteroid.svg'
import iconNotification from '../../assets/icon-notification.svg'
import iconSearch from '../../assets/icon-search.svg'
import profileIcon from '../../assets/Icon-top3.svg'

interface TopBarProps {
  onMenuClick: () => void
  hasData: boolean
  onToggleData: () => void
}

export default function TopBar({ onMenuClick, hasData, onToggleData }: TopBarProps) {
  return (
    <div className="flex items-center justify-between px-3 md:px-6 py-3 bg-white border-b border-gray-200 min-w-0 gap-2">
      {/* Left */}
      <div className="flex items-center gap-2 min-w-0">
        <button
          type="button"
          aria-label="Open menu"
          className="lg:hidden text-gray-500 hover:text-gray-700 shrink-0"
          onClick={onMenuClick}
        >
          <IconMenu2 size={20} />
        </button>

        <div className="flex items-center gap-2 min-w-0">
          <img src={companyLogo} alt="Paysteriod logo" className="w-6 h-6 object-contain shrink-0" />
          <span className="text-sm font-satoshi font-semibold text-gray-400 truncate">SBSC LLC</span>
          <Badge
            size="sm"
            variant="light"
            color="orange"
            className="hidden sm:inline-flex font-satoshi shrink-0"
            style={{ backgroundColor: '#FFF1F3', color: '#C01048' }}
            >
            <span className="inline md:hidden">Premium</span>
            <span className="hidden md:inline">Premium Subscription</span>
          </Badge>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2 shrink-0">
        <button
          type="button"
          onClick={onToggleData}
          className="hidden sm:flex items-center gap-1.5 text-[11px] border border-gray-200 rounded-md px-2 py-1.5 hover:bg-gray-50 transition-colors shrink-0"
        >
          <span className={hasData ? 'text-green-600' : 'text-gray-400'}>●</span>
          {hasData ? 'Filled' : 'Empty'}
        </button>
        <button type="button" aria-label="Notifications">
          <img src={iconNotification} alt="" aria-hidden="true" className="w-8 h-8 object-contain" />
        </button>
        <button type="button" aria-label="Search">
          <img src={iconSearch} alt="" aria-hidden="true" className="w-8 h-8 object-contain" />
        </button>
        <img src={profileIcon} alt="User profile" className="w-8 h-8 object-contain" />
      </div>
    </div>
  )
}