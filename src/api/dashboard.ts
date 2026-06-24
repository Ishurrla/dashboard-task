import api from '../lib/api'

export type DateFilter =
  | 'today'
  | '3 days'
  | '7 days'
  | '14 days'
  | 'this month'
  | '30 days'
  | '3 months'
  | 'this year'
  | 'custom date'

export interface DashboardParams {
  date_filter: DateFilter
  start_date?: string
  end_date?: string
}

export async function getDashboard(params: DashboardParams) {
  const response = await api.get('superadmin/dashboard', { params })
  return response.data.data
}