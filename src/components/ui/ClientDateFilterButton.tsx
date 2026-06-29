import { Menu } from '@mantine/core'
import { IconCalendar, IconCheck } from '@tabler/icons-react'
import type { ClientDateFilter } from '../../api/clientManagement'

const periodOptions: { label: string; value: ClientDateFilter }[] = [
  { label: 'Today', value: 'Today' },
  { label: 'This Month', value: 'This Month' },
  { label: 'Last Month', value: 'Last Month' },
  { label: 'This Year', value: 'This Year' },
  { label: 'All Time', value: 'All Time' },
]

interface ClientDateFilterButtonProps {
  value?: ClientDateFilter
  onChange?: (value: ClientDateFilter) => void
}

export default function ClientDateFilterButton({ value = 'This Month', onChange = () => {} }: ClientDateFilterButtonProps) {
  const selectedLabel = periodOptions.find(p => p.value === value)?.label ?? 'This Month'

  return (
    <Menu shadow="md" width={160} position="bottom-end">
      <Menu.Target>
        <button
          type="button"
          className="flex items-center gap-1.5 border border-gray-200 rounded-full px-3 py-1.5 hover:bg-gray-50 transition-colors shrink-0"
        >
          <IconCalendar size={14} className="text-orange-500 shrink-0 sm:hidden" />
          <span className="hidden sm:flex items-center gap-1.5 text-xs">
            <span className="text-[#344054] font-medium">Date:</span>
            <span className="text-orange-500 font-medium">{selectedLabel}</span>
            <IconCalendar size={14} className="shrink-0 text-[#344054]" />
          </span>
        </button>
      </Menu.Target>

      <Menu.Dropdown>
        {periodOptions.map((period) => (
          <Menu.Item
            key={period.value}
            onClick={() => onChange(period.value)}
            rightSection={value === period.value ? <IconCheck size={12} className="text-orange-500" /> : null}
            styles={{ item: { fontSize: 12, color: value === period.value ? '#F97316' : undefined } }}
          >
            {period.label}
          </Menu.Item>
        ))}
      </Menu.Dropdown>
    </Menu>
  )
}
