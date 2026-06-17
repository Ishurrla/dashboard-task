import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import EmptyState from '../ui/EmptyState'
import { productAdoptionData } from '../../data/mockData'
import DateFilterButton from '../ui/DateFilterButton'

interface ProductAdoptionProps {
  hasData: boolean
}

export default function ProductAdoption({ hasData }: ProductAdoptionProps) {
  return (
    <>
      {/* Header */}
      <div className="flex items-start justify-between pb-4 mb-6 border-b border-[#EAECF0]">
        <div>
          <h2 className="text-base font-bold text-gray-900">Product Adoption</h2>
          <p className="text-xs text-gray-400 mt-0.5">
            An insight into product feature adoption rate
          </p>
        </div>
        <DateFilterButton />
      </div>

      {/* Chart or Empty */}
      {hasData ? (
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={productAdoptionData}
              margin={{ top: 5, right: 16, left: 0, bottom: 24 }}
            >
              <CartesianGrid strokeDasharray="4 4" stroke="#F3F4F6" vertical={false} />
              <XAxis
                dataKey="module"
                tick={{ fontSize: 11, fill: '#9CA3AF' }}
                axisLine={false}
                tickLine={false}
                label={{
                  value: 'Modules',
                  position: 'insideBottom',
                  offset: -10,
                  style: { fontSize: 11, fill: '#9CA3AF' },
                }}
              />
              <YAxis
                tick={{ fontSize: 11, fill: '#9CA3AF' }}
                axisLine={false}
                tickLine={false}
                domain={[0, 100]}
                label={{
                  value: 'Adoption Rate (%)',
                  angle: -90,
                  position: 'insideLeft',
                  style: { fontSize: 10, fill: '#9CA3AF' },
                  dx: 10,
                  dy: 60,
                }}
                width={50}
              />
              <Tooltip
                contentStyle={{
                  fontSize: 12,
                  borderRadius: 8,
                  border: '1px solid #E5E7EB',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                }}
                formatter={(value) => [`${value}%`, 'Adoption Rate']}
              />
              <Bar dataKey="adoption" fill="#BFDBFE" radius={[4, 4, 0, 0]} barSize={60} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <EmptyState />
      )}
    </>
  )
}
