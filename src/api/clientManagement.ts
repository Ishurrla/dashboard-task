import api from '../lib/api'

export type ClientDateFilter =
  | 'Today'
  | 'Yesterday'
  | 'This Week'
  | 'Last Week'
  | 'This Month'
  | 'Last Month'
  | 'This Year'
  | 'Last Year'
  | 'All Time'
  | 'custom date'

export interface ClientDashboardParams {
  date_filter?: ClientDateFilter
  start_date?: string
  end_date?: string
}

export interface ClientListParams {
  page?: number
  limit?: number
  status?: 'Active' | 'Inactive' | ''
  search_param?: string
  date_filter?: ClientDateFilter
  sort_by?: string
}

export async function getClientDashboard(params: ClientDashboardParams = {}) {
  const response = await api.get('superadmin/clientmanagement/dashboard', { params })
  return response.data.data
}

export async function getClientList(params: ClientListParams = {}) {
  const response = await api.get('superadmin/clientmanagement/clients', { params })
  return response.data.data as any[]
}


export async function getClient(id: number) {
  const response = await api.get(`superadmin/clientmanagement/clients/${id}`)
  return response.data.data
}

export async function toggleClientStatus(id: number, status: 'Active' | 'Inactive' | 'Suspended') {
  const response = await api.put(
    `superadmin/clientmanagement/clients/${id}/toggle-status`,
    { status }
  )
  return response.data
}