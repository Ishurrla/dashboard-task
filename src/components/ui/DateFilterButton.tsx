import { Menu } from '@mantine/core'
import { IconCalendar, IconCheck } from '@tabler/icons-react'
import type { DateFilter } from '../../api/dashboard'

const periodOptions: { label: string; value: DateFilter }[] = [
  { label: 'Last 3 Months', value: '3 months' },
  { label: 'Last 6 Months', value: 'this month' },
  { label: 'This Year', value: 'this year' },
  { label: 'Last Year', value: 'custom date' },
]

interface DateFilterButtonProps {
  value?: DateFilter
  onChange?: (value: DateFilter) => void
}

export default function DateFilterButton({ value = '3 months', onChange = () => {} }: DateFilterButtonProps) {
  const selectedLabel = periodOptions.find(p => p.value === value)?.label ?? 'Last 6 Months'

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
            <IconCalendar size={14} className="shrink-0" style={{ color: '#344054' }} />
          </span>
        </button>
      </Menu.Target>

      <Menu.Dropdown>
        {periodOptions.map((period) => (
          <Menu.Item
            key={period.value}
            onClick={() => onChange(period.value)}
            rightSection={
              value === period.value ? (
                <IconCheck size={12} className="text-orange-500" />
              ) : null
            }
            styles={{
              item: {
                fontSize: 12,
                color: value === period.value ? '#F97316' : undefined,
              },
            }}
          >
            {period.label}
          </Menu.Item>
        ))}
      </Menu.Dropdown>
    </Menu>
  )
}