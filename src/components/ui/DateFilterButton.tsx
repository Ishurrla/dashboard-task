import { Menu } from '@mantine/core'
import { IconCalendar, IconCheck } from '@tabler/icons-react'
import { useState } from 'react'

const periods = [
  'Last 3 Months',
  'Last 6 Months',
  'This Year',
  'Last Year',
]

interface DateFilterButtonProps {
  value?: string
  onChange?: (value: string) => void
}

export default function DateFilterButton({
  value = 'Last 6 Months',
  onChange,
}: DateFilterButtonProps) {
  const [selected, setSelected] = useState(value)

  function handleSelect(period: string) {
    setSelected(period)
    onChange?.(period)
  }

  return (
    <Menu shadow="md" width={160} position="bottom-end">
      <Menu.Target>
        <button
          type="button"
          className="flex items-center gap-1.5 border border-gray-200 rounded-full px-3 py-1.5 hover:bg-gray-50 transition-colors shrink-0"
        >
          {/* Mobile: orange calendar icon only */}
          <IconCalendar size={14} className="text-orange-500 shrink-0 sm:hidden" />

          {/* Tablet+: "Date:" label + selected + calendar icon in #344054 */}
          <span className="hidden sm:flex items-center gap-1.5 text-xs">
            <span className="text-[#344054] font-medium">Date:</span>
            <span className="text-orange-500 font-medium">{selected}</span>
            <IconCalendar size={14} className="shrink-0" style={{ color: '#344054' }} />
          </span>
        </button>
      </Menu.Target>

      <Menu.Dropdown>
        {periods.map((period) => (
          <Menu.Item
            key={period}
            onClick={() => handleSelect(period)}
            rightSection={
              selected === period ? (
                <IconCheck size={12} className="text-orange-500" />
              ) : null
            }
            styles={{
              item: {
                fontSize: 12,
                color: selected === period ? '#F97316' : undefined,
              },
            }}
          >
            {period}
          </Menu.Item>
        ))}
      </Menu.Dropdown>
    </Menu>
  )
}
