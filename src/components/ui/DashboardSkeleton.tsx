import { Skeleton } from '@mantine/core'


function GridCardSkeleton() {
  return (
    <div className="border border-[#D0D5DD] rounded-xl p-5">
      <div className="flex items-start justify-between pb-4 mb-4 border-b border-[#EAECF0]">
        <div className="flex flex-col gap-2">
          <Skeleton height={13} width={140} radius="sm" />
          <Skeleton height={10} width={180} radius="sm" />
        </div>
        <Skeleton height={30} width={120} radius="xl" />
      </div>
      <Skeleton height={160} radius="sm" />
    </div>
  )
}

export default function DashboardSkeleton() {
  return (
    <div className="flex flex-col gap-4 max-w-7xl mx-auto">

      {/* Subscription Overview + Data Insight */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        {/* Subscription header */}
        <div className="flex items-start justify-between pb-4 mb-6 border-b border-[#EAECF0]">
          <div className="flex flex-col gap-2">
            <Skeleton height={14} width={180} radius="sm" />
            <Skeleton height={10} width={240} radius="sm" />
          </div>
          <Skeleton height={32} width={130} radius="xl" />
        </div>

        {/* Total client row */}
        <div className="flex items-center gap-4 mb-6">
          <Skeleton height={40} width={40} radius="md" />
          <div className="flex flex-col gap-2">
            <Skeleton height={10} width={70} radius="sm" />
            <Skeleton height={24} width={80} radius="sm" />
            <Skeleton height={10} width={140} radius="sm" />
          </div>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-8">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="border border-gray-100 rounded-xl p-3.5 flex flex-col gap-2">
              <Skeleton height={10} radius="sm" />
              <Skeleton height={20} width="60%" radius="sm" />
              <Skeleton height={10} radius="sm" />
            </div>
          ))}
        </div>

        {/* Data Insight */}
        <div className="border border-[#D0D5DD] rounded-xl p-5">
          <div className="flex items-start justify-between pb-4 mb-4 border-b border-[#EAECF0]">
            <Skeleton height={14} width={100} radius="sm" />
            <Skeleton height={30} width={120} radius="xl" />
          </div>
          {/* Tabs */}
          <div className="flex gap-4 mb-4">
            <Skeleton height={10} width={50} radius="sm" />
            <Skeleton height={10} width={80} radius="sm" />
          </div>
          <Skeleton height={200} radius="sm" />
        </div>
      </div>

      {/* Product Adoption + Usage Distribution */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <div className="flex items-start justify-between pb-4 mb-6 border-b border-[#EAECF0]">
          <div className="flex flex-col gap-2">
            <Skeleton height={14} width={150} radius="sm" />
            <Skeleton height={10} width={230} radius="sm" />
          </div>
          <Skeleton height={32} width={130} radius="xl" />
        </div>
        <Skeleton height={280} radius="sm" className="mb-6" />

        {/* Usage Distribution */}
        <div className="border border-[#D0D5DD] rounded-xl overflow-hidden mt-2">
          <div className="px-5 py-4 border-b border-[#D0D5DD]">
            <Skeleton height={13} width={140} radius="sm" />
          </div>
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex gap-4 px-5 py-4 border-b border-[#D0D5DD] last:border-0">
              <Skeleton height={11} width="20%" radius="sm" />
              <Skeleton height={11} width="25%" radius="sm" />
              <Skeleton height={11} width="20%" radius="sm" />
              <Skeleton height={11} width="15%" radius="sm" />
            </div>
          ))}
        </div>
      </div>

      {/* Product Metrics */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <div className="flex flex-col gap-2 pb-4 mb-6 border-b border-[#EAECF0]">
          <Skeleton height={14} width={130} radius="sm" />
          <Skeleton height={10} width={200} radius="sm" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <GridCardSkeleton key={i} />
          ))}
        </div>
      </div>

    </div>
  )
}
