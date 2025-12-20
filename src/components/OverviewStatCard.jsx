import React from 'react'
import { Calendar } from 'lucide-react'

const OverviewStatCard = ({
  title,
  value,
  subtitle = 'Patients',
  icon,
  className = '',
}) => {
  const RightIcon = icon ?? <Calendar className="w-5 h-5" />

  const formattedValue =
    typeof value === 'number' ? new Intl.NumberFormat().format(value) : value

  return (
    <div className={`bg-white rounded-lg shadow-sm  p-4 flex items-center justify-between ${className}`}>
      <div className='w-full '>
        <div className="text-sm text-gray-600">{title}</div>
        <div className='flex items-center gap-1'>
            <div className="text-2xl font-semibold text-gray-900">{formattedValue}</div>
            {subtitle && <div className="mt-2 text-xs text-gray-500">{subtitle}</div>}
        </div>
      </div>
      <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 ring-1 ring-gray-200">
        {RightIcon}
      </div>
    </div>
  )
}

export default OverviewStatCard
