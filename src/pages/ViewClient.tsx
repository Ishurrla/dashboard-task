import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { IconChevronLeft, IconChevronDown } from '@tabler/icons-react'
import { useClient, useToggleClientStatus } from '../hooks/useClientManagement'
import ActionModal from '../components/clientManagement/ActionModal'

type TabType = 'basic' | 'subscription' | 'usage' | 'payroll'
type ActionType = 'Activate' | 'Suspend' | 'Deactivate' | null

const tabs: { key: TabType; label: string }[] = [
  { key: 'basic', label: 'Basic Details' },
  { key: 'subscription', label: 'Subscription Details' },
  { key: 'usage', label: 'Usage' },
  { key: 'payroll', label: 'Payroll Activity' },
]

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-GB', {
    day: 'numeric', month: 'short', year: 'numeric',
  })
}

export default function ViewClient() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const clientId = Number(id)

  const { data, isLoading } = useClient(clientId)
  const toggleStatus = useToggleClientStatus(clientId)

  const [activeTab, setActiveTab] = useState<TabType>('basic')
  const [showActionMenu, setShowActionMenu] = useState(false)
  const [pendingAction, setPendingAction] = useState<ActionType>(null)
  const [showSuccess, setShowSuccess] = useState(false)
  const [completedAction, setCompletedAction] = useState<ActionType>(null)

  const tenant = data?.tenant
  const activity = data?.activity_summary
  const subscription = tenant?.current_active_subscription

  function handleAction(action: ActionType) {
    setPendingAction(action)
    setShowActionMenu(false)
  }

  function handleConfirm() {
    if (!pendingAction) return
    const statusMap: Record<string, 'Active' | 'Inactive' | 'Suspended'> = {
      Activate: 'Active',
      Deactivate: 'Inactive',
      Suspend: 'Suspended',
    }
    toggleStatus.mutate(statusMap[pendingAction], {
      onSuccess: () => {
        setCompletedAction(pendingAction)
        setPendingAction(null)
        setShowSuccess(true)
      },
    })
  }

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-20" />
          <div className="h-8 bg-gray-200 rounded w-48" />
          <div className="bg-white rounded-2xl p-6 space-y-4">
            {(['f1','f2','f3','f4','f5','f6','f7','f8'] as const).map((id) => (
              <div key={id} className="h-4 bg-gray-100 rounded w-full" />
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto flex flex-col gap-4">
      <div className="bg-white border-b border-gray-200 px-6 pt-4 pb-0 -mx-4 md:-mx-6 -mt-4 md:-mt-6">
        {/* Back button row */}
        <div className="border-b border-gray-200 -mx-6 px-6 pb-3 mb-4">
          <button
            type="button"
            onClick={() => navigate('/client-management')}
            className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700 transition-colors"
          >
            <IconChevronLeft size={14} />
            Back
          </button>
        </div>

        {/* Page header */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between mb-5">
          <div>
            <h1 className="text-xl font-bold text-gray-900">
              View <span className="text-[#3E1C96] underline italic">Client</span>
            </h1>
            <p className="text-xs text-gray-400 mt-1">View and manage the client's profile details</p>
          </div>

          {/* Take Action dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowActionMenu(prev => !prev)}
              className="flex items-center gap-2 bg-[#3E1C96] text-white text-sm font-medium px-5 py-2.5 rounded-full hover:bg-purple-900 transition-colors whitespace-nowrap"
            >
              Take Action
              <IconChevronDown size={15} />
            </button>

            {showActionMenu && (
              <>
                <button
                  type="button"
                  aria-label="Close menu"
                  className="fixed inset-0 z-10 w-full cursor-default"
                  onClick={() => setShowActionMenu(false)}
                />
                <div className="absolute right-0 top-10 z-20 bg-white border border-gray-100 rounded-xl shadow-lg py-1 min-w-40">
                  {(['Activate', 'Suspend', 'Deactivate'] as ActionType[]).map((action) => (
                    <button
                      key={action}
                      type="button"
                      onClick={() => handleAction(action)}
                      className="w-full text-left text-sm text-gray-700 px-4 py-2.5 hover:bg-gray-50 transition-colors"
                    >
                      {action} Client
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-6 border-b border-gray-200 overflow-x-auto [&::-webkit-scrollbar]:hidden scrollbar-none [-ms-overflow-style:none]">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key)}
              className={`text-sm pb-3 border-b-2 transition-colors whitespace-nowrap ${
                activeTab === tab.key
                  ? 'border-orange-500 text-orange-500 font-medium'
                  : 'border-transparent text-gray-400 hover:text-gray-600'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab content */}
      {activeTab === 'basic' && tenant && (
        <div className="flex flex-col gap-4">
          {/* Basic Details card */}
          <div className="bg-white border border-gray-100 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-6 h-6 rounded bg-orange-100 flex items-center justify-center">
                <div className="w-2 h-3 bg-orange-500 rounded-sm" />
              </div>
              <h2 className="text-sm font-semibold text-gray-900">Basic Details</h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-5">
              {[
                { label: 'Company Name', value: tenant.name },
                { label: 'Country', value: tenant.country ?? '—' },
                { label: 'Company Size', value: tenant.no_of_employee ? `${tenant.no_of_employee} employees` : '—' },
                { label: 'Industry', value: tenant.industry ?? '—' },
                { label: 'Date Onboarded', value: formatDate(tenant.created_at) },
                { label: 'Current Subscription status', value: subscription?.status ?? '—' },
                { label: 'Billing Cycle', value: subscription?.billing_type ?? '—' },
                { label: 'Subscription Fee', value: subscription ? `NGN ${Number(subscription.total_amount).toLocaleString()}` : '—' },
                { label: 'Start Date', value: subscription ? formatDate(subscription.billing_start) : '—' },
                { label: 'End Date', value: subscription ? formatDate(subscription.billing_end) : '—' },
                { label: 'Paid Via', value: tenant.payment_platform ?? '—' },
                {
                  label: 'Status', value: tenant.status,
                  badge: true,
                },
              ].map((field) => (
                <div key={field.label}>
                  <p className="text-xs text-gray-400 mb-1">{field.label}</p>
                  {field.badge ? (
                    <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium border ${
                      field.value === 'Active'
                        ? 'bg-green-50 text-green-600 border-green-200'
                        : 'bg-red-50 text-red-500 border-red-200'
                    }`}>
                      {field.value}
                    </span>
                  ) : (
                    <p className="text-sm font-medium text-gray-900">{field.value}</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Activity Summary card */}
          {activity && (
            <div className="bg-white border border-gray-100 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-6 h-6 rounded bg-orange-100 flex items-center justify-center">
                  <div className="w-2 h-3 bg-orange-500 rounded-sm" />
                </div>
                <h2 className="text-sm font-semibold text-gray-900">Activity Summary</h2>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-5 gap-x-6 gap-y-5">
                {[
                  { label: 'Last Login', value: '—' },
                  { label: 'Payroll Runs', value: `${activity.payroll_runs} / ${activity.total_payroll_runs} this month` },
                  { label: 'Last Billing Date', value: formatDate(activity.last_billing_date) },
                  { label: 'Next Billing Date', value: formatDate(activity.next_billing_date) },
                  { label: 'Last User', value: '—' },
                ].map((field) => (
                  <div key={field.label}>
                    <p className="text-xs text-gray-400 mb-1">{field.label}</p>
                    <p className="text-sm font-medium text-gray-900">{field.value}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab !== 'basic' && (
        <div className="bg-white border border-gray-100 rounded-2xl p-6 flex items-center justify-center h-40">
          <p className="text-sm text-gray-400">Coming soon</p>
        </div>
      )}

      {/* Action modals */}
      {pendingAction && (
        <ActionModal
          type="confirm"
          action={pendingAction}
          isLoading={toggleStatus.isPending}
          onConfirm={handleConfirm}
          onClose={() => setPendingAction(null)}
        />
      )}

      {showSuccess && completedAction && (
        <ActionModal
          type="success"
          action={completedAction}
          onClose={() => setShowSuccess(false)}
        />
      )}
    </div>
  )
}