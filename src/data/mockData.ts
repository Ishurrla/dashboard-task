export const subscriptionStats =[
    {
        label: 'Active Clients',
        value: '1,126',
        change: '+4.3% MoM',
        trend: 'up' as const
    },
    {
    label: 'MRR',
    value: '₦37.1m',
    change: '+₦40k MoM (+1.7%)',
    trend: 'up' as const,
  },
  {
    label: 'Churn Rate',
    value: '7.9%',
    change: '-0.6% vs last 30day',
    trend: 'down' as const,
  },
  {
    label: 'Avg Revenue per Client',
    value: '₦32,950',
    change: '+5.2% MoM',
    trend: 'up' as const,
  },
  {
    label: 'Activity Rate',
    value: '76%',
    change: '+2% MoM',
    trend: 'up' as const,
  },
]

export const totalClient = {
  count: '1,482',
  inactive: 356,
  inactivePercent: '24.%',
}

export const mrrData = [
  { month: 'Jan', value: 100 },
  { month: 'Feb', value: 120 },
  { month: 'Mar', value: 95 },
  { month: 'Apr', value: 160 },
  { month: 'May', value: 110 },
  { month: 'Jun', value: 130 },
  { month: 'Jul', value: 115 },
]

export const churnRateData = [
  { month: 'Jan', value: 8.2 },
  { month: 'Feb', value: 7.8 },
  { month: 'Mar', value: 9.1 },
  { month: 'Apr', value: 7.9 },
  { month: 'May', value: 8.5 },
  { month: 'Jun', value: 7.6 },
  { month: 'Jul', value: 7.9 },
]

export const productAdoptionData = [
  { module: 'Payroll', adoption: 96 },
  { module: 'Quick Pay', adoption: 85 },
  { module: 'Employee Mgmt', adoption: 88 },
  { module: 'Leave Mgmt', adoption: 92 },
  { module: 'Payment', adoption: 78 },
  { module: 'Wallet Mgmt', adoption: 95 },
]

export const usageDistributionData = [
  { module: 'Payroll', activeUsing: 1033, totalActive: 1126, adoptionRate: '96%' },
  { module: 'Quick Pay', activeUsing: 1455, totalActive: 1204, adoptionRate: '85%' },
  { module: 'Employee Management', activeUsing: 1678, totalActive: 1356, adoptionRate: '88%' },
  { module: 'Leave Management', activeUsing: 1234, totalActive: 1126, adoptionRate: '92%' },
  { module: 'Wallet Management', activeUsing: 1899, totalActive: 1589, adoptionRate: '99%' },
  { module: 'General Setting', activeUsing: 1033, totalActive: 1452, adoptionRate: '78%' },
]


export const newClientData = [
  { month: 'Jan', value: 900 },
  { month: 'Feb', value: 950 },
  { month: 'Mar', value: 870 },
  { month: 'Apr', value: 980 },
  { month: 'May', value: 920 },
  { month: 'Jun', value: 1000 },
]

export const trialToPaidData = [
  { month: 'Jan', value: 48 }, { month: 'Jan', value: 52 }, { month: 'Jan', value: 44 }, { month: 'Jan', value: 50 }, { month: 'Jan', value: 46 },
  { month: 'Feb', value: 42 }, { month: 'Feb', value: 38 }, { month: 'Feb', value: 45 }, { month: 'Feb', value: 40 }, { month: 'Feb', value: 43 },
  { month: 'Mar', value: 38 }, { month: 'Mar', value: 35 }, { month: 'Mar', value: 41 }, { month: 'Mar', value: 36 }, { month: 'Mar', value: 39 },
  { month: 'Apr', value: 34 }, { month: 'Apr', value: 30 }, { month: 'Apr', value: 37 }, { month: 'Apr', value: 32 }, { month: 'Apr', value: 35 },
  { month: 'May', value: 30 }, { month: 'May', value: 26 }, { month: 'May', value: 33 }, { month: 'May', value: 28 }, { month: 'May', value: 31 },
  { month: 'Jun', value: 25 }, { month: 'Jun', value: 22 }, { month: 'Jun', value: 28 }, { month: 'Jun', value: 24 }, { month: 'Jun', value: 26 },
]

export const payrollRunData = {
  totalEmployeesPaid: '2,290',
  paidChange: '+4.3% vs 30 days ago',
  totalDisbursed: '₦130m',
  disbursedChange: '+₦20m vs 30 day ago',
  chart: [
    { month: 'Jan', value: 22 }, { month: 'Jan', value: 25 }, { month: 'Jan', value: 21 },
    { month: 'Feb', value: 26 }, { month: 'Feb', value: 30 }, { month: 'Feb', value: 28 },
    { month: 'Mar', value: 29 }, { month: 'Mar', value: 33 }, { month: 'Mar', value: 31 },
    { month: 'Apr', value: 32 }, { month: 'Apr', value: 37 }, { month: 'Apr', value: 35 },
    { month: 'May', value: 36 }, { month: 'May', value: 41 }, { month: 'May', value: 39 },
    { month: 'Jun', value: 40 }, { month: 'Jun', value: 45 }, { month: 'Jun', value: 43 },
  ],
}

export const employeeSelfServiceData = {
  activeUsage: '4,490',
  activeChange: '+12.4% vs 30 days ago',
  inactiveUsage: '1,202',
  inactiveChange: '+2.4 vs 30 day ago',
  chart: [
    { month: 'Jan', active: 800, inactive: 200 },
    { month: 'Feb', active: 850, inactive: 220 },
    { month: 'Mar', active: 900, inactive: 180 },
    { month: 'Apr', active: 950, inactive: 210 },
    { month: 'May', active: 870, inactive: 230 },
    { month: 'Jun', active: 920, inactive: 190 },
  ],
}

export const firstPayrollRunData = [
  { range: '0-7d', value: 780 },
  { range: '8-14d', value: 920 },
  { range: '15-30d', value: 600 },
  { range: '31-60d', value: 820 },
  { range: '>60 d', value: 600 },
]

export const paymentSuccessData = [
  { month: 'Jan', failed: 40, successful: 60 },
  { month: 'Feb', failed: 20, successful: 80 },
  { month: 'Mar', failed: 45, successful: 55 },
  { month: 'Apr', failed: 15, successful: 85 },
  { month: 'May', failed: 35, successful: 65 },
  { month: 'Jun', failed: 25, successful: 75 },
]