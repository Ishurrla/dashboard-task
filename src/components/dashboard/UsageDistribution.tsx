import EmptyState from '../ui/EmptyState'
import { usageDistributionData } from '../../data/mockData'

interface UsageDistributionProps {
  hasData: boolean
}

export default function UsageDistribution({ hasData }: UsageDistributionProps) {
  return (
    <div className="border border-[#D0D5DD] rounded-xl mt-2 overflow-hidden">
      <h2 className="text-sm font-bold text-gray-900 px-5 py-4 border-b border-[#D0D5DD]">Usage Distribution</h2>

      {hasData ? (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#D0D5DD]">
                <th className="text-left text-gray-400 font-normal py-3 px-5">Module</th>
                <th className="text-left text-gray-400 font-normal py-3 px-5">
                  Active Client Using Module
                </th>
                <th className="text-left text-gray-400 font-normal py-3 px-5">
                  Total Active client
                </th>
                <th className="text-left text-gray-400 font-normal py-3 px-5">
                  Adoption Rate
                </th>
              </tr>
            </thead>
            <tbody>
              {usageDistributionData.map((row) => (
                <tr key={row.module} className="border-b border-[#D0D5DD] last:border-0">
                  <td className="py-4 px-5 text-gray-800 font-medium">{row.module}</td>
                  <td className="py-4 px-5 text-gray-600">{row.activeUsing.toLocaleString()}</td>
                  <td className="py-4 px-5 text-gray-600">{row.totalActive.toLocaleString()}</td>
                  <td className="py-4 px-5 text-gray-600">{row.adoptionRate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <EmptyState />
      )}
    </div>
  )
}
