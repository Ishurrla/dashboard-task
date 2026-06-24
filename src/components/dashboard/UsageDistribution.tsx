import EmptyState from '../ui/EmptyState'

interface UsageDistributionItem {
  module: string
  active_client_using_module: number
  total_active_client: number
  adoption_rate: number
}

interface UsageDistributionProps {
  data?: UsageDistributionItem[]
}

export default function UsageDistribution({ data }: UsageDistributionProps) {
  const isEmpty = !data || data.length === 0 || (data.length > 0 && data.every(item => item.active_client_using_module === 0))

  return (
    <div className="border border-[#D0D5DD] rounded-xl mt-2 overflow-hidden">
      <h2 className="text-sm font-bold text-gray-900 px-5 py-4 border-b border-[#D0D5DD]">
        Usage Distribution
      </h2>

      {isEmpty ? (
        <EmptyState />
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#D0D5DD]">
                <th className="text-left text-gray-400 font-normal py-3 px-5">Module</th>
                <th className="text-left text-gray-400 font-normal py-3 px-5">
                  Active Client Using Module
                </th>
                <th className="text-left text-gray-400 font-normal py-3 px-5">
                  Total Active Client
                </th>
                <th className="text-left text-gray-400 font-normal py-3 px-5">
                  Adoption Rate
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((row) => (
                <tr key={row.module} className="border-b border-[#D0D5DD] last:border-0">
                  <td className="py-4 px-5 text-gray-800 font-medium">{row.module}</td>
                  <td className="py-4 px-5 text-gray-600">
                    {row.active_client_using_module.toLocaleString()}
                  </td>
                  <td className="py-4 px-5 text-gray-600">
                    {row.total_active_client.toLocaleString()}
                  </td>
                  <td className="py-4 px-5 text-gray-600">{row.adoption_rate}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}