import { Badge } from '@mantine/core'
import { IconMenu2 } from '@tabler/icons-react'
import companyLogo from '../../assets/Company Logo-paysteroid.svg'
import iconNotification from '../../assets/icon-notification.svg'
import iconSearch from '../../assets/icon-search.svg'
import profileIcon from '../../assets/Icon-top3.svg'
interface TopBarProps {
  onMenuClick: () => void
}

export default function TopBar({ onMenuClick }: TopBarProps) {
  return (
    <div className="flex items-center justify-between px-4 md:px-6 py-3 bg-white border-b border-gray-200">
      {/* Left — mobile menu + client info */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          aria-label="Open menu"
          className="lg:hidden text-gray-500 hover:text-gray-700"
          onClick={onMenuClick}
        >
          <IconMenu2 size={20} />
        </button>

        <div className="flex items-center gap-2">
          <img src={companyLogo} alt="Paysteriod logo" className="w-6 h-6 object-contain" />
          <span className="text-sm font-satoshi font-semibold text-gray-400">SBSC LLC</span>
          <Badge
            size="sm"
            variant="light"
            color="orange"
            className="hidden sm:inline-flex font-satoshi"
            style={{ backgroundColor: '#FFF1F3', color: '#C01048' }}
          >
            Premium Subscription
          </Badge>
        </div>
      </div>

      {/* Right — actions */}
      <div className="flex items-center gap-2">
        <button type="button" aria-label="Notifications">
          <img src={iconNotification} alt="" aria-hidden="true" className="w-10.75 h-10.75" />
        </button>
        <button type="button" aria-label="Search">
          <img src={iconSearch} alt="" aria-hidden="true" className="w-10.75 h-10.75" />
        </button>
        <img src={profileIcon} alt="User profile" className="w-10.75 h-10.75 object-contain" />
      </div>
    </div>
  )
}