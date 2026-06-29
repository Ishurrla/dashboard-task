import { useState, type SetStateAction } from 'react'
import { useClientDashboard, useClientList } from '../hooks/useClientManagement'
import type { ClientDateFilter } from '../api/clientManagement'
import ClientStatCards from '../components/clientManagement/ClientStatCards'
import ClientDistribution from '../components/clientManagement/ClientDistribution'
import ClientTable from '../components/clientManagement/ClientTable'

export default function ClientManagement() {
  const [dateFilter, setDateFilter] = useState<ClientDateFilter>('This Month')
  const [page, setPage] = useState(1)
  const [status, setStatus] = useState<'Active' | 'Inactive' | ''>('')
  const [search, setSearch] = useState('')
  const limit = 10

  const { data: dashboardData, isLoading: dashboardLoading } = useClientDashboard(dateFilter)
  const { data: clientList, isLoading: listLoading } = useClientList({
    page,
    limit,
    status: status || undefined,
    search_param: search || undefined,
  })

  return (
    <div className="flex flex-col gap-4 max-w-7xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <ClientStatCards data={dashboardData} isLoading={dashboardLoading} dateFilter={dateFilter} onDateFilterChange={setDateFilter} />
      </div>

      {/* Charts */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <ClientDistribution data={dashboardData} isLoading={dashboardLoading} dateFilter={dateFilter} onDateFilterChange={setDateFilter} />
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <ClientTable
          data={clientList ?? []}
          isLoading={listLoading}
          page={page}
          limit={limit}
          status={status}
          search={search}
          onPageChange={setPage}
          onStatusChange={(s: '' | 'Active' | 'Inactive') => { setStatus(s); setPage(1) }}
          onSearchChange={(s: SetStateAction<string>) => { setSearch(s); setPage(1) }}
        />
      </div>
    </div>
  )
}