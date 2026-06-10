import { useState } from 'react'
import Sidebar from './components/layout/Sidebar'
import { IconMenu2 } from '@tabler/icons-react'

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile header */}
        <div className="lg:hidden flex items-center px-4 py-3 bg-white border-b">
          <button aria-label="Open menu" onClick={() => setSidebarOpen(true)}>
            <IconMenu2 size={22} />
          </button>
        </div>

        <main className="flex-1 overflow-y-auto p-6">
          <p className="text-gray-400">Dashboard content goes here</p>
        </main>
      </div>
    </div>
  )
}