import {
  BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer,
} from 'recharts'
import ChartCard from './ChartCard'
import type { DateFilter } from '../../api/dashboard'

interface NewClientData {
  labels: string[]
  series: number[]
}

interface PayrollRunData {
  total_employees_paid: { count: number; change_percent: number; direction: string }
  total_payroll_disbursed: { amount: number; change_percent: number; direction: string }
  monthly_disbursed: { labels: string[]; series: number[] }
}

interface EmployeeSelfServiceData {
  active_usage: { count: number; change_percent: number; direction: string }
  inactive_usage: { count: number; change_percent: number; direction: string }
  monthly_usage: { labels: string[]; active: number[]; inactive: number[] }
  definitions: { active: string; inactive: string }
}

interface FirstPayrollRunItem {
  bucket: string
  count: number
}

interface PaymentSuccessData {
  labels: string[]
  successful: number[]
  failed: number[]
}

interface ProductMetricsData {
  new_client_onboarding: NewClientData
  payroll_run: PayrollRunData
  employee_self_service_app_adoption: EmployeeSelfServiceData
  first_payroll_run: { distribution: FirstPayrollRunItem[] }
  payment_success_vs_failure_rate: PaymentSuccessData
}

interface ProductMetricsProps {
  data?: ProductMetricsData
  dateFilter: DateFilter
  onDateFilterChange: (value: DateFilter) => void
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

export default function ProductMetrics({ data, dateFilter, onDateFilterChange }: ProductMetricsProps) {
  // Map API data to chart-friendly shapes
  const newClientChart = (data?.new_client_onboarding.labels ?? []).map((month, i) => ({
    month,
    value: data?.new_client_onboarding.series[i] ?? 0,
  }))

  const payrollChart = (data?.payroll_run.monthly_disbursed.labels ?? []).map((month, i) => ({
    month,
    value: (data?.payroll_run.monthly_disbursed.series[i] ?? 0) / 1000000,
  }))

  const selfServiceChart = (data?.employee_self_service_app_adoption.monthly_usage.labels ?? []).map((month, i) => ({
    month,
    active: data?.employee_self_service_app_adoption.monthly_usage.active[i] ?? 0,
    inactive: data?.employee_self_service_app_adoption.monthly_usage.inactive[i] ?? 0,
  }))

  const firstPayrollChart = (data?.first_payroll_run.distribution ?? []).map(item => ({
    range: item.bucket,
    value: item.count,
  }))

  const paymentChart = (data?.payment_success_vs_failure_rate.labels ?? []).map((month, i) => ({
    month,
    failed: data?.payment_success_vs_failure_rate.failed[i] ?? 0,
    successful: data?.payment_success_vs_failure_rate.successful[i] ?? 0,
  }))

  // Empty state checks per card
  const newClientEmpty = !data || newClientChart.every(d => d.value === 0)
  const payrollEmpty = !data || payrollChart.every(d => d.value === 0)
  const selfServiceEmpty = !data || selfServiceChart.every(d => d.active === 0 && d.inactive === 0)
  const firstPayrollEmpty = !data || firstPayrollChart.every(d => d.value === 0)
  const paymentEmpty = !data || paymentChart.every(d => d.failed === 0 && d.successful === 0)

  const payroll = data?.payroll_run
  const selfService = data?.employee_self_service_app_adoption

  return (
    <>
      <div className="pb-4 mb-6 border-b border-[#EAECF0]">
        <h2 className="text-base font-bold text-gray-900">Product metrics</h2>
        <p className="text-xs text-gray-400 mt-0.5">An insight into product performance</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {/* New Client */}
        <ChartCard title="New Client" subtitle="New client onboarding" hasData={!newClientEmpty} headerBorder dateFilter={dateFilter} onDateFilterChange={onDateFilterChange}>
          <div className="h-56 min-h-0">
            <ResponsiveContainer width="100%" height={224}>
              <BarChart data={newClientChart} margin={{ top: 5, right: 5, left: 10, bottom: 20 }}>
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

        {/* Trial to Paid — not in API yet, always empty */}
        <ChartCard title="Trial to Paid Conversion" subtitle="Rate of conversion to paying clients" hasData={false} headerBorder dateFilter={dateFilter} onDateFilterChange={onDateFilterChange}>
          <div className="h-56" />
        </ChartCard>

        {/* Payroll Run */}
        <ChartCard title="Payroll Run" subtitle="Employee paid and disbursed" hasData={!payrollEmpty} headerBorder dateFilter={dateFilter} onDateFilterChange={onDateFilterChange}>
          <div className="flex flex-col gap-3 mb-4">
            <div className="border border-gray-100 rounded-xl p-3">
              <p className="text-xs text-gray-400">Total Employee Paid</p>
              <p className="text-xl font-bold text-[#3E1C96] mt-1">
                {payroll?.total_employees_paid.count.toLocaleString() ?? '0'}
              </p>
              <p className="text-xs text-green-500 mt-1">
                +{payroll?.total_employees_paid.change_percent ?? 0}% vs 30 days ago
              </p>
            </div>
            <div className="border border-gray-100 rounded-xl p-3">
              <p className="text-xs text-gray-400">Total Payroll Disbursed</p>
              <p className="text-xl font-bold text-[#3E1C96] mt-1">
                ₦{((payroll?.total_payroll_disbursed.amount ?? 0) / 1000000).toFixed(1)}m
              </p>
              <p className="text-xs text-green-500 mt-1">
                +{payroll?.total_payroll_disbursed.change_percent ?? 0}% vs 30 days ago
              </p>
            </div>
          </div>
          <div className="h-52 min-h-0">
            <ResponsiveContainer width="100%" height={208}>
              <LineChart data={payrollChart} margin={{ top: 5, right: 5, left: 10, bottom: 20 }}>
                <CartesianGrid strokeDasharray="4 4" stroke="#F3F4F6" vertical={false} />
                <XAxis dataKey="month" tick={axisStyle} axisLine={false} tickLine={false}
                  label={{ value: 'Month', position: 'insideBottom', offset: -10, style: { fontSize: 10, fill: '#9CA3AF' } }} />
                <YAxis tick={axisStyle} axisLine={false} tickLine={false}
                  label={{ value: 'Total disbursement in Million (₦)', angle: -90, position: 'insideLeft', style: { fontSize: 9, fill: '#9CA3AF' }, dx: -5, dy: 90 }}
                  width={50} />
                <Tooltip contentStyle={tooltipStyle} formatter={(v) => [`₦${v}m`, 'Disbursed']} />
                <Line type="monotone" dataKey="value" stroke="#E8622A" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        {/* Employee Self-Service */}
        <ChartCard title="Employee Self-service App Adoption" subtitle="Mobile app usage trend" hasData={!selfServiceEmpty} headerBorder dateFilter={dateFilter} onDateFilterChange={onDateFilterChange}>
          <div className="flex gap-3 mb-4">
            <div className="flex-1 border border-gray-100 rounded-xl p-3">
              <p className="text-xs text-gray-400">Active Usage</p>
              <p className="text-xl font-bold text-[#1a1f5e] mt-1">
                {selfService?.active_usage.count.toLocaleString() ?? '0'}
              </p>
              <p className="text-xs text-green-500 mt-1">
                +{selfService?.active_usage.change_percent ?? 0}% vs 30 days ago
              </p>
            </div>
            <div className="flex-1 border border-gray-100 rounded-xl p-3">
              <p className="text-xs text-gray-400">Inactive Usage</p>
              <p className="text-xl font-bold text-[#1a1f5e] mt-1">
                {selfService?.inactive_usage.count.toLocaleString() ?? '0'}
              </p>
              <p className="text-xs text-green-500 mt-1">
                +{selfService?.inactive_usage.change_percent ?? 0}% vs 30 days ago
              </p>
            </div>
          </div>
          <div className="flex justify-end gap-4 mb-1">
            {renderLegendDot('#E8622A', 'Active Usage')}
            {renderLegendDot('#3B3FA0', 'Inactive Usage')}
          </div>
          <div className="h-36 min-h-0">
            <ResponsiveContainer width="100%" height={144}>
              <BarChart data={selfServiceChart} margin={{ top: 5, right: 5, left: 10, bottom: 15 }}>
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
              <p className="text-xs text-gray-400 mt-0.5">
                {selfService?.definitions.active ?? ''}
              </p>
            </div>
            <div>
              <p className="text-xs font-bold text-gray-800">Inactive</p>
              <p className="text-xs text-gray-400 mt-0.5">
                {selfService?.definitions.inactive ?? ''}
              </p>
            </div>
          </div>
        </ChartCard>

        {/* First Payroll Run */}
        <ChartCard title="First Payroll Run" subtitle="When client run their first payroll" hasData={!firstPayrollEmpty} headerBorder dateFilter={dateFilter} onDateFilterChange={onDateFilterChange}>
          <div className="h-56 min-h-0">
            <ResponsiveContainer width="100%" height={224}>
              <BarChart data={firstPayrollChart} margin={{ top: 5, right: 5, left: 10, bottom: 20 }}>
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
        <ChartCard title="Payment Success vs Failure Rate" subtitle="Rate of payroll success and fail" hasData={!paymentEmpty} headerBorder dateFilter={dateFilter} onDateFilterChange={onDateFilterChange}>
          <div className="flex justify-end gap-4 mb-1">
            {renderLegendDot('#EF4444', 'Failed')}
            {renderLegendDot('#22C55E', 'Successful')}
          </div>
          <div className="h-56 min-h-0">
            <ResponsiveContainer width="100%" height={224}>
              <BarChart data={paymentChart} margin={{ top: 5, right: 5, left: 10, bottom: 20 }}>
                <CartesianGrid {...gridProps} />
                <XAxis dataKey="month" tick={axisStyle} axisLine={false} tickLine={false}
                  label={{ value: 'Month', position: 'insideBottom', offset: -10, style: { fontSize: 10, fill: '#9CA3AF' } }} />
                <YAxis tick={axisStyle} axisLine={false} tickLine={false}
                  label={{ value: 'Percentage (%)', angle: -90, position: 'insideLeft', style: { fontSize: 9, fill: '#9CA3AF' }, dx: -5, dy: 50 }}
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