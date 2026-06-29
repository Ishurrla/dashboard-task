import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getClientDashboard, getClientList, getClient, toggleClientStatus, type ClientDateFilter, type ClientListParams } from '../api/clientManagement'

export function useClientDashboard(dateFilter?: ClientDateFilter) {
  return useQuery({
    queryKey: ['client-dashboard', dateFilter],
    queryFn: () => getClientDashboard({ date_filter: dateFilter }),
  })
}

export function useClientList(params: ClientListParams) {
  return useQuery({
    queryKey: ['client-list', params],
    queryFn: () => getClientList(params),
  })
}

export function useClient(id: number) {
  return useQuery({
    queryKey: ['client', id],
    queryFn: () => getClient(id),
    enabled: !!id,
  })
}

export function useToggleClientStatus(id: number) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (status: 'Active' | 'Inactive' | 'Suspended') =>
      toggleClientStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['client', id] })
      queryClient.invalidateQueries({ queryKey: ['client-list'] })
    },
  })
}