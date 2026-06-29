import { IconSearch, IconChevronLeft, IconChevronRight, IconUpload, IconArrowUpRight } from '@tabler/icons-react'
import { useNavigate } from 'react-router-dom'

interface Subscription {
  billing_end: string
  user_sub: { name: string }
}

interface Client {
  id: number
  name: string
  country: string | null
  created_at: string
  users_count: number
  total_users: number
  last_payroll_run: string | null
  status: string
  current_active_subscription: Subscription | null
}

interface ClientTableProps {
  data: Client[]
  isLoading: boolean
  page: number
  limit: number
  status: 'Active' | 'Inactive' | ''
  search: string
  onPageChange: (page: number) => void
  onStatusChange: (status: 'Active' | 'Inactive' | '') => void
  onSearchChange: (search: string) => void
}

function formatDate(dateStr: string) {
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}

export default function ClientTable({
  data,
  isLoading,
  page,
  limit,
  status,
  search,
  onPageChange,
  onStatusChange,
  onSearchChange,
}: ClientTableProps) {
  const navigate = useNavigate()
  const isLastPage = data.length < limit

  function renderRows() {
    if (isLoading) {
      return (['r1', 'r2', 'r3', 'r4', 'r5', 'r6', 'r7', 'r8', 'r9', 'r10'] as const).slice(0, limit).map((rowId) => (
        <tr key={rowId} className="border-b border-[#EAECF0]">
          {(['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7'] as const).map((col) => (
            <td key={col} className="py-3 pr-4">
              <div className="h-3 bg-gray-100 rounded animate-pulse w-20" />
            </td>
          ))}
        </tr>
      ))
    }
    if (data.length === 0) {
      return (
        <tr>
          <td colSpan={7} className="py-10 text-center text-gray-400">
            No clients found
          </td>
        </tr>
      )
    }
    return data.map((client) => (
      <tr key={client.id} className="border-b border-[#EAECF0] last:border-0 hover:bg-gray-50 transition-colors">
        <td className="py-4 pr-4">
          <p className="font-semibold text-gray-900 text-sm">{client.name}</p>
          <p className="text-xs text-gray-400 mt-0.5">{client.country ?? '—'}</p>
        </td>
        <td className="py-4 pr-4 text-xs text-gray-600">{formatDate(client.created_at)}</td>
        <td className="py-4 pr-4 text-xs text-gray-600">
          {client.current_active_subscription
            ? formatDate(client.current_active_subscription.billing_end)
            : '—'}
        </td>
        <td className="py-4 pr-4 text-xs text-gray-600">
          {client.users_count} of {client.total_users}
        </td>
        <td className="py-4 pr-4 text-xs text-gray-600">
          {client.last_payroll_run ?? '—'}
        </td>
        <td className="py-4 pr-4">
          <span className={`px-2.5 py-1 rounded-full text-[11px] font-medium border ${
            client.status === 'Active'
              ? 'border-green-200 bg-green-50 text-green-600'
              : 'border-red-200 bg-red-50 text-red-500'
          }`}>
            {client.status}
          </span>
        </td>
        <td className="py-4">
          <button
            type="button"
            aria-label={`View ${client.name}`}
            onClick={() => navigate(`/client-management/${client.id}`)}
            className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center hover:bg-purple-100 transition-colors"
          >
            <IconArrowUpRight size={14} className="text-[#3E1C96]" />
          </button>
        </td>
      </tr>
    ))
  }

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-4 mb-4 border-b border-[#EAECF0]">
        <div>
          <h2 className="text-base font-bold text-gray-900">
            <span className="text-orange-500">Clients</span> List
          </h2>
          <p className="text-xs text-gray-400 mt-0.5">Track and manage all clients organizations</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="flex items-center gap-1.5 text-xs border border-gray-200 rounded-lg px-3 py-1.5 hover:bg-gray-50 transition-colors text-gray-700"
          >
            Export
            <IconUpload size={13} className="text-gray-400" />
          </button>
          <button
            type="button"
            className="flex items-center gap-1.5 text-xs bg-[#3E1C96] text-white rounded-lg px-3 py-1.5 hover:bg-purple-900 transition-colors font-medium"
          >
            View All
            <IconArrowUpRight size={13} />
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        {/* Status tabs */}
        <div className="flex items-center gap-1">
          {(['', 'Active', 'Inactive'] as const).map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => onStatusChange(s)}
              className={`text-xs px-2.5 py-1 rounded-lg border transition-colors ${
                status === s
                  ? 'border-orange-200 bg-orange-50 text-orange-500 font-medium'
                  : 'border-gray-200 text-gray-500 hover:bg-gray-50'
              }`}
            >
              {s === '' ? 'Show All' : s}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-1.5 flex-1 min-w-36">
          <IconSearch size={13} className="text-gray-400 shrink-0" />
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="text-xs outline-none w-full bg-transparent placeholder-gray-400"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-150 text-xs">
          <thead>
            <tr className="border-b border-[#EAECF0]">
              <th className="text-left text-gray-400 font-normal py-3 pr-4">Company Name</th>
              <th className="text-left text-gray-400 font-normal py-3 pr-4">Start Date</th>
              <th className="text-left text-gray-400 font-normal py-3 pr-4">Next Billing Date</th>
              <th className="text-left text-gray-400 font-normal py-3 pr-4">
                Active Users<br />
                <span className="text-[10px]">(out of total employees)</span>
              </th>
              <th className="text-left text-gray-400 font-normal py-3 pr-4">Last Payroll</th>
              <th className="text-left text-gray-400 font-normal py-3 pr-4">Status</th>
              <th className="py-3" />
            </tr>
          </thead>
          <tbody>
            {renderRows()}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-[#EAECF0]">
        <p className="text-xs text-gray-400">Page {page}</p>
        <div className="flex items-center gap-2">
          <button
            aria-label="Previous page"
            type="button"
            onClick={() => onPageChange(page - 1)}
            disabled={page === 1}
            className="p-1.5 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <IconChevronLeft size={14} />
          </button>
          <span className="text-xs text-gray-600 px-2">{page}</span>
          <button
            aria-label="Next page"
            type="button"
            onClick={() => onPageChange(page + 1)}
            disabled={isLastPage}
            className="p-1.5 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <IconChevronRight size={14} />
          </button>
        </div>
      </div>
    </div>
  )
}
