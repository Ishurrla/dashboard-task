import { useQuery } from '@tanstack/react-query'
import { getDashboard, type DateFilter } from '../api/dashboard'

export function useDashboard(dateFilter: DateFilter = '3 months') {
  return useQuery({
    queryKey: ['dashboard', dateFilter],
    queryFn: () => getDashboard({ date_filter: dateFilter }),
  })
}