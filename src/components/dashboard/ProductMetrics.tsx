import {
  BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer,
} from 'recharts'
import ChartCard from './ChartCard'
import {
  newClientData,
  trialToPaidData,
  payrollRunData,
  employeeSelfServiceData,
  firstPayrollRunData,
  paymentSuccessData,
} from '../../data/mockData'

interface ProductMetricsProps {
  hasData: boolean
}

const axisStyle = { fontSize: 10, fill: '#9CA3AF' }
const gridProps = { strokeDasharray: '4 4' as const, stroke: '#F3F4F6', vertical: false as const }
const tooltipStyle = {
  fontSize: 11,
  borderRadius: 8,
  border: '1px solid #E5E7EB',
  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
}

const dotColorClass: Record<string, string> = {
  '#E8622A': 'bg-[#E8622A]',
  '#3B3FA0': 'bg-[#3B3FA0]',
  '#EF4444': 'bg-red-500',
  '#22C55E': 'bg-green-500',
}

const renderLegendDot = (color: string, label: string) => (
  <span className="flex items-center gap-1 text-xs text-gray-500">
    <span className={`w-2 h-2 rounded-full inline-block ${dotColorClass[color] ?? ''}`} />
    {label}
  </span>
)

export default function ProductMetrics({ hasData }: ProductMetricsProps) {
  return (
    <>
      <div className="pb-4 mb-6 border-b border-[#EAECF0]">
        <h2 className="text-base font-bold text-gray-900">Product metrics</h2>
        <p className="text-xs text-gray-400 mt-0.5">An insight into product performance</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {/* New Client */}
        <ChartCard title="New Client" subtitle="New client onboarding" hasData={hasData} headerBorder>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={newClientData} margin={{ top: 5, right: 5, left: 10, bottom: 20 }}>
                <CartesianGrid {...gridProps} />
                <XAxis dataKey="month" tick={axisStyle} axisLine={false} tickLine={false}
                  label={{ value: 'Month', position: 'insideBottom', offset: -10, style: { fontSize: 10, fill: '#9CA3AF' } }} />
                <YAxis tick={axisStyle} axisLine={false} tickLine={false}
                  label={{ value: 'Number of New Client', angle: -90, position: 'insideLeft', style: { fontSize: 9, fill: '#9CA3AF' }, dx: -5, dy: 60 }}
                  width={45} />
                <Tooltip contentStyle={tooltipStyle} />
                <Bar dataKey="value" fill="#3B3FA0" radius={[3, 3, 0, 0]} barSize={32} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        {/* Trial to Paid */}
        <ChartCard title="Trial to Paid Conversion" subtitle="Rate of conversion to paying clients" hasData={hasData} headerBorder>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trialToPaidData} margin={{ top: 5, right: 5, left: 10, bottom: 20 }}>
                <CartesianGrid strokeDasharray="4 4" stroke="#F3F4F6" />
                <XAxis dataKey="month" tick={axisStyle} axisLine={false} tickLine={false}
                  label={{ value: 'Month', position: 'insideBottom', offset: -10, style: { fontSize: 10, fill: '#9CA3AF' } }} />
                <YAxis tick={axisStyle} axisLine={false} tickLine={false}
                  tickFormatter={(v) => `${v}%`}
                  label={{ value: 'Conversion Rate (%)', angle: -90, position: 'insideLeft', style: { fontSize: 9, fill: '#9CA3AF' }, dx: -5, dy: 60 }}
                  width={45} />
                <Tooltip contentStyle={tooltipStyle} formatter={(v) => [`${v}%`, 'Conversion']} />
                <Line type="monotone" dataKey="value" stroke="#3B3FA0" strokeWidth={1.5} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        {/* Payroll Run */}
        <ChartCard title="Payroll Run" subtitle="Employee paid and disbursed" hasData={hasData} headerBorder>
          <div className="flex flex-col gap-3 mb-4">
            <div className="border border-gray-100 rounded-xl p-3">
              <p className="text-xs text-gray-400">Total Employee Paid</p>
              <p className="text-xl font-bold text-[#3E1C96] mt-1">{payrollRunData.totalEmployeesPaid}</p>
              <p className="text-xs text-green-500 mt-1">+ {payrollRunData.paidChange}</p>
            </div>
            <div className="border border-gray-100 rounded-xl p-3">
              <p className="text-xs text-gray-400">Total Payroll Disbursed</p>
              <p className="text-xl font-bold text-[#3E1C96] mt-1">{payrollRunData.totalDisbursed}</p>
              <p className="text-xs text-green-500 mt-1">{payrollRunData.disbursedChange}</p>
            </div>
          </div>
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={payrollRunData.chart} margin={{ top: 5, right: 5, left: 10, bottom: 20 }}>
                <CartesianGrid strokeDasharray="4 4" stroke="#F3F4F6" vertical={false} />
                <XAxis
                  dataKey="x"
                  type="number"
                  domain={[1, 30]}
                  ticks={[1, 6, 11, 16, 21, 26]}
                  tickFormatter={(v) => payrollRunData.xLabels[Math.round((v - 1) / 5)] ?? ''}
                  tick={axisStyle}
                  axisLine={false}
                  tickLine={false}
                  label={{ value: 'Month', position: 'insideBottom', offset: -10, style: { fontSize: 10, fill: '#9CA3AF' } }}
                />
                <YAxis
                  tick={axisStyle}
                  axisLine={false}
                  tickLine={false}
                  domain={[0, 50]}
                  ticks={[0, 10, 20, 30, 40, 50]}
                  label={{ value: 'Total disbursement in Million (₦)', angle: -90, position: 'insideLeft', style: { fontSize: 9, fill: '#9CA3AF' }, dx: -5, dy: 90 }}
                  width={50}
                />
                <Tooltip contentStyle={tooltipStyle} labelFormatter={(v) => payrollRunData.xLabels[Math.round((Number(v) - 1) / 5)] ?? v} />
                <Line type="monotone" dataKey="value" stroke="#E8622A" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        {/* Employee Self-Service */}
        <ChartCard title="Employee Self-service App Adoption" subtitle="Mobile app usage trend" hasData={hasData} headerBorder>
          <div className="flex gap-3 mb-4">
            <div className="flex-1 border border-gray-100 rounded-xl p-3">
              <p className="text-xs text-gray-400">Active Usage</p>
              <p className="text-xl font-bold text-[#1a1f5e] mt-1">{employeeSelfServiceData.activeUsage}</p>
              <p className="text-xs text-green-500 mt-1">+ {employeeSelfServiceData.activeChange}</p>
            </div>
            <div className="flex-1 border border-gray-100 rounded-xl p-3">
              <p className="text-xs text-gray-400">inactive Usage</p>
              <p className="text-xl font-bold text-[#1a1f5e] mt-1">{employeeSelfServiceData.inactiveUsage}</p>
              <p className="text-xs text-green-500 mt-1">{employeeSelfServiceData.inactiveChange}</p>
            </div>
          </div>
          <div className="flex justify-end gap-4 mb-1">
            {renderLegendDot('#E8622A', 'Active Usage')}
            {renderLegendDot('#3B3FA0', 'Inactive Usage')}
          </div>
          <div className="h-36">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={employeeSelfServiceData.chart} margin={{ top: 5, right: 5, left: 10, bottom: 15 }}>
                <CartesianGrid {...gridProps} />
                <XAxis dataKey="month" tick={axisStyle} axisLine={false} tickLine={false}
                  label={{ value: 'Month', position: 'insideBottom', offset: -8, style: { fontSize: 10, fill: '#9CA3AF' } }} />
                <YAxis tick={axisStyle} axisLine={false} tickLine={false}
                  label={{ value: 'No. of employee', angle: -90, position: 'insideLeft', style: { fontSize: 9, fill: '#9CA3AF' }, dx: -5, dy: 40 }}
                  width={45} />
                <Tooltip contentStyle={tooltipStyle} />
                <Bar dataKey="active" name="Active Usage" fill="#E8622A" radius={[0, 0, 0, 0]} barSize={20} stackId="a" />
                <Bar dataKey="inactive" name="Inactive Usage" fill="#3B3FA0" radius={[2, 2, 0, 0]} barSize={20} stackId="a" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 space-y-3">
            <div>
              <p className="text-xs font-bold text-gray-800">Active</p>
              <p className="text-xs text-gray-400 mt-0.5">An employee is active if they have viewed or downloaded their payslip, salary history, or payroll details within the last 45 days.</p>
            </div>
            <div>
              <p className="text-xs font-bold text-gray-800">Inactive</p>
              <p className="text-xs text-gray-400 mt-0.5">An employee is inactive if they have not performed any salary-related action for more than 90 days.</p>
            </div>
          </div>
        </ChartCard>

        {/* First Payroll Run */}
        <ChartCard title="First Payroll Run" subtitle="When client run their first payroll" hasData={hasData} headerBorder>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={firstPayrollRunData} margin={{ top: 5, right: 5, left: 10, bottom: 20 }}>
                <CartesianGrid {...gridProps} />
                <XAxis dataKey="range" tick={axisStyle} axisLine={false} tickLine={false}
                  label={{ value: 'Time to First Payroll', position: 'insideBottom', offset: -10, style: { fontSize: 10, fill: '#9CA3AF' } }} />
                <YAxis tick={axisStyle} axisLine={false} tickLine={false}
                  label={{ value: 'No. of Client / Company', angle: -90, position: 'insideLeft', style: { fontSize: 9, fill: '#9CA3AF' }, dx: -5, dy: 70 }}
                  width={45} />
                <Tooltip contentStyle={tooltipStyle} />
                <Bar dataKey="value" fill="#E8622A" radius={[3, 3, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        {/* Payment Success vs Failure */}
        <ChartCard title="Payment Success vs Failure Rate" subtitle="Rate of payroll success and fail" hasData={hasData} headerBorder>
          <div className="flex justify-end gap-4 mb-1">
            {renderLegendDot('#EF4444', 'Failed')}
            {renderLegendDot('#22C55E', 'Successful')}
          </div>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={paymentSuccessData} margin={{ top: 5, right: 5, left: 10, bottom: 20 }}>
                <CartesianGrid {...gridProps} />
                <XAxis dataKey="month" tick={axisStyle} axisLine={false} tickLine={false}
                  label={{ value: 'Month', position: 'insideBottom', offset: -10, style: { fontSize: 10, fill: '#9CA3AF' } }} />
                <YAxis tick={axisStyle} axisLine={false} tickLine={false}
                  tickFormatter={(v) => `${v}`}
                  label={{ value: 'Percentage ($)', angle: -90, position: 'insideLeft', style: { fontSize: 9, fill: '#9CA3AF' }, dx: -5, dy: 50 }}
                  width={45} domain={[0, 100]} />
                <Tooltip contentStyle={tooltipStyle} />
                <Bar dataKey="failed" name="Failed" fill="#EF4444" radius={[0, 0, 0, 0]} barSize={28} stackId="a" />
                <Bar dataKey="successful" name="Successful" fill="#22C55E" radius={[2, 2, 0, 0]} barSize={28} stackId="a" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

      </div>
    </>
  )
}
