import { IconX } from '@tabler/icons-react'

interface ActionModalProps {
  type: 'confirm' | 'success'
  action: 'Activate' | 'Suspend' | 'Deactivate'
  isLoading?: boolean
  onConfirm?: () => void
  onClose: () => void
}

const confirmConfig = {
  Activate: {
    title: 'Activate Client ?',
    message: 'Are you sure you want to activate this client ? Kindly note that this action would grant the client access to the Paysteroid platform',
    confirmLabel: 'Yes, Activate',
  },
  Suspend: {
    title: 'Suspend Client ?',
    message: 'kindly note by "Resolve Complaints" you issued that customer complaints has been successfully resolved, therefore Complaint status should be updated.',
    confirmLabel: 'Yes, Suspend',
  },
  Deactivate: {
    title: 'Deactivate Client ?',
    message: 'Are you sure you want to deactivate this client ? Kindly note that action is temporary and therefore, the client access to Paysteroid would be temporarily restricted or revoked.',
    confirmLabel: 'Yes, Deactivate',
  },
}

const successConfig = {
  Activate: { title: 'Client Activated', message: 'Congratulation, you have successfully activated this client.' },
  Suspend: { title: 'Client Suspended', message: 'Congratulation, you have successfully suspended this client.' },
  Deactivate: { title: 'Client Deactivated', message: 'Congratulation, you have successfully deactivated this client.' },
}

export default function ActionModal({ type, action, isLoading, onConfirm, onClose }: ActionModalProps) {
  const config = type === 'confirm' ? confirmConfig[action] : successConfig[action]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-2xl p-8 w-full max-w-sm mx-4 relative text-center">
        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <IconX size={16} />
        </button>

        {/* Icon */}
        <div className="flex items-center justify-center mb-5">
          {type === 'success' ? (
            <div className="w-16 h-16 rounded-full bg-teal-500 flex items-center justify-center">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <path d="M5 14L11 20L23 8" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          ) : (
            <div className="relative w-20 h-20">
              <div className="absolute inset-0 rounded-full border-4 border-orange-200" />
              <div className="absolute inset-2 rounded-full border-4 border-orange-400 flex items-center justify-center">
                <span className="text-[#3E1C96] text-2xl font-bold">!</span>
              </div>
            </div>
          )}
        </div>

        <h2 className="text-base font-bold text-orange-500 mb-3">{config.title}</h2>
        <p className="text-sm text-gray-600 mb-6 leading-relaxed">{config.message}</p>

        {type === 'confirm' ? (
          <div className="flex flex-col gap-3">
            <button
              onClick={onConfirm}
              disabled={isLoading}
              className="w-full bg-[#3E1C96] text-white text-sm py-3 rounded-xl hover:bg-purple-900 transition-colors disabled:opacity-60"
            >
              {isLoading ? 'Processing...' : confirmConfig[action].confirmLabel}
            </button>
            <button
              onClick={onClose}
              className="w-full border border-gray-200 text-sm py-3 rounded-xl hover:bg-gray-50 transition-colors"
            >
              No, Close
            </button>
          </div>
        ) : (
          <button
            onClick={onClose}
            className="w-full bg-[#3E1C96] text-white text-sm py-3 rounded-xl hover:bg-purple-900 transition-colors"
          >
            Close
          </button>
        )}
      </div>
    </div>
  )
}