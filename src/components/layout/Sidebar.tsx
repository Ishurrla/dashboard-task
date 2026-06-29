import { NavLink as RouterNavLink } from 'react-router-dom'
import logo from '../../assets/PaySteriod Logo.svg'
import { IconBell, IconChevronDown, IconClipboardList, IconCreditCard, IconFileText, IconHeadset, IconLayoutDashboard, IconLock, IconUserCog, IconUsers } from '@tabler/icons-react'

const navItems = [
  { label: 'Dashboard', icon: IconLayoutDashboard, path: '/' },
  { label: 'Client Management', icon: IconUsers, path: '/client-management' },
  { label: 'Subscription Management', icon: IconCreditCard, path: '/subscription-management', hasChevron: true },
  { label: 'User Management', icon: IconUserCog, path: '/user-management' },
  { label: 'Support', icon: IconHeadset, path: '/support' },
  { label: 'Notification', icon: IconBell, path: '/notification' },
  { label: 'Report', icon: IconFileText, path: '/report' },
  { label: 'Audit Trail', icon: IconClipboardList, path: '/audit-trail' },
]

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <button
          type="button"
          aria-label="Close menu"
          className="fixed inset-0 bg-black/50 z-20 lg:hidden w-full cursor-default"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 h-full w-56 z-30 flex flex-col
          bg-[#3E1C96] text-white font-inter
          transition-transform duration-300
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 lg:static lg:z-auto
        `}
      >
        {/* Logo */}
        <div className="flex items-center gap-2 px-5 py-5">
          <img src={logo} alt="Paysteriod logo" className="w-8 h-8 object-contain" />
          <span className="font-satoshi font-bold text-base tracking-wide">Paysteriod</span>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-2 overflow-y-auto [&::-webkit-scrollbar]:hidden scrollbar-none [-ms-overflow-style:none]">
          <p className="text-white/50 text-[10px] px-3 mb-3 uppercase tracking-widest font-medium">
            Main Menu
          </p>

          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <RouterNavLink
                key={item.label}
                to={item.path}
                className={({ isActive }) =>
                  `w-full flex items-center justify-between gap-3 px-3 py-3 rounded-lg mb-1 text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-[#E8622A] text-white'
                      : 'text-white/80 hover:bg-white/10 hover:text-white'
                  }`
                }
              >
                <span className="flex items-center gap-3">
                  <Icon size={16} className="shrink-0" />
                  {item.label}
                </span>
                {item.hasChevron && (
                  <IconChevronDown size={14} className="shrink-0 text-white/60" />
                )}
              </RouterNavLink>
            )
          })}
        </nav>

        {/* Logout */}
        <div className="px-3 pb-6">
          <button
            type="button"
            className="w-full flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium text-white/80 hover:bg-white/10 hover:text-white transition-colors"
          >
            <IconLock size={16} className="shrink-0" />
            Log Out
          </button>
        </div>
      </aside>
    </>
  )
}
