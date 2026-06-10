import { NavLink } from '@mantine/core'
import logo from '../../assets/PaySteriod Logo.svg'
import {
  IconLayoutDashboard,
  IconUsers,
  IconCreditCard,
  IconUserCog,
  IconHeadset,
  IconBell,
  IconFileText,
  IconClipboardList,
  IconLogout,
} from '@tabler/icons-react'

const navItems = [
  { label: 'Dashboard', icon: IconLayoutDashboard },
  { label: 'Client Management', icon: IconUsers },
  { label: 'Subscription Management', icon: IconCreditCard, hasChevron: true },
  { label: 'User Management', icon: IconUserCog },
  { label: 'Support', icon: IconHeadset },
  { label: 'Notification', icon: IconBell },
  { label: 'Report', icon: IconFileText },
  { label: 'Audit Trail', icon: IconClipboardList },
]

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <button
          type="button"
          aria-label="Close menu"
          className="fixed inset-0 bg-black/50 z-20 lg:hidden w-full cursor-default"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full w-44 z-30 flex flex-col
          bg-[#3D1E8F] text-white
          transition-transform duration-300
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 lg:static lg:z-auto
        `}
      >
        {/* Logo */}
        <div className="flex items-center gap-2 px-4 py-5 border-b border-white/10">
          <img src={logo} alt="Paysteriod logo" className="w-8 h-8 object-contain" />
          <span className="font-satoshi font-semibold text-sm">Paysteriod</span>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 overflow-y-auto">
          <p className="text-white/50 text-[10px] px-4 mb-2 uppercase tracking-wider">
            Main Menu
          </p>
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = item.label === 'Dashboard'
            return (
              <NavLink
                key={item.label}
                label={item.label}
                leftSection={<Icon size={15} />}
                active={isActive}
                styles={{
                  root: {
                    color: 'white',
                    fontSize: '13px',
                    padding: '8px 16px',
                    borderRadius: 0,
                    backgroundColor: isActive ? '#F97316' : 'transparent',
                    '&:hover': {
                      backgroundColor: isActive ? '#F97316' : 'rgba(255,255,255,0.08)',
                    },
                  },
                  label: { color: 'white' },
                }}
              />
            )
          })}
        </nav>

        {/* Logout */}
        <div className="border-t border-white/10 p-4">
          <button className="flex items-center gap-2 text-white/70 text-sm hover:text-white transition-colors w-full">
            <IconLogout size={15} />
            Log Out
          </button>
        </div>
      </aside>
    </>
  )
}